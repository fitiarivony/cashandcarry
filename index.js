import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './login/Login';
import reportWebVitals from './reportWebVitals';
import  {
  BrowserRouter,Routes,Route
  } from "react-router-dom";  
import List from './gen/List';
import AjoutRessource from './ajoutRessource/AjoutRessource';
import DemandeRessource from './demandeRessource/DemandeRessource';
import ProTyper from './profromaTyping/ProTyper';
import ProSender from './proformatenvoyer/ProSender';
import ListeDemande from './listeDemande/ListeDemande';
import EvalProf from './evaluationProformat/EvaluationProformatFournisseur';
import ListeReponse from './listeReponse/ListeReponse';
import BonCommande from './boncommande/BonCommande';
import Main from './accueil/Main';
import MainVente from './accueil/MainVente';

import ListePro from './listeprorecu/ListePro';
import ListeFournisseur from './listeFournisseurs/ListeFournisseur';
import ListeRessource from './listeRessource/ListeRessource';
import ListeBon from './bonfournisseur/ListeBon';
import BonReceptionList from './bonreception/BonReceptionList';
import BonReception2 from './bonreception/BonReception2';
import HomeNodie from './accueil/HomeNodie';
import Livraison from './livraison/Livraison';
import BonCommandeListe from './Facture/BonCommandeListe';
import ProformatClient from './Vente/saisieProformatClient/ProformatClient';
import ListeBonClient from './Vente/bonclient/ListeBonClient';
import ListeClient from './Vente/listeClient/ListeClient';
import FactureGenerateur from './Vente/factgen/FactureGenerateur';

import LivraisonVente from './Vente/livraisonVente/LivraisonVente';

import ListeReceptionVente from './Vente/bonreceptionvente/BonReceptionList';
import BonReceptionVente from './Vente/bonreceptionvente/BonReceptionVente';
import ProTyperVente from './Vente/proformaTypingVente/ProTypeVente';
import InStock from './stock/In2';
import MouvementStock from './stock/MouvementStock';
import Stat from './Statistique/Stat';
import Cmup from './stock/Cmup';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      {/* Options demarrage */}
      <Route path={'/achat'} element={<Main/>} ></Route>
      <Route path={'/'} element={<HomeNodie/>} ></Route>
      <Route path={'/vente'} element={<MainVente/>} ></Route>
      
 {/* Achat */}
    <Route path={'/login'} element={<Login/>} ></Route>
    <Route path={'/list'} element={<List/>} ></Route>
    <Route path={'/ajoutRessource'} element={<AjoutRessource/>} ></Route>
    <Route path={'/demandeRessource'} element={<DemandeRessource/>} ></Route>
    <Route path={'/proformatyper'} element={<ProTyper/>} ></Route>
    <Route path={'/prosend'} element={<ProSender/>} ></Route>
    <Route path={'/evaluer'} element={<EvalProf/>} ></Route>
    {/* Moins disant  */}
    <Route path={'/listedemande'} element={<ListeDemande/>} ></Route>
    <Route path={'/listereponse'} element={<ListeReponse/>} ></Route>
    <Route path={'/listeressource'} element={<ListeRessource/>} ></Route>
    <Route path={'/proformat_fournisseur'} element={<ListePro/>} ></Route>

    {/* Bon de commande */}
    <Route path={'/listefournisseur'} element={<ListeFournisseur/>} ></Route>
    <Route path={'/bonfournisseur'} element={<ListeBon/>} ></Route>
    <Route path={'/boncommande'} element={<BonCommande/>} ></Route>

    {/* Bon de livraison  */}
    <Route path={'/livraison'} element={< Livraison />} ></Route>


    {/* Bon de reception */}
    <Route path={'/listereception'} element={< BonReceptionList />} ></Route>
    <Route path={'/reception'} element={< BonReception2 />} ></Route>

    {/* Bon de commande */}
    <Route path={'/facture'} element={< BonCommandeListe />} ></Route>

  {/* Vente */}
  {/* Proformats */}
  <Route path={'/proformatclient'} element={< ProformatClient />} ></Route>
  <Route path={'/proformatNodie'} element={< ProTyperVente />} ></Route>
  
  {/* Bon de commande */}
  <Route path={'/listebonclient'} element={< ListeClient />} ></Route>
  <Route path={'/bonclient'} element={< ListeBonClient />} ></Route>
  {/* Bon de livraison */}
  <Route path={'/livraisonvente'} element={< LivraisonVente />} ></Route>


  {/* Bon de reception */}
  <Route path={'/listereceptionvente'} element={< ListeReceptionVente />} ></Route>
    <Route path={'/receptionvente'} element={< BonReceptionVente />} ></Route>

  {/* Facture */}
  <Route path={'/factureclient'} element={< FactureGenerateur />} ></Route>


  {/* Stock */}
  <Route path={"/in"} element={<InStock/>}></Route>
    <Route path={"/mvstock"} element={<MouvementStock/>}></Route>

    <Route path={"/mvcmup"} element={< Cmup/>}></Route>
{/* Statistique */}
<Route path={"/stats"} element={< Stat/>}></Route>

    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
