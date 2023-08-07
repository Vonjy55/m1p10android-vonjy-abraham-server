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

CREATE TABLE IF NOT EXISTS "articles_new"(
    id integer NOT NULL PRIMARY KEY autoincrement,
    titre varchar(255) NOT NULL,
    descr varchar(255),
    contenu text, -- contenu de l'article (HTML)
    ville integer,
    date_pub text,
    date_modif text, video text, longitude decimal, latitude decimal
);


create table villes(
    id integer NOT NULL PRIMARY KEY autoincrement,
    nom text NOT NULL,
    longitude real NOT NULL,
    latitude real NOT NULL
);

alter table articles add column ville integer;
alter table articles add column video text;
alter table articles add column contenu text;
ALTER TABLE articles add column longitude decimal;
ALTER TABLE articles add column latitude decimal;

-- Jeu de donnees villes
INSERT INTO villes (
    nom, latitude, longitude
) VALUES
( 'global', 0, 0 ),
( 'Antananarivo', -18.891504, 47.517300 ),
( 'Mahajanga', -15.695517, 46.343246 ),
( 'Toamasina', -18.148496, 49.394193 ),
( 'Toliara', -23.356097, 43.690068 ),
( 'Antsiranana', -12.311559, 49.292644 ),
( 'Fianarantsoa', -21.452559, 47.087316 );

-- Jeu de donnees articles

 INSERT INTO articles (
     titre, descr, date_pub, date_modif, ville
 ) VALUES 
 ( 'Vato Beach', 'Espace', date('now'), date('now'), 2),
 ( 'Park de Timbazaza', 'Park', date('now'), date('now'), 6),
 ( 'Rova de Manjakamiadana', 'Patrimoine historique', date('now'), date('now'), 2),
 ( 'Tsingy de Bemaraha', 'Park', date('now'), date('now'), 3),
 ( 'KFC Gasy', 'Fast Food', date('now'), date('now'), 1),
 ( 'Celtel Hotel', 'Hotel et relaxation', date('now'), date('now'), 2),
 ( 'Rakiki au Palais des sports', 'Evenement culturel', date('now'), date('now'), 1);

--
-- INSERT INTO articles (
--     titre, descr, date_pub, date_modif
-- ) VALUES
-- ( 'test', 'Evenement culturel', date('now'), date('now') );
