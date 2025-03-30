CREATE TABLE "Employees" (
	"employeeID"	INTEGER,
	"name"	TEXT,
	"role"	TEXT,
	"email"	INTEGER,
	PRIMARY KEY("employeeID")   
);								-- all data in the table is funtionally dependent on employeeID (which is the primary key)
								
CREATE TABLE "Games" (
	"gameID"	INTEGER,
	"name"	TEXT,
	"type"	TEXT,
	"cost"	REAL,
	PRIMARY KEY("gameID")   
);								-- all data in the table is funtionally dependent on gameID (which is the primary key)
								
CREATE TABLE "Players" (
	"playerID"	INTEGER,
	"name"	TEXT,
	"membership"	INTEGER,
	"balance"	REAL,
	PRIMARY KEY("playerID")   
);								-- all data in the table is funtionally dependent on playerID (which is the primary key)
								
CREATE TABLE "Plays" (
	"playID"	INTEGER,
	"playerID"	INTEGER,
	"gameID"	INTEGER,
	"Score"	INTEGER,
	PRIMARY KEY("playID" AUTOINCREMENT),  
	FOREIGN KEY("gameID") REFERENCES "Games"("gameID"),
	FOREIGN KEY("playerID") REFERENCES "Players"("playerID")
);								-- all data in the table is funtionally dependent on playID (which is the primary key)


-- the above sqlite code was created with DB Browser for sqlite (with the exception of the comments added later by me)