CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE users(
    id integer NOT NULL PRIMARY KEY autoincrement,
    nom varchar(255) NOT NULL,
    prenom varchar(255),
    email varchar(200) not null,
    telephone varchar(30),
    adresse varchar(200),
    password varchar(100),
    role varchar(20)
);
CREATE TABLE villes(
    id integer NOT NULL PRIMARY KEY autoincrement,
    nom text NOT NULL,
    longitude real NOT NULL,
    latitude real NOT NULL
);
CREATE TABLE IF NOT EXISTS "articles"(
    id integer NOT NULL PRIMARY KEY autoincrement,
    titre varchar(255) NOT NULL,
    descr varchar(255),
    contenu text, -- contenu de l'article (HTML)
    date_pub text,
    date_modif text, video text, longitude decimal, latitude decimal
);
