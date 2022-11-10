create database cashcarry;
alter database cashcarry owner to societe;

create sequence admindept_seq;
create sequence dept_seq;
create sequence societe_seq;
create sequence achattype_seq;
create sequence besoin_seq;
create sequence produit_seq;

create table departement(
    iddept varchar(10) default 'DEP'||nextval('dept_seq') primary key,
    nomdepartement varchar(40) not null
);
insert into departement(nomdepartement) values('logistique'),('Communication'),('Marketing'),('Gestion'),('Approvisionnement');


create table admindept(
    idadmin varchar(10) default 'ADD'||nextval('admindept_seq') primary key,
    identifiant varchar(40) not null,
    mdp varchar(40) not null,
    iddept varchar(10),
    FOREIGN KEY (iddept) REFERENCES departement(iddept)
);
insert into admindept values(identifiant,mdp,iddept) values 
('Koto','Koto','DEP1'),
('Lova','Lova','DEP2'),
('Aro','aro','DEP3'),
('Oli','oli','DEP4'),
('Hary','hary','DEP5')
;


create table societe(
    idsociete varchar(10) default 'SOC'||nextval('societe_seq') primary key,
    nomsociete varchar(40) not null,
    reference varchar(40) not null,
    adresse varchar(40) not null
);
insert into societe(nomsociete,reference,adresse)values 
('Nodie','34516788','Andoharanofotsy');

create table achattype(
    idachattype varchar(10) default 'ACH'||nextval('achattype_seq') primary key,
    nomachattype varchar(40) not null
);
insert into achattype(nomachattype) values
('Achat'),('Interne');

create table ressource(
    idressource varchar(10) default 'RESS'||nextval('ressource_seq') primary key,
    nomressource varchar(40) not null,
    idachattype varchar(10),
    FOREIGN KEY (idachattype) REFERENCES achattype(idachattype)
);

create table besoin(
    idbesoin varchar(10) default 'BES'||nextval('besoin_seq') primary key,
    quantite integer,
    iddept varchar(10),
    datelimite date default current_timestamp
);

create table fournisseurressources(
    idressource varchar(10),
    idfournisseur varchar(10),
    FOREIGN KEY (idressource) REFERENCES ressource(idressource),
    FOREIGN KEY (idfournisseur) REFERENCES fournisseur(idfournisseur)
);

create table produit(
    idproduit varchar(10) default 'PRO'||nextval('produit_seq') primary key,
    idbesoin varchar(10),
    idressource varchar(10),
    qualite varchar(40) not null,
    delailivraison timestamp not null,
    lieulivraison varchar(40) not null,
    prix integer
);

-- ok