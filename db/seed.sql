USE employees_db;

INSERT INTO department (department_name) VALUES
("Team Leaders"), ("Assistant Team Leaders"), ("Supervisors");

INSERT INTO roles (title, salary, department_id) VALUES
("Team Leader", 100000.00, 1), ("ATL", 90000.00, 2), ("Supervisor", 80000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("Melka", "Chiari", 1, NULL),
("Michelle", "Crawford", 2, 1),
("Silvana", "Lopez", 2, 1),
("Cris", "Franco", 3, 2),
("Carla", "De Sousa", 3, 2),
("Caleb", "Faustin", 3, 2),
("Shaquanda", "Young", 3, 2),
("Jean", "Gordon", 3, 2),
("Snow", "Patel", 3, 2),
("Samuel", "Blackmen", 3, 2),
("Mukter", "Nabi", 3, 2),
("Rose", "Long", 3, 3),
("Charles", "Gaffigan", 3, 3),
("Kareem", "Sangster", 3, 3),
("Megan", "Neisser", 3, 3),
("Daniel", "Lopez", 3, 3),
("Barry", "Boderick", 3, 3),
("Diana", "Figueroa", 3, 3),
("Aron", "Garcia", 3, 3);
