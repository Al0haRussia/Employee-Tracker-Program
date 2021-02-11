// consts for required npms
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

//references the server.js file for the connect and run employee function
const serverFunc = require('../server');

//function to view all employees
const viewEmployee = () => {
    const query = 'SELECT id, first_name, last_name, role_id, manager_id FROM employee';
    serverFunc.connection.query(query, (err, res) => {
        if (err) throw err;
        res.forEach(({ id, first_name, last_name, role_id, manager_id }) => {
            console.table([
                {
                ID: id,
                First_Name: first_name,
                Last_Name: last_name,
                Role_ID: role_id,
                Manager_ID: manager_id
                }
            ]);
        });
        serverFunc.runEmployeeProgram();
    });
};

//function to view employees by who their manager is
const viewEmployeesManager = () => {
    inquirer.prompt([{
        type: 'number',
        message: 'What is the Manager\'s ID?',
        name: 'mangrid'
    }]).then((answer) => {
        const query = `SELECT id, first_name, last_name, role_id FROM employee WHERE manager_id = ${answer.mangrid}`
        serverFunc.connection.query(query, (err, res) => {
            if (err) throw err;
            res.forEach(({ id, first_name, last_name, role_id}) => {
                console.table([
                    {
                    ID: id,
                    First_Name: first_name,
                    Last_Name: last_name,
                    Role_ID: role_id
                    }
                ]);
            });
            serverFunc.runEmployeeProgram();
        });
    });
}

//function to add a new employee
const addEmployee = () => {
    inquirer.prompt([{
        type: 'input',
        message: 'What is the employee\'s first name?',
        name: 'firstname'
    } , {
        type: 'input',
        message: 'What is the employee\'s last name?',
        name: 'lastname'
    } , {
        type: 'number',
        message: 'What role will the employee have?',
        name: 'roleid'
    } , {
        type: 'number',
        message: 'Who will be their manager? (Leave blank if they are the manager)',
        name: 'mangrid'
    }]).then((answer) => {
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.firstname}", "${answer.lastname}", ${answer.roleid}, ${answer.mangrid})`;
        serverFunc.connection.query(query, (err, res) => {
            if (err) throw err;
            console.table('You have entered:', [{
                Employee_First_Name: answer.firstname,
                Employee_Last_Name: answer.lastname,
                Employee_Role_ID: answer.roleid,
                Employee_Manager_ID: answer.mangrid
            }]);
            serverFunc.runEmployeeProgram();
        });
    });
};

//function to update an employee's role
const updateEmployeeRole = () => {
    inquirer.prompt([{
        type: 'number',
        message: 'What is the employee\'s ID you wish to update?',
        name: 'upID'
    } , {
        type: 'number',
        message: 'Which role do you wish to change to? (Please insert the ID number relating to the role)',
        name: 'uproleid'
    }]).then((answer) => {
        const query = `UPDATE employee SET role_id = ${answer.uproleid} WHERE id = ${answer.upID}`;
        serverFunc.connection.query(query, (err, res) => {
            if (err) throw err;
            console.table('You have entered:', [{
                Employe_ID: answer.upID,
                Employee_Role_ID: answer.uproleid
            }]);
            serverFunc.runEmployeeProgram();
        });
    });
};

//function to update the employee's manager
const updateEmployeeManager = () => {
    inquirer.prompt([{
        type: 'number',
        message: 'What is the employee\'s ID you wish to update?',
        name: 'upID'
    } , {
        type: 'number',
        message: 'Which Manager do you wish to change to? (Please input the number related to the Manager\'s ID number)',
        name: 'upmangrid'
    }]).then((answer) => {
        const query = `UPDATE employee SET manager_id = ${answer.upmangrid} WHERE id = ${answer.upID}`;
        serverFunc.connection.query(query, (err, res) => {
            if (err) throw err;
            console.table('You have entered:', [{
                Employe_ID: answer.upID,
                Employee_Role_ID: answer.upmangrid
            }]);
            serverFunc.runEmployeeProgram();
        });
    });
};

//exports functions to be used in the server.js file
exports.viewEmployee = viewEmployee;
exports.viewEmployeesManager = viewEmployeesManager;
exports.addEmployee = addEmployee;
exports.updateEmployeeRole = updateEmployeeRole;
exports.updateEmployeeManager = updateEmployeeManager;