#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as inquirer from 'inquirer';
import chalk from 'chalk';
import * as template from './utils/template';
const exec = require('child_process').exec;

const CHOICES = fs.readdirSync(path.join(__dirname, 'templates'));
const QUESTIONS = [
    {
        name: 'template',
        type: 'list',
        message: 'What template would you like to use?',
        choices: CHOICES
    },
    {
        name: 'name',
        type: 'input',
        message: 'Please input a new project name:'
    }];

export interface CliOptions {
    projectName: string
    templateName: string
    templatePath: string
    tartgetPath: string
}

const CURR_DIR = process.cwd();

inquirer.prompt(QUESTIONS).then(answers => {
    const projectChoice = answers['template'];
    const projectName = answers['name'];
    //@ts-ignore
    const templatePath = path.join(__dirname, 'templates', projectChoice);
    //@ts-ignore
    const tartgetPath = path.join(CURR_DIR, projectName);

    const options: CliOptions = {
        //@ts-ignore
        projectName,
        //@ts-ignore
        templateName: projectChoice,
        templatePath,
        tartgetPath
    }

    if (!createProject(tartgetPath)) {
        return;
    }

    //@ts-ignore
    createDirectoryContents(templatePath, projectName);

    postProcess(options);
});

function createProject(projectPath: string) {
    if (fs.existsSync(projectPath)) {
        console.log(chalk.red(`Folder ${projectPath} exists. Delete or use another name.`));
        return false;
    }
    fs.mkdirSync(projectPath);

    return true;
}

const SKIP_FILES = ['node_modules', '.template.json'];

function createDirectoryContents(templatePath: string, projectName: string) {
    // read all files/folders (1 level) from template folder
    const filesToCreate = fs.readdirSync(templatePath);
    // loop each file/folder
    filesToCreate.forEach(file => {
        const origFilePath = path.join(templatePath, file);

        // get stats about the current file
        const stats = fs.statSync(origFilePath);

        // skip files that should not be copied
        if (SKIP_FILES.indexOf(file) > -1) return;

        if (stats.isFile()) {
            // read file content and transform it using template engine
            let contents = fs.readFileSync(origFilePath, 'utf8');
            contents = template.render(contents, { projectName });
            // write file to destination folder
            const writePath = path.join(CURR_DIR, projectName, file);
            fs.writeFileSync(writePath, contents, 'utf8');
        } else if (stats.isDirectory()) {
            // create folder in destination folder
            fs.mkdirSync(path.join(CURR_DIR, projectName, file));
            // copy files/folder inside current folder recursively
            createDirectoryContents(path.join(templatePath, file), path.join(projectName, file));
        }
    });
}

function postProcess(options: CliOptions) {
    const isNode = fs.existsSync(path.join(options.templatePath, 'package.json'));
    if (isNode) {
        console.log("Downloading Node Modules");

        exec(`cd "${options.tartgetPath}" && npm install`, (err: string, stdout: string, stderr: string) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(stdout);

            console.log("");
            console.log("");
            console.log(chalk.blueBright("NPM Useful Commands :- "));
            console.log(chalk.blue("           npm run start"))
            console.log(chalk.blue("                   Runs electron with react or vue"));
            console.log(chalk.blue("           npm run build"))
            console.log(chalk.blue("                   Makes build file in dist or electron build, depending on os"));
            console.log("")
            console.log("")
            console.log(chalk.blueBright(`cd ${options.templateName}`));
            console.log(chalk.blueBright("npm run start"));
            console.log("");
            console.log(chalk.blueBright("Happy Coding!"));
        });
    }

    return true;
}


