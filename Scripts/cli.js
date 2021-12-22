#!/usr/local/bin/node

const fs = require('fs/promises');
const path = require('path');
const inquirer = require('inquirer');
const yargs = require('yargs');
const { lstatSync } = require('fs');

const options = yargs
    .options('p', {
        describe: 'Pattern',
        default: ''
    })
    .options('d', {
        describe: 'Path to directory', 
        default: process.cwd()
    }).argv;

console.log(options);

class itemsList {
    constructor(path, fileName) {
        this.path = path;
        this.fileName = fileName;
    }
    get folders() {
        return lstatSync(this.path).isDirectory();
    }
}

let executionDir = process.cwd();

const start = async () => {
    const list = await fs.readdir(executionDir);
    const items = list.map(fileName =>
        new itemsList(path.join(executionDir, fileName), fileName));
    
    const item = await inquirer.prompt([
        {
            name: 'fileName',
            type: 'list',
            message: `Choose: ${executionDir}`,
            choices: items.map(item => ({name: item.fileName, value: item})),
        }
    ]).then(answer => answer.fileName);
    
    if (item.folders) {
        executionDir = item.path;
        return await start();
    } else {
        const data = await fs.readFile(item.path, 'utf-8');

        if (!options.p) console.log(data);
        else {
            const regExp = new RegExp(options.p, 'igm');
            console.log(data.match(regExp));
        }
    }
}

start();
