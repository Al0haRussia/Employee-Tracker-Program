// consts for required npms
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

//references the server.js file for the connect and run employee function
const serverFunc = require('../server');

//function will view all the roles
const viewRoles = () => {
    const query = 'SELECT id, title, salary, department_id FROM roles';
    serverFunc.connection.query(query, (err, res) => {
        if (err) throw err;
        res.forEach(({ id, title, salary, department_id }) => {
            console.table([
                {
                ID: id,
                Title: title,
                Salary: salary,
                Department_ID: department_id
                }
            ]);
        });
        serverFunc.runEmployeeProgram();
    });
};

//function will add a role
const addRole = () => {
    inquirer.prompt([{
        type: 'input',
        message: 'What role would you like to add?',
        name: 'title'
    } , {
        type: 'number',
        message: 'How much will the role make?',
        name: 'salary'
    } , {
        type: 'number',
        message: 'What department is the role apart of?',
        name: 'depid'
    }]).then((answer) => {
        const query = `INSERT INTO roles (title, salary, department_id) VALUES ("${answer.title}", ${answer.salary}, ${answer.depid})`;
        serverFunc.connection.query(query, (err, res) => {
            if (err) throw err;
            console.table('You have entered:', [{
                Role_Title: answer.title,
                Role_Salary: answer.salary,
                Role_Deparment_ID: answer.depid
            }]);
            serverFunc.runEmployeeProgram();
        });
    });
};

//exports functions to be used in the server.js file
exports.viewRoles = viewRoles;
exports.addRole = addRole;