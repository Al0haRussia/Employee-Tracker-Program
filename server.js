//consts for required npms
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

//all the consts for the functions in the routs use in the run employee program
const departmentFuncs= require('./routes/departments');
const employeeFuncs = require('./routes/employee');
const rolesFuncs = require('./routes//roles');

//connection to the database that will hold all the information
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'CodingBootCampIsAwesome1!',
  database: 'employeeDB',
});

//connects to the database
connection.connect((err) => {
  if (err) throw err;
  runEmployeeProgram();
});

//the menu of the program, will run a specific function depending on the option you choose
const runEmployeeProgram = () => {
    inquirer.prompt({
        type: 'list',
        message: "Welcome to the Employee Program, select an option to continue or exit the program.",
        choices: [
            'View Departments',
            'Add Department',
            new inquirer.Separator(),
            'View Roles',
            'Add Role',
            new inquirer.Separator(),
            'View Employees',
            'View Employees By Manager',
            'Add Employee',
            new inquirer.Separator(),
            'Update Employee Role',
            'Update Employee Managers',
            new inquirer.Separator(),
            'Exit Program',
            new inquirer.Separator(),
        ],
        name: 'menu'
    }).then((answer) => {
        switch (answer.menu) {
            case 'View Departments':
                // run view departments function
                departmentFuncs.viewDepartments();
                break;
            
            case 'Add Department':
                // run add department function
                departmentFuncs.addDepartments();
                break;
            
            case 'View Roles':
                //run view roles function
                rolesFuncs.viewRoles();
                break;

            case 'Add Role':
                //run add role function
                rolesFuncs.addRole();
                break;

            case 'View Employees':
                //run view employee function
                employeeFuncs.viewEmployee();
                break;

            case 'View Employees By Manager':
                // run view employees by manager function
                employeeFuncs.viewEmployeesManager();
                break;
            
            case 'Add Employee':
                //run add employee function
                employeeFuncs.addEmployee();
                break;
                
            case 'Update Employee Role':
                //run update employee role function
                employeeFuncs.updateEmployeeRole();
                break;

            case 'Update Employee Managers':
                // run update employee managers
                employeeFuncs.updateEmployeeManager();
                break;

            case 'Exit Program':
                console.log('Thank you for using the Employee Program! Goodbye!');
                connection.end();
                break;
            
            default:
                console.log('Notice: An Error has occured. Restart the program. If that does not fix the issue, contact the developer.');
                connection.end();
        }
    })
}

//used to export connection and function to be used in the routes
exports.runEmployeeProgram = runEmployeeProgram;
exports.connection = connection;