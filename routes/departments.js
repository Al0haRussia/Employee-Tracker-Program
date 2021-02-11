// consts for required npms
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

//references the server.js file for the connect and run employee function
const serverFunc = require('../server');

//function to view all the departments
const viewDepartments = () => {
    const query = 'SELECT id, name FROM department';
    serverFunc.connection.query(query, (err, res) => {
        if (err) throw err;
        res.forEach(({ id, name }) => {
            console.table([
                {
                ID: id,
                Department: name 
                }
            ]);
        });
        serverFunc.runEmployeeProgram();
    });
};

//function to add a department
const addDepartments = () => {
    inquirer.prompt({
        type: 'input',
        message: 'What department would you like to add?',
        name: 'depname'
    }).then((answer) => {
        const query = `INSERT INTO department (name) VALUES ("${answer.depname}")`;
        serverFunc.connection.query(query, (err, res) => {
            if (err) throw err;
            console.table('You have entered:', [{
                Deparment_Title: answer.depname
            }]);
            serverFunc.runEmployeeProgram();
        });
    });
};

//exports functions to be used in the server.js file
exports.viewDepartments = viewDepartments;
exports.addDepartments = addDepartments;