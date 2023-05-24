CREATE TABLE IF NOT EXISTS users
(
    user_id INT NOT NULL PRIMARY KEY,
    name VARCHAR(20) DEFAULT 'Paul',
    surname VARCHAR(20) DEFAULT 'Kalashkov',
    lastname VARCHAR(20) DEFAULT 'Alexandrovich',
    birthdate DATE DEFAULT '2003-07-02',
    phone VARCHAR(20) DEFAULT '+79850491141',
    photo VARCHAR(20) DEFAULT 'avatar.png',
    chain VARCHAR(20) DEFAULT '1234',
    resume VARCHAR(20) DEFAULT 'resume.png'
);

CREATE TABLE IF NOT EXISTS skills
(
    name VARCHAR(40) DEFAULT 'New Skill' PRIMARY KEY,
    description VARCHAR(100) DEFAULT '',
    competence INT DEFAULT 0,
    startdate DATE DEFAULT '2003-07-02',
    enddate DATE DEFAULT '2023-07-02',
    link VARCHAR(500) DEFAULT '',
    image VARCHAR(50) DEFAULT 'avatar.png'
);

CREATE TABLE IF NOT EXISTS works
(
    name VARCHAR(40) DEFAULT 'New Work' PRIMARY KEY,
    description VARCHAR(100) DEFAULT '',
    href VARCHAR(500) DEFAULT '',
    image VARCHAR(50) DEFAULT ''
);