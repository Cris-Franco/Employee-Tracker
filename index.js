const mysql = require("mysql");
const inquirer = require("inquirer");
const express = require("express");
const cTable = require("console.table");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "15Feb19!123",
    database: "employees_db",
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);

    initTracker();
});

function initTracker() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Welcome to the employee tracker management system. What would you like to do?",
            choices: [
                {
                    name: "ADD a department",
                    value: "addDepartment",
                },
                {
                    name: "ADD a role",
                    value: "addRole",
                },
                {
                    name: "ADD an employee",
                    value: "addEmployee",
                },
                {
                    name: "VIEW all departments, roles, or employees",
                    value: "view",
                },
                {
                    name: "UPDATE employee roles",
                    value: "update",
                },
                {
                    name: "DELETE a department",
                    value: "deleteDepartment",
                },
                {
                    name: "DELETE a role",
                    value: "deleteRole",
                },
                {
                    name: "DELETE an employee",
                    value: "deleteEmployee",
                },
                new inquirer.Separator(),
                {
                    name: "Exit Employee Tracker",
                    value: "exit",
                },
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "view":
                    viewAll();
                    break;

                case "addDepartment":
                    addDepartment();
                    break;

                case "addRole":
                    addRole();
                    break;

                case "addEmployee":
                    addEmployee();
                    break;

                case "update":
                    updateRole();
                    break;

                case "deleteDepartment":
                    deleteDepartment();
                    break;

                case "deleteRole":
                    deleteRole();
                    break;

                case "deleteEmployee":
                    deleteEmployee();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}

function deleteDepartment() {

    displayAllDepartments();

    inquirer
        .prompt({
            name: "departmentId",
            type: "input",
            message: "Enter the ID of the department you want to delete",
        })
        .then((answer) => {
            console.log("Deleting department...\n");

            //Delete Department
            connection.query(
                "DELETE FROM department WHERE ?",
                {
                    id: answer.departmentId,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("Department deleted!\n");

                }
            );
            connection.query(
                "UPDATE roles SET ? WHERE ?",
                [
                    {
                        department_id: "0",
                    },
                    {
                        department_id: answer.departmentId,
                    },
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log(
                        "Roles that were assigned to this department have been updated to '0' which signifies that they are now unassigned to a department.\n"
                    );
                }
            );

            initTracker();
        });
}

function deleteRole() {

    displayAllRoles();

    inquirer
        .prompt({
            name: "roleId",
            type: "input",
            message: "Enter the ID of the role you want to delete",
        })
        .then((answer) => {
            console.log("Deleting role...\n");

            // Deletes Role
            connection.query(
                "DELETE FROM roles WHERE ?",
                {
                    id: answer.roleId,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("Department deleted!\n");
                }
            );

            connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                    {
                        role_id: "0",
                    },
                    {
                        role_id: answer.roleId,
                    },
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log(
                        "Employees that were assigned to this role have been updated to '0' which signifies that they are now unassigned to a role.\n"
                    );
                }
            );

            initTracker();
        });
}

function deleteEmployee() {

    displayAllEmployees();

    inquirer
        .prompt({
            name: "employeeId",
            type: "input",
            message: "Enter the ID of the employee you want to delete",
        })
        .then((answer) => {
            console.log("Deleting employee...\n");
            connection.query(
                "DELETE FROM employee WHERE ?",
                {
                    id: answer.employeeId,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("Employee deleted!\n");
                }
            );

            initTracker();
        });
}