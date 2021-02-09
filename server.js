const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'CodingBootCampIsAwesome1!',
  database: 'employeeDB',
});

connection.connect((err) => {
  if (err) throw err;
  runEmployeeProgram();
});


const runEmployeeProgram = () => {
    inquirer.prompt({
        type: 'list',
        message: "Welcome to the Employee Program, select an option to continue or exit the program.",
        choices: [
            'View Departments',
            'Add Department',
            'View Roles',
            'Add Role',
            'View Employees',
            'Add Employee',
            'Update Employee Role',
            'Exit Program'
        ],
        name: 'menu'
    }).then((answer) => {
        switch (answer.menu) {
            case 'View Departments':
                // run view departments function
                viewDepartments();
                break;
            
            case 'Add Department':
                // run add department function
                addDepartments();
                break;
            
            case 'View Roles':
                //run view roles func
                viewRoles();
                break;

            case 'Add Role':
                //run add role func
                addRole();
                break;

            case 'View Employees':
                //run view employee func
                viewEmployee();
                break;
            
            case 'Add Employee':
                //run add employee func
                addEmployee();
                break;
                
            case 'Update Employee Role':
                //run update employee role func
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

const viewDepartments = () => {
    const query = 'SELECT id, name FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        res.forEach(({ id, name }) => {
            console.table([
                {
                ID: id,
                Department: name 
                }
            ]);
        });
        runEmployeeProgram();
    });
};

const addDepartments = () => {
    inquirer.prompt({
        type: 'input',
        message: 'What department would you like to add?',
        name: 'depname'
    }).then((answer) => {
        const query = `INSERT INTO department (name) VALUES ("${answer.depname}")`;
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table('You have entered:', [{
                Deparment_Title: answer.depname
            }]);
            runEmployeeProgram();
        });
    });
};

const viewRoles = () => {
    const query = 'SELECT id, title, salary, department_id FROM roles';
    connection.query(query, (err, res) => {
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
        runEmployeeProgram();
    });
};


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
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table('You have entered:', [{
                Role_Title: answer.title,
                Role_Salary: answer.salary,
                Role_Deparment_ID: answer.depid
            }]);
            runEmployeeProgram();
        });
    });
};

const viewEmployee = () => {
    const query = 'SELECT id, first_name, last_name, role_id, manager_id FROM employee';
    connection.query(query, (err, res) => {
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
        runEmployeeProgram();
    });
};

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
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table('You have entered:', [{
                Employee_First_Name: answer.firstname,
                Employee_Last_Name: answer.lastname,
                Employee_Role_ID: answer.roleid,
                Employee_Manager_ID: answer.mangrid
            }]);
            runEmployeeProgram();
        });
    });
};