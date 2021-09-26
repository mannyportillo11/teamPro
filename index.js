const inquirer = require('inquirer');
const { writeFile, copyFile } = require('./lib/generateSite');
const generateSite = require('./src/page-template');

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

//initial empty employee object array
const employees = [];

//initializing Manager questions and welcome message
teamGo = () => {
    console.log("Welcome to Team Pro! \nPlease, answer the following prompts to build your team!");
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Who is the team's Manager? (Required)",
            validate: manaInput => {
                if (manaInput) {
                  return true;
                } else {
                  console.log("Please enter the Manager's name!");
                  return false;
                }
            }
        },
        {
            type: "input",
            name: "id",
            message: "What is the Manager's employee ID (Also Required):",
            validate: midInput => {
                if (midInput) {
                  return true;
                } else {
                  console.log("Please enter the Manager's ID!");
                  return false;
                }
            }
        },
        {
            type: "input",
            name: "email",
            message: "What is the manager's email address (Yup, Required):",
            validate: memInput => {
                if (memInput) {
                  return true;
                } else {
                  console.log("Please enter email address!");
                  return false;
                }
            }
            
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Manager's office number (Required):",
            validate: monInput => {
                if (monInput) {
                  return true;
                } else {
                  console.log("Please enter the manager's office number!");
                  return false;
                }
            }
        },
    ]).then((managerResults) => {
        managerResults.role = "Manager";
        const { name, id, email, officeNumber, role } = managerResults;
        const newManager = new Manager(name, id, email, officeNumber, role);
        employees.push(newManager);

        //add the next exmployee
        employeePosition();
    })
};

employeePosition = () => {
    console.log("What is the employee's role?");
    return inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "What is the Employee's position?",
            choices: [
                'Engineer',
                'Intern'
            ],
        }
    ]).then(choice => {
        if (choice.role === 'Engineer') {
            addEngineer();
        } else {
            addIntern();
        }
    })
};

teamGo();
