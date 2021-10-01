![Elecrue Banner](https://user-images.githubusercontent.com/63385587/135675383-1c74f040-d8a9-49a4-a035-a0fcc4edac0c.png)

[![npm version](https://badge.fury.io/js/elecrue.svg)](https://badge.fury.io/js/elecrue)
<img src="https://img.shields.io/badge/Electron-2B2E3A?style=for-the-badge&logo=electron&logoColor=9FEAF9"/>
<img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>

# What does it do?
Elecrue is a boilerplate generator, it generates the boilercode for electron with react or vue with tailwindcss.

# Current Templates
```
1. react-electron-js
2. react-electron-ts
4. react-electron-tailwind-js
5. react-electron-tailwind-ts
6. vue-electron-js
7. vue-electron-tailwind-js
```

# Why Elecrue don't use IPC?
From my experience connecting electron to react or vue is a hard thing, So I found a much easier and reliable solution to this problem, By creating an express server in electron file we can make endpoints for our react or vue application to hit, when app will request those endpoints it will trigger an event by doing that we can do all the work that we can't do in react or vue. Think of it as a function in another file but without calling you are making get request to the server to trigger that function.

## How to install it?
```
  npm i -g elecrue
```
## How to use it?
![Elecrue Terminal](https://user-images.githubusercontent.com/63385587/132942925-bbd9a3db-63c9-4cd3-be4b-45ab6a9749ef.png)
