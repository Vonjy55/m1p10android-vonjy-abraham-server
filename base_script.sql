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

create table articles(
    id integer NOT NULL PRIMARY KEY autoincrement,
    titre varchar(255) NOT NULL,
    descr varchar(255),
    date_pub text,
    date_modif text
);

-- Jeu de donnees articles(Tsy valide tsony)

-- INSERT INTO articles (
--     titre, descr, date_pub, date_modif
-- ) VALUES 
-- ( 'Vato Beach', 'Espace', date('now'), date('now') ),
-- ( 'Park de Timbazaza', 'Park', date('now'), date('now') ),
-- ( 'Rova de Manjakamiadana', 'Patrimoine historique', date('now'), date('now') ),
-- ( 'Tsingy de Bemaraha', 'Park', date('now'), date('now') ),
-- ( 'KFC Gasy', 'Fast Food', date('now'), date('now') ),
-- ( 'Celtel Hotel', 'Hotel et relaxation', date('now'), date('now') ),
-- ( 'Rakiki au Palais des sports', 'Evenement culturel', date('now'), date('now') );
--
--
-- INSERT INTO articles (
--     titre, descr, date_pub, date_modif
-- ) VALUES
-- ( 'test', 'Evenement culturel', date('now'), date('now') );
