USE employeeDB;

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Engineer");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Exec", 50000.00, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Engineer", 100000.00, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("John", "Doe", 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Jane", "Doe", 2);