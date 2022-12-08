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
import RightFournisseur from './rightfournisseur/RightFournisseur';
import Main from './accueil/Main';

import ListePro from './listeprorecu/ListePro';
import ListeFournisseur from './listeFournisseurs/ListeFournisseur';
import ListeRessource from './listeRessource/ListeRessource';
import ListeBon from './bonfournisseur/ListeBon';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
    <Route path={'/'} element={<Main/>} ></Route>
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
    <Route path={'/boncommande'} element={<RightFournisseur/>} ></Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
