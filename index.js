var fs = require("fs")
var inquirer = require("inquirer")
const util = require("util");

const writeFileAysnc = util.promisify(fs.writeFile)

function promptUser() { 
    return inquirer.prompt([
    {
        type: "input",
        message: "What is the title of this doc?",
        name: "title"
    },
    {
        type: "input",
        message: "What is a description of your project?",
        name: "description"
    },
    {
        type: "input",
        message: "What are the steps required to install your project?",
        name: "installation"
    },
    {
        type: "input",
        message: "Provide instructions and examples for use.",
        name: "usage"
    },
    {
        type: "list",
        message: "What licenses are needed for your application?",
        name: "license",
        choices: [1, 2, 3],
    },
    {
        type: "input",
        message: "What is your Github username?",
        name: "github"
    },
    {
        type: "input",
        message: "What is your email address?",
        name: "email"
    },

])
}

function generateReadMe (answers) {
    return `
    Title: ${answers.title}
    Description: ${answers.description}
    Table of Contents:
        Installation
        Licenses
        Description
        Instructions
    email: ${answers.email}
    Github: https://github.com/${answers.github}
    `
}

promptUser()
    .then(function(answers) {
        const readme = generateReadMe (answers)
        return writeFileAysnc("log.md", readme)
    })
    .then(function(){
        console.log("Success!")
    })
    .catch(function(err){
        console.log(err)
    })

