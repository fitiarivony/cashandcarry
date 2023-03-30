create database cashcarry;
alter database cashcarry owner to societe;

create sequence admindept_seq;
create sequence dept_seq;
create sequence societe_seq;
create sequence achattype_seq;
create sequence ressource_seq;
create sequence demanderessource_seq;
create sequence fournisseur_seq;
create sequence prenvoye_seq;
create sequence proformatfournisseur_seq;
create sequence stock_seq;
create sequence boncommande_seq;
create sequence bonlivraison_seq;
create sequence bonreception_seq;
create sequence bonsortie_seq;
create sequence facture_seq;
create sequence reception_interne_seq;
create sequence lignereception_seq;
create sequence stock_fournisseur_seq;
create sequence nature_seq;


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
    adresse varchar(40) not null,
    contact varchar(40) not null
);
-- alter table societe add column contact varchar(40) not null default '0345632466';
insert into societe(nomsociete,reference,adresse,contact)values
('Nodie','34516788','Andoharanofotsy','0345632466');

create table achattype(
    id serial,
    idachattype varchar(10) default 'ACH'||nextval('achattype_seq') primary key,
    nomachattype varchar(40) not null
);
insert into achattype(nomachattype) values
('Achat'),('Interne');

create table nature(
    idnature varchar(10) default 'NA'||nextval('nature_seq') primary key,
    nomnature varchar(40) not null
);
insert into nature(nomnature) values
('LIFO'),('FIFO'),('CMUP')
;

create table ressource(
    id serial,
    idressource varchar(10) default 'RES'||nextval('ressource_seq') primary key,
    intitule varchar(40) not null,
    idachattype varchar(10),
    code varchar(30) not null,
    idnature varchar(10) not null,
    FOREIGN KEY (idnature) REFERENCES nature(idnature),
    FOREIGN KEY (idachattype) REFERENCES achattype(idachattype)
);
insert into ressource(intitule,idachattype,code,idnature) values
('Kiraro','ACH1','HE2','NA1'),
('Veste','ACH1','JH8','NA2'),
('Fournitures','ACH2','KO9','NA3')
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
('Zara','IVB 67 Andohalo','0345234523','HU5'),
('Nodie','IVJ 45 Andoharanofotsy','0322903345','ND5')
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
    dejarecu float default 0,
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
    idfournisseur varchar(10)  default 'FOU6',
    -- à meiter
    idclient varchar(10) default 'FOU6',
    FOREIGN KEY (idressource) REFERENCES ressource(idressource),
    FOREIGN KEY (idfournisseur) REFERENCES fournisseur(idfournisseur),
    -- A mediter
   FOREIGN KEY (idclient) REFERENCES fournisseur(idfournisseur)
);
-- alter table proformat_envoye alter column idfournisseur set default 'FOU6';
-- alter table proformat_envoye add column idclient varchar(10) default 'FOU6';
-- alter table proformat_envoye add foreign key (idclient) references fournisseur(idfournisseur);

insert into proformat_envoye(reference, idressource, intitule, idfournisseur,quantite)values
('DO1','RES1','Achat chaussure','FOU2',14),
('DO2','RES1','Achat chaussure','FOU4',14),
('DO3','RES1','Achat chaussure','FOU5',14),
('DO4','RES2','Achat Veste','FOU5',10)
;

insert into proformat_envoye(reference, idressource, intitule,quantite,idclient)values
('DO4','RES1','Essai client',10,'FOU5')
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
('FOU5','PRE3','Cuir',5,'12/04/2022','Ankadifotsy',45000,'02/04/2022'),
('FOU5','PRE4','Cuir',5,'12/04/2022','Ankadifotsy',4500,'02/04/2022')
;

insert into proformat_fournisseur(idfournisseur,idreferencedemande,qualite,quantite,delailivraison,lieulivraison,pu,daty) values
('FOU6','PRE5','Cuir',5,'12/04/2022','Ankadifotsy',4500,'02/04/2022')
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
proformat_envoye.idprenvoye,proformat_envoye.idclient
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
where idclient='FOU6'
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
where idclient='FOU6'
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
    datesortie timestamp default CURRENT_TIMESTAMP,
    FOREIGN KEY (idressource) REFERENCES ressource(idressource)
);
INSERT INTO mouvement_stock(idressource,pu,quantite,datesortie) VALUES
('RES1',1000,10,'01/01/2022'),
('RES1',800,15,'02/01/2022')
;


create table stock_fournisseur(
    idstock varchar(10) default 'STO'||nextval('stock_fournisseur_seq') primary key,
    idressource varchar(10),
    pu float not null,
    idfournisseur varchar(10),
    quantite float not null,
    datesortie timestamp default CURRENT_TIMESTAMP,
    FOREIGN KEY (idressource) REFERENCES ressource(idressource),
    FOREIGN KEY (idfournisseur) REFERENCES fournisseur(idfournisseur)
);
INSERT INTO stock_fournisseur(idressource,pu,quantite,datesortie,idfournisseur) VALUES
('RES1',1000,10,'01/01/2022','FOU1'),
('RES1',800,15,'02/01/2022','FOU1')
;



create table boncommande(
    idboncommande varchar(10) default 'BDC'||nextval('boncommande_seq') primary key,
    datecommande date default current_timestamp,
    etat integer default 0
);
insert into boncommande (datecommande,etat) values (current_timestamp,0);

create table lignecommande(
    idboncommande varchar(10),
    idproformat_fournisseur varchar(10),
    quantite float not null,
    FOREIGN KEY (idproformat_fournisseur) REFERENCES proformat_fournisseur(idproformat_fournisseur),
    FOREIGN KEY (idboncommande) REFERENCES boncommande(idboncommande)
);
insert into lignecommande(idboncommande,idproformat_fournisseur,quantite) values
('BDC1','PRO3',4),
('BDC1','PRO4',4)
;

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
;


create table bonlivraison(
    idlivraison varchar(10) default 'BDL'||nextval('bonlivraison_seq') primary key,
    daty date default current_timestamp,
    idboncommande varchar(10),
    FOREIGN KEY (idboncommande) REFERENCES boncommande(idboncommande)
);
insert into bonlivraison(idboncommande) values
('BDC1'),('BDC1')
;


create table detaillivraison(
    idlivraison varchar(10),
    idstock varchar(10),
    quantite float not null,
    FOREIGN KEY (idlivraison) REFERENCES bonlivraison(idlivraison)
);
insert into detaillivraison(idstock,idlivraison,quantite) values
('RES1','BDL1',2),
('RES2','BDL1',2),
('RES1','BDL2',2),
('RES2','BDL2',2)
;

create table bonsortie(
    idbonsortie varchar(10) default 'BDS'||nextval('bonsortie_seq') primary key,
    datesortie date default current_timestamp
);


create table detailsortie(
    idbonsortie varchar(10),
    idstock varchar(10),
    quantite float not null,
    FOREIGN KEY (idbonsortie) REFERENCES bonsortie(idbonsortie)
);



create table bonreception(
    idbonreception varchar(10) default 'BDR'||nextval('bonreception_seq') primary key,
    datereception date default current_timestamp,
    idlivraison varchar(10),
    FOREIGN KEY (idlivraison) REFERENCES bonlivraison(idlivraison)
);

insert into bonreception(idlivraison)values
('BDL1'),('BDL2')
;


create table lignereception(
    idlignereception varchar(10) default 'LIR'||nextval('lignereception_seq') primary key,
    idbonreception varchar(10),
    idressource varchar(10),
    quantite float not null,
    FOREIGN KEY (idbonreception) REFERENCES bonreception(idbonreception)
);
insert into lignereception(idressource,idbonreception,quantite) values
('RES1','BDR1',2),
('RES2','BDR1',2),
('RES1','BDR2',2),
('RES2','BDR2',2)
;




create table facture(
    idfacture varchar(10) default 'FAC'||nextval('facture_seq') primary key,
    datefacture date default current_timestamp,
    idboncommande varchar(10),
    etat integer default 0,
    FOREIGN KEY (idboncommande) REFERENCES boncommande(idboncommande)
);


create table reception_interne(
    idreception varchar(10) default 'REI'||nextval('reception_interne_seq') primary key,
    quantite float not null,
    idlignereception varchar(10),
    iddept varchar(10),
    datereception date default current_timestamp,
    FOREIGN KEY (idlignereception) REFERENCES lignereception(idlignereception)
);


create or replace view detail_bon_with_proformat AS
select idboncommande,a.idproformat_fournisseur,proformat_fournisseur_detail.quantite,proformat_fournisseur_detail.idressource from proformat_fournisseur_detail
join boncommande_detail as a on
proformat_fournisseur_detail.idproformat_fournisseur=a.idproformat_fournisseur;



create or replace view detail_bon_with_lignecommande AS
select idboncommande,a.idproformat_fournisseur,a.quantite,proformat_fournisseur_detail.idressource from proformat_fournisseur_detail join lignecommande as a on proformat_fournisseur_detail.idproformat_fournisseur=a.idproformat_fournisseur;



 create or replace view commanderesume as
select lignecommande.*,idfournisseur,idreferencedemande,qualite,lieulivraison,delailivraison,pu,idressource,besoin,idprenvoye
from lignecommande join envoye_fournisseur as a on lignecommande.idproformat_fournisseur = a.idproformat_fournisseur;

create or replace view bonreception_detail as
select bonreception.idlivraison,
idboncommande,a.* from bonreception
join lignereception as a
on bonreception.idbonreception = a.idbonreception
join bonlivraison as b on bonreception.idlivraison = b.idlivraison;


create view detail_livraison as
select sum(detaillivraison.quantite) quantite_livre,bonlivraison.idboncommande,detaillivraison.idstock,bonlivraison.idlivraison
from detaillivraison
join bonlivraison on
detaillivraison.idlivraison=bonlivraison.idlivraison
join ressource on detaillivraison.idstock=ressource.idressource
group by detaillivraison.idstock,bonlivraison.idboncommande,bonlivraison.idlivraison
;

select sum(lignereception.quantite)-sum(reception_interne.quantite) ,idressource from reception_interne
join lignereception
on lignereception.idlignereception=reception_interne.idlignereception
 group by idressource;



-- Liste des demande correspondant aux produits recus
create view colis_dispatcher as
select
lignereception.idlignereception,lignereception.quantite,
proformat_fournisseur_demande.iddemande_ressource,pourcentage
from lignereception
join bonreception on bonreception.idbonreception=lignereception.idbonreception
join bonlivraison on bonlivraison.idlivraison=bonreception.idlivraison
join boncommande on boncommande.idboncommande=bonlivraison.idboncommande
join detail_bon_with_proformat on detail_bon_with_proformat.idboncommande=boncommande.idboncommande
and lignereception.idressource=detail_bon_with_proformat.idressource
join proformat_fournisseur_demande on detail_bon_with_proformat.idproformat_fournisseur=proformat_fournisseur_demande.idproformat_fournisseur
join pourcentage on proformat_fournisseur_demande.iddemande_ressource=pourcentage.iddemande_ressource
where idlignereception not in(select idlignereception from reception_interne)
;

create view etat_stock as
select sum(quantite) quantite,pu,idressource,max(datesortie) datesortie from mouvement_stock
group by idressource,pu;

create view active_stock as
select *from etat_stock where quantite>0;


create or replace view cmup_stock
as select sum(quantite*pu) totalmontant,sum(quantite) totalquantite,mouvement_stock.idressource from mouvement_stock
join ressource on mouvement_stock.idressource=ressource.idressource
where idnature='NA3'
 group by mouvement_stock.idressource;






create view etat_stock_fournisseur as
select sum(quantite) quantite,pu,idressource,max(datesortie) datesortie,idfournisseur from stock_fournisseur
group by idressource,pu,idfournisseur;

create view active_stock_fournisseur as
select *from etat_stock_fournisseur where quantite>0;


create view cmup_stock_fournisseur
as select sum(quantite*pu) totalmontant,sum(quantite) totalquantite,idressource,idfournisseur from stock_fournisseur
 group by idressource,idfournisseur;



CREATE OR REPLACE VIEW BonReceptionComplete as
 select
  bonreception.idlivraison,
  bonreception_detail.idboncommande,
  idlignereception,
  bonreception.datereception,
  bonreception.idbonreception,
  ressource.idressource,
  bonreception_detail.quantite,
  idproformat_fournisseur,
  commanderesume.idfournisseur,
   idreferencedemande,
   lieulivraison,
   delailivraison,
    nomfournisseur,
    adresse,
    contact,
    codefournisseur,
    ressource. intitule as nomressource,
    ressource.code

  from bonreception_detail
 join commanderesume on
 commanderesume.idboncommande=bonreception_detail.idboncommande
and commanderesume.idressource=bonreception_detail.idressource
 join fournisseur on commanderesume.idfournisseur=fournisseur.idfournisseur
 join ressource on bonreception_detail.idressource=ressource.idressource
 join bonreception on bonreception_detail.idbonreception=bonreception.idbonreception
 ;

create view not_nodie as
select*from fournisseur where idfournisseur!='FOU6';


create view boncommande_fournisseur as
select boncommande.*,proformat_fournisseur.idfournisseur,proformat_envoye.idclient from boncommande
join lignecommande on boncommande.idboncommande=lignecommande.idboncommande
join proformat_fournisseur on lignecommande.idproformat_fournisseur=proformat_fournisseur.idproformat_fournisseur
join proformat_envoye on proformat_envoye.idprenvoye=proformat_fournisseur.idreferencedemande
group by boncommande.idboncommande,proformat_fournisseur.idfournisseur,proformat_envoye.idclient
;

create view bonreception_societe as
select bonreception.*,boncommande_fournisseur.idfournisseur,boncommande_fournisseur.idclient
 from bonreception
join bonlivraison
on bonlivraison.idlivraison=bonreception.idlivraison
join boncommande_fournisseur
on bonlivraison.idboncommande=boncommande_fournisseur.idboncommande
;


create view bonlivraison_societe as
select bonlivraison.*,boncommande_fournisseur.idfournisseur,boncommande_fournisseur.idclient
 from bonlivraison
join boncommande_fournisseur
on bonlivraison.idboncommande=boncommande_fournisseur.idboncommande
;


--   tfjftfj

CREATE VIEW  V_mvstock as
SELECT mouvement_stock.*,ressource.intitule as ressource from mouvement_stock
join ressource on
ressource.idressource=mouvement_stock.idressource;

CREATE VIEW V_activestock as
select active_stock.*,ressource.intitule as ressource from active_stock
join ressource on
ressource.idressource=active_stock.idressource;


CREATE or replace VIEW V_cmup as
 select  cmup_stock.*
 ,ressource.intitule as ressource
  from
 cmup_stock

 join ressource on
ressource.idressource=cmup_stock.idressource
;

create view stat_achat as
select idclient,idfournisseur,envoye_fournisseur.pu,envoye_fournisseur.idressource,envoye_fournisseur.quantite,facture.datefacture
from envoye_fournisseur join lignecommande on envoye_fournisseur.idproformat_fournisseur = lignecommande.idproformat_fournisseur join facture on lignecommande.idboncommande = facture.idboncommande
;
