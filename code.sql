create database cashcarry;
alter database cashcarry owner to societe;

create sequence admindept_seq;
create sequence dept_seq;
create sequence societe_seq;
create sequence achattype_seq;
create sequence besoin_seq;
create sequence produit_seq;
create sequence ressource_seq;
create sequence fournisseur_seq;

create table departement(
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
    idachattype varchar(10) default 'ACH'||nextval('achattype_seq') primary key,
    nomachattype varchar(40) not null
);
insert into achattype(nomachattype) values
('Achat'),('Interne');

create table ressource(
    idressource varchar(10) default 'RES'||nextval('ressource_seq') primary key,
    nomressource varchar(40) not null,
    idachattype varchar(10),
    FOREIGN KEY (idachattype) REFERENCES achattype(idachattype)
);
insert into ressource(nomressource,idachattype) values 
('Kiraro','ACH1'),
('Veste','ACH1'),
('Fournitures','ACH2')
;

create table besoin(
    idbesoin varchar(10) default 'BES'||nextval('besoin_seq') primary key,
    quantite integer,
    iddept varchar(10),
    idressource varchar(10),
    FOREIGN KEY (idressource) REFERENCES ressource(idressource)
);
insert into besoin (quantite,iddept,idressource) values 
(1,'DEP1','RES1'),
(2,'DEP2','RES2'),
(2,'DEP4','RES2')
;


create table produit(
    idproduit varchar(10) default 'PRO'||nextval('produit_seq') primary key,
    idbesoin varchar(10),
    qualite varchar(40) not null,
    dateEnvoi timestamp not null,
    dateLimite timestamp not null,
    FOREIGN KEY (idbesoin) REFERENCES besoin(idbesoin)
);
insert into produit(idbesoin,qualite,dateEnvoi,dateLimite) 
values 
('BES1','Bonne','20/04/2022','31/12/2022'),
('BES2','Bonne','20/04/2022','11/12/2022'),
('BES2','Bonne','20/04/2022','31/12/2022'),
('BES3','Mauvaise','20/04/2022','31/12/2022'),
('BES3','Mauvaise','20/04/2022','31/12/2022'),
('BES3','Mauvaise','20/04/2022','31/12/2022')
;



create table fournisseur(
    idfournisseur varchar(10) default 'FOU'||nextval('fournisseur_seq') primary key,
    nomfournisseur varchar(40) not null,
    adresse varchar(50) not null,
    contact varchar(20) not null
);

create table fournisseurressources(
    idressource varchar(10),
    idfournisseur varchar(10),
    FOREIGN KEY (idressource) REFERENCES ressource(idressource),
    FOREIGN KEY (idfournisseur) REFERENCES fournisseur(idfournisseur)
);

create view tri as
select besoin.idressource,sum(quantite) totalquantite from besoin 
join ressource 
on besoin.idressource=ressource.idressource group by besoin.idressource;

create view triage as
select ressource.*,totalquantite from tri join ressource on ressource.idressource=tri.idressource;


