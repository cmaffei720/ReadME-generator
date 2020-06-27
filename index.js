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
        choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"],
    },
    
    {
        type: "input",
        message: "What command should be run to run tests?",
        name: "command",
    },
    {
        type: "input",
        message: "What are the instructions for contributing to this project?",
        name: "contribute"
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
        Installation (#installation)
        Licenses (#licenses)
        Usage (#usage)
        Contributing (#contributions)

    ### Installation
    Installation instructions: ${answers.installation}

    ### Licenses
    This application is covered under the license: ${answers.license}

    ### Usage
    Usage: ${answers.usage}

    ### Contributions
    Contributing Instruction: ${answers.contribute}

    ### Command Line Instructions
    Command Line Instructions to run application: 
    ${answers.command}

    ### Github
    Github: https://github.com/${answers.github}

    ### Questions
    Questions: Please contact me at ${answers.email} with the subject line "ReadMe Questions" with further questions!
    `
}

promptUser()
    .then(function(answers) {
        const readme = generateReadMe (answers)
        return writeFileAysnc(`${answers.title}.md`, readme)
    })
    .then(function(){
        console.log("Success!")
    })
    .catch(function(err){
        console.log(err)
    })

