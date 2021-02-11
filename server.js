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
                viewDepartments();
                break;
            
            case 'Add Department':
                // run add department function
                addDepartments();
                break;
            
            case 'View Roles':
                //run view roles function
                viewRoles();
                break;

            case 'Add Role':
                //run add role function
                addRole();
                break;

            case 'View Employees':
                //run view employee function
                viewEmployee();
                break;

            case 'View Employees By Manager':
                // run view employees by manager function
                viewEmployeesManager();
                break;
            
            case 'Add Employee':
                //run add employee function
                addEmployee();
                break;
                
            case 'Update Employee Role':
                //run update employee role function
                updateEmployeeRole();
                break;

            case 'Update Employee Managers':
                // run update employee managers
                updateEmployeeManager();
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

const viewEmployeesManager = () => {
    inquirer.prompt([{
        type: 'number',
        message: 'What is the Manager\'s ID?',
        name: 'mangrid'
    }]).then((answer) => {
        const query = `SELECT id, first_name, last_name, role_id FROM employee WHERE ${answer.mangrid} = manager_id`
        connection.query(query, (err, res) => {
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
            runEmployeeProgram();
        });
    });
}

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
        const query = `UPDATE employee SET role_id = ${answer.uproleid} WHERE id = ${answer.upID} AND first_name = "${answer.upfirstname}" AND last_name = "${answer.uplastname}"`;
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table('You have entered:', [{
                Employe_ID: answer.upID,
                Employee_First_Name: answer.upfirstname,
                Employee_Last_Name: answer.uplastname,
                Employee_Role_ID: answer.uproleid
            }]);
            runEmployeeProgram();
        });
    });
};

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
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table('You have entered:', [{
                Employe_ID: answer.upID,
                Employee_Role_ID: answer.upmangrid
            }]);
            runEmployeeProgram();
        });
    });
};