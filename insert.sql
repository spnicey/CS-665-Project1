-- all records are example data generated by chatgpt

INSERT INTO Games (gameID, name, type, cost) VALUES
(1, 'Pac-Man', 'Arcade', 0.50),
(2, 'Street Fighter II', 'Fighting', 0.75),
(3, 'Time Crisis', 'Shooter', 1.00),
(4, 'Dance Dance Revolution', 'Rhythm', 1.25),
(5, 'Galaga', 'Arcade', 0.50),
(6, 'Mortal Kombat', 'Fighting', 0.75),
(7, 'Mario Kart Arcade GP', 'Racing', 1.50);

INSERT INTO Players (playerID, name, membership, balance) VALUES
(1, 'Alice Johnson', 1, 10.00),
(2, 'Bob Williams', 0, 5.50),
(3, 'Charlie Adams', 1, 20.00),
(4, 'Diana Evans', 0, 2.75),
(5, 'Eve Thompson', 1, 15.50),
(6, 'Frank Miller', 1, 8.00),
(7, 'Grace Robinson', 0, 3.25);

INSERT INTO Employees (employeeID, name, role, email) VALUES
(1, 'John Doe', 'Manager', 'john@arcade.com'),
(2, 'Sarah Smith', 'Technician', 'sarah@arcade.com'),
(3, 'Mike Johnson', 'Cashier', 'mike@arcade.com'),
(4, 'Emma Brown', 'Technician', 'emma@arcade.com'),
(5, 'David White', 'Manager', 'david@arcade.com'),
(6, 'Olivia Green', 'Cashier', 'olivia@arcade.com'),
(7, 'James Black', 'Technician', 'james@arcade.com');

INSERT INTO Plays (playerID, gameID, Score) VALUES
(1, 1, 12000),
(2, 3, 8500),
(3, 2, 18000),
(4, 5, 9500),
(5, 4, 22500),
(6, 6, 15200),
(7, 7, 13450),
(1, 2, 17250),
(2, 4, 9400),
(3, 5, 8300),
(4, 6, 21000),
(5, 1, 18750),
(6, 3, 9900),
(7, 2, 17800),
(1, 3, 15750),
(2, 7, 11200),
(3, 6, 9800),
(4, 1, 19350),
(5, 5, 10250),
(6, 4, 13500),
(7, 3, 11900),
(1, 5, 14500),
(2, 6, 20200),
(3, 1, 15400),
(4, 2, 17600),
(5, 7, 13200),
(6, 5, 11850);