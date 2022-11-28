create database cashcarry;
alter database cashcarry owner to societe;

create sequence admindept_seq;
create sequence dept_seq;
create sequence societe_seq;
create sequence achattype_seq;
-- create sequence besoin_seq;
create sequence produit_seq;
create sequence ressource_seq;
create sequence demanderessource_seq;
create sequence fournisseur_seq;
create sequence prenvoye_seq;
create sequence proformatfournisseur_seq;

create table departement(
    id serial,
    iddept varchar(10) default 'DEP'||nextval('dept_seq') primary key,
    nomdepartement varchar(40) not null
);
insert into departement(nomdepartement) values
('logistique'),
('Communication'),
('Marketing'),
('Gestion'),
('Approvisionnement')
;


create table admindept(
    idadmin varchar(10) default 'ADD'||nextval('admindept_seq') primary key,
    identifiant varchar(40) not null,
    mdp varchar(40) not null,
    iddept varchar(10),
    FOREIGN KEY (iddept) REFERENCES departement(iddept)
);
insert into admindept (identifiant,mdp,iddept) values 
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
    id serial,
    idachattype varchar(10) default 'ACH'||nextval('achattype_seq') primary key,
    nomachattype varchar(40) not null
);
insert into achattype(nomachattype) values
('Achat'),('Interne');

create table ressource(
    id serial,
    idressource varchar(10) default 'RES'||nextval('ressource_seq') primary key,
    intitule varchar(40) not null,
    idachattype varchar(10),
    code varchar(30) not null,
    FOREIGN KEY (idachattype) REFERENCES achattype(idachattype)
);
insert into ressource(intitule,idachattype,code) values 
('Kiraro','ACH1','HE2'),
('Veste','ACH1','JH8'),
('Fournitures','ACH2','KO9')
;

-- create table besoin(
--     id serial,
--     idbesoin varchar(10) default 'BES'||nextval('besoin_seq') primary key,
--     quantite float not null default 1,
--     iddept varchar(10),
--     idressource varchar(10),
--      dateEnvoi timestamp not null default current_timestamp,
--     dateLimite timestamp not null default current_timestamp,
--     FOREIGN KEY (idressource) REFERENCES ressource(idressource)
-- );
-- insert into besoin (quantite,iddept,idressource) values 
-- (1,'DEP1','RES1'),
-- (2,'DEP2','RES2'),
-- (2,'DEP4','RES2')
-- ;




create table fournisseur(
    idfournisseur varchar(10) default 'FOU'||nextval('fournisseur_seq') primary key,
    nomfournisseur varchar(40) not null,
    adresse varchar(50) not null,
    contact varchar(20) not null,
    codefournisseur varchar(40) not null
);

insert into fournisseur (nomfournisseur,adresse,contact,codefournisseur) values
('Anto Textile','IVT 44 Antanimena','0343044023','RK5'),
('Aigle d or','IVK 22 Analakely','0323523945','GH6'),
('Sodim','IVR 40 Andraharo','0323429040','TH7'),
('Jina','IVH 50 Antanimena','0332343299','RT4'),
('Zara','IVB 67 Andohalo','0345234523','HU5')
;

create table fournisseurressource(
    idressource varchar(10),
    idfournisseur varchar(10),
    FOREIGN KEY (idressource) REFERENCES ressource(idressource),
    FOREIGN KEY (idfournisseur) REFERENCES fournisseur(idfournisseur)
);
insert into fournisseurressource values
('RES1','FOU2'),
('RES2','FOU1'),
('RES3','FOU3'),
('RES1','FOU4'),
('RES1','FOU5')
;

create table demande_ressource(
    id serial,
    iddemande_ressource varchar(10) default 'DER'||nextval('demanderessource_seq') primary key,
    idressource varchar(10),
    quantite float,
    iddept varchar(10),
    datedemande date,
    dateLimite timestamp,
    FOREIGN KEY (idressource) REFERENCES ressource(idressource),
    FOREIGN KEY (iddept) REFERENCES departement(iddept) 
);

create table proformat_envoye(
    id serial,
    idprenvoye varchar(10) default 'PRE'||nextval('prenvoye_seq') primary key,
    reference varchar(40) not null,
    idressource varchar(10),
    intitule varchar(50) not null,
    quantite float,
    idfournisseur varchar(10),
    FOREIGN KEY (idressource) REFERENCES ressource(idressource),
    FOREIGN KEY (idfournisseur) REFERENCES fournisseur(idfournisseur)
);

create table proformat_fournisseur(
    id serial,
    idproformat_fournisseur varchar(10) default 'PRO'||nextval('proformatfournisseur_seq') primary key,
    idfournisseur varchar(10),
    idreferencedemande varchar(10),
    qualite varchar(40) not null,
    quantite float not null,
    delailivraison timestamp not null,
    lieulivraison varchar(40) not null,
    PU integer,
    daty date,
    FOREIGN KEY (idfournisseur) REFERENCES fournisseur (idfournisseur)
);

create table superuser(
    identifiant varchar(40) not null,
    mdp varchar(40) not null
);
insert into superuser(identifiant,mdp) values 
('Root1','root1')
;


create view tri as
select demande_ressource.idressource,sum(quantite) totalquantite from demande_ressource 
join ressource 
on demande_ressource.idressource=ressource.idressource group by demande_ressource.idressource;

create view triage as
select ressource.*,totalquantite from tri join ressource on ressource.idressource=tri.idressource;

create view pourcentage  as
select triage.*,iddemande_ressource,iddept,quantite, (quantite::double precision/totalquantite::double precision)*100 pourcentage from triage 
join demande_ressource 
on demande_ressource.idressource=triage.idressource;

create view fourniss_ress_info as 
select fournisseur.*,idressource
from fournisseurressource
join fournisseur
on fournisseur.idfournisseur=fournisseurressource.idfournisseur
;
