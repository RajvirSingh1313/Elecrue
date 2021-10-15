const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const ncp = require('ncp').ncp;
const path = require('path');
const fs = require('fs');


const questions = [
    {
        type: 'input',
        name: 'ProjectName',
        message: 'Name of your project?'
    },
    {
        type: 'list',
        name: 'FrameWork',
        message: 'Which framework you want to use with electron?',
        choices: [
            "Vue",
            "React"
        ],
        filter(val) {
            return val.toLowerCase();
        }
    },
    {
        type: 'list',
        name: 'Language',
        message: 'In which language do you want to use?',
        choices: [
            "JavaScript",
            "TypeScript"
        ],
        filter(val) {
            let result = val;
            if (val === "JavaScript") {
                result = "js";
            } else {
                result = "ts";
            }

            return result;
        }
    },
    {
        type: 'list',
        name: 'Styling',
        message: 'In which styling framework do you want to use?',
        choices: [
            "Tailwind",
            "Bootstrap",
            "None"
        ],
        filter(val) {
            if (val === "None") {
                val = "";
            }
            return val.toLowerCase();
        }
    },
];

figlet('Elecrue', { font: 'Electronic' }, function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(chalk.blue(data));


    inquirer.prompt(questions).then((results) => {
        answers = results;

        const CURR_DIR = process.cwd();
        const templateName = `${answers.FrameWork}-electron${answers.Styling === "" ? "" : "-" + answers.Styling}-${answers.Language}`

        const templatePath = path.join(__dirname, 'templates', templateName);
        const targetPath = path.join(CURR_DIR, answers.ProjectName);

        if (!createProject(targetPath)) {
            return;
        }

        ncp(templatePath, targetPath, function (err) {
            if (err) {
                return console.error(err);
            }
        });

        PostProcessing(templatePath, targetPath, answers.ProjectName);

    });
});


const createProject = (projectPath) => {
    if (fs.existsSync(projectPath)) {
        console.log(chalk.red(`\nFolder ${projectPath} exists. Delete or use another name.`));
        return false;
    }
    fs.mkdirSync(projectPath);

    return true;
}


const PostProcessing = (templatePath, targetPath, ProjectName) => {
    const isNode = fs.existsSync(path.join(templatePath, 'package.json'));
    const exec = require('child_process').exec;
    if (isNode) {
        console.log(chalk.greenBright.bold("Downloading Node Modules"));

        exec(`cd "${targetPath}"`, (err, stdout) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(stdout);

            console.log("");
            console.log("");
            console.log(chalk.blueBright.bold("NPM Useful Commands :- "));
            console.log(chalk.blue("           npm run start"))
            console.log(chalk.blue("                   Runs electron with react or vue"));
            console.log(chalk.blue("           npm run build"))
            console.log(chalk.blue("                   Makes build file in dist or electron build, depending on os"));
            console.log("")
            console.log("")
            console.log(chalk.blueBright.bold(`cd ${ProjectName}`));
            console.log(chalk.blueBright.bold("npm run start"));
            console.log("");
            console.log(chalk.blueBright.bold("Happy Coding!"));
        });
    }
}