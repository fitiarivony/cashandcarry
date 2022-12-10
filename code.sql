create database cashcarry;
alter database cashcarry owner to societe;

create sequence admindept_seq;
create sequence dept_seq;
create sequence societe_seq;
create sequence achattype_seq;
create sequence produit_seq;
create sequence ressource_seq;
create sequence demanderessource_seq;
create sequence fournisseur_seq;
create sequence prenvoye_seq;
create sequence proformatfournisseur_seq;
create sequence stock_seq;
create sequence boncommande_seq;
create sequence bonlivraison_seq;
create sequence detaillivraison_seq;
create sequence bonreception_seq;
create sequence bonsortie_seq;
create sequence facture_seq;

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
('RES1','FOU5'),
('RES2','FOU5')
;

create table demande_ressource(
    id serial,
    iddemande_ressource varchar(10) default 'DER'||nextval('demanderessource_seq') primary key,
    idressource varchar(10),
    quantite float,
    iddept varchar(10),
    datedemande date,
    dateLimite timestamp,
    etat integer default 0,
    FOREIGN KEY (idressource) REFERENCES ressource(idressource),
    FOREIGN KEY (iddept) REFERENCES departement(iddept) 
);
insert into demande_ressource(idressource,quantite,iddept,datedemande,dateLimite) values
('RES1',4,'DEP1','20/03/2022','23/12/2022'),
('RES1',10,'DEP2','20/03/2022','23/12/2022'),
('RES2',10,'DEP3','20/03/2022','23/12/2022')
;


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
insert into proformat_envoye(reference, idressource, intitule, idfournisseur,quantite)values
('DO1','RES1','Achat chaussure','FOU2',14),
('DO2','RES1','Achat chaussure','FOU4',14),
('DO3','RES1','Achat chaussure','FOU5',14)
;

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
    daty date default current_timestamp,
    FOREIGN KEY (idfournisseur) REFERENCES fournisseur (idfournisseur),
    FOREIGN KEY (idreferencedemande) REFERENCES proformat_envoye(idprenvoye)
);
insert into proformat_fournisseur(idfournisseur,idreferencedemande,qualite,quantite,delailivraison,lieulivraison,pu,daty) values
('FOU2','PRE1','Cuir',14,'10/04/2022','Analakely',50000,'01/04/2022'),
('FOU4','PRE2','Dain',10,'11/04/2022','Antanimena',60000,'01/04/2022'),
('FOU5','PRE3','Cuir',5,'12/04/2022','Ankadifotsy',45000,'02/04/2022')
;

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
on demande_ressource.idressource=ressource.idressource where etat=0 group by demande_ressource.idressource;

create view triage as
select ressource.*,totalquantite from tri join ressource on ressource.idressource=tri.idressource ;

create view pourcentage  as
select triage.*,iddemande_ressource,iddept,quantite, (quantite::double precision/totalquantite::double precision)*100 pourcentage from triage 
join demande_ressource 
on demande_ressource.idressource=triage.idressource where etat=0;

create view fourniss_ress_info as 
select fournisseur.*,idressource
from fournisseurressource
join fournisseur
on fournisseur.idfournisseur=fournisseurressource.idfournisseur
;

create table detailsformat(
    iddetail serial primary key,
    intitule varchar(60) not null,
    coeff float not null
);
insert into detailsformat(intitule, coeff) values
('Prix',4),('Qualite',2),('Quantite',2.5)
;

create table noteproformat(
    id serial primary key,
    iddetailproformat integer,
    note double precision,
    idproformat varchar(10),
    FOREIGN KEY (idproformat) REFERENCES proformat_fournisseur(idproformat_fournisseur),
    FOREIGN KEY (iddetailproformat) REFERENCES detailsformat(iddetail)
);
insert into noteproformat(iddetailproformat,note,idproformat) values
(1,14,'PRO1'),(2,12,'PRO1'),(3,20,'PRO1'),
(1,11,'PRO2'),(2,17,'PRO2'),(3,15,'PRO2'),
(1,16,'PRO3'),(2,12,'PRO3'),(3,9,'PRO3')
;

create table bondecommandevalider(
    iddemande varchar(10),
    idfournisseur varchar(10),
    daty date,
    FOREIGN KEY (iddemande) REFERENCES demande_ressource(iddemande_ressource),
    FOREIGN KEY (idfournisseur) REFERENCES fournisseur(idfournisseur)
);


--Triage des proposition proformat 
create view classement_proformat as   
select 
alias.*,
proformat_fournisseur.idfournisseur,
proformat_envoye.idprenvoye,idressource,intitule
from
(select 
sum(note*coeff)/sum(coeff) note,idproformat 
from noteproformat
join detailsformat 
on detailsformat.iddetail=noteproformat.iddetailproformat
group by idproformat order by sum(note*coeff)/sum(coeff) desc) as alias
join proformat_fournisseur 
on proformat_fournisseur.idproformat_fournisseur=alias.idproformat
join proformat_envoye 
on proformat_envoye.idprenvoye=proformat_fournisseur.idreferencedemande
;
 
create view envoye_fournisseur as
select
idproformat_fournisseur,proformat_fournisseur.idfournisseur,idreferencedemande,qualite,
proformat_fournisseur.quantite,lieulivraison,delailivraison,pu,idressource,proformat_envoye.quantite besoin,
proformat_envoye.idprenvoye
 from proformat_fournisseur 
join proformat_envoye
on proformat_envoye.idprenvoye=proformat_fournisseur.idreferencedemande
;

create view classement_demande as
select envoye_fournisseur.*,note,pourcentage.iddemande_ressource,pourcentage.quantite demande_quantite from pourcentage join
envoye_fournisseur 
on envoye_fournisseur.besoin=pourcentage.totalquantite and envoye_fournisseur.idressource=pourcentage.idressource
join classement_proformat
on  classement_proformat.idprenvoye=envoye_fournisseur.idprenvoye
;

-- Proformat info
create or replace view proformat_fournisseur_detail as
select envoye_fournisseur.*,
nomfournisseur,adresse,contact,codefournisseur
from envoye_fournisseur
join fournisseur on
fournisseur.idfournisseur=envoye_fournisseur.idfournisseur
order by pu
;

create or replace view proformat_fournisseur_demande as
select envoye_fournisseur.*,pourcentage.iddemande_ressource,demande_ressource.etat,
nomfournisseur,adresse,contact,codefournisseur,
pourcentage.intitule,pourcentage.idachattype,pourcentage.code
from envoye_fournisseur join pourcentage
on envoye_fournisseur.besoin=pourcentage.totalquantite and envoye_fournisseur.idressource=pourcentage.idressource
join fournisseur on
fournisseur.idfournisseur=envoye_fournisseur.idfournisseur
join demande_ressource on demande_ressource.iddemande_ressource=pourcentage.iddemande_ressource
order by pu
;

create or replace view proformat_fournisseur_demandes as
select idproformat_fournisseur,array(select (iddemande_ressource) from proformat_fournisseur_demande where idproformat_fournisseur=pro.idproformat_fournisseur)
from proformat_fournisseur_demande as pro  group by idproformat_fournisseur;

create view proformat_fournisseur_demande_ressource as
select
envoye_fournisseur.*,
proformat_fournisseur_demandes.array reference,
intitule,idachattype,code 
from proformat_fournisseur_demandes
join envoye_fournisseur 
on envoye_fournisseur.idproformat_fournisseur=proformat_fournisseur_demandes.idproformat_fournisseur
join ressource on ressource.idressource=envoye_fournisseur.idressource
;


create table mouvement_stock(
    idstock varchar(10) default 'STO'||nextval('stock_seq') primary key,
    idressource varchar(10),
    pu float not null,
    quantite float not null,
    idsociete varchar(10),
    datesortie timestamp default CURRENT_TIMESTAMP,
    FOREIGN KEY (idressource) REFERENCES ressource(idressource)
);

create table boncommande(
    idboncommande varchar(10) default 'BDC'||nextval('boncommande_seq') primary key,
    datecommande date default current_timestamp
);

create table lignecommande(
    idboncommande varchar(10),
    idproformat_fournisseur varchar(10),
    quantite float not null,
    FOREIGN KEY (idproformat_fournisseur) REFERENCES proformat_fournisseur(idproformat_fournisseur)
);

create view boncommande_detail as
select 
boncommande.*,
lignecommande.quantite,lignecommande.idproformat_fournisseur,
proformat_fournisseur.idfournisseur,
proformat_fournisseur.qualite,
proformat_fournisseur.pu,
proformat_fournisseur.lieulivraison,proformat_fournisseur.delailivraison
from boncommande 
join lignecommande 
on lignecommande.idboncommande=boncommande.idboncommande
join proformat_fournisseur 
on proformat_fournisseur.idproformat_fournisseur=lignecommande.idproformat_fournisseur

create table bonlivraison(
    idlivraison varchar(10) default 'BDL'||nextval('bonlivraison_seq') primary key,
    daty date default current_timestamp,
    idboncommande varchar(10),
    FOREIGN KEY (idboncommande) REFERENCES boncommande(idboncommande)
);

create table detaillivraison(
    idlivraison varchar(10),
    idstock varchar(10),
    quantite float not null,
    FOREIGN KEY (idlivraison) REFERENCES bonlivraison(idlivraison)
);
create table bonsortie(
    idbonsortie varchar(10) default 'BDS'||nextval('bonsortie_seq') primary key,
    idlivraison varchar(10),
    FOREIGN KEY (idlivraison) REFERENCES bonlivraison(idlivraison)
);



create table bonreception(
    idbonreception varchar(10) default 'BDR'||nextval('bonreception_seq') primary key,
    datereception date default current_timestamp,
    idlivraison varchar(10),
    FOREIGN KEY (idlivraison) REFERENCES bonlivraison(idlivraison)
);

create table lignereception(
    idbonreception varchar(10),
    idressource varchar(10),
    quantite float not null,
    FOREIGN KEY (idbonreception) REFERENCES bonreception(idbonreception)
);

create table facture(
    idfacture varchar(10) default 'FAC'||nextval('facture_seq') primary key,
    datefacture date default current_timestamp
);


create table detailfacture(
    idfacture varchar(10),
    idlivraison varchar(10),
    FOREIGN KEY (idfacture) REFERENCES facture(idfacture),
    FOREIGN KEY (idlivraison) REFERENCES bonlivraison(idlivraison)
);

create table reception_interne(
    idreception varchar(10) default 'REC'||nextval('reception_interne_seq' ) primary key,
    iddept varchar(10),
    datereception date default current_timestamp,
    FOREIGN KEY (iddept) REFERENCES  departement(iddept)
);

create table detail_interne(
    idressource varchar(10),
    quantite float not null,
    idreception varchar(10),
    FOREIGN KEY (idreception) REFERENCES reception_interne(idreception),
    FOREIGN KEY (idressource) REFERENCES ressource(idressource)
);


