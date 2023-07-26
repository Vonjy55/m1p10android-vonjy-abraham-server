create table users(
    id integer NOT NULL PRIMARY KEY autoincrement,
    nom varchar(255) NOT NULL,
    prenom varchar(255),
    email varchar(200) not null,
    telephone varchar(30),
    adresse varchar(200),
    password varchar(100),
    role varchar(20)
);