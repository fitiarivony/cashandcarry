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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
    <Route path={'/'} element={<Login/>} ></Route>
    <Route path={'/list'} element={<List/>} ></Route>
    <Route path={'/ajoutRessource'} element={<AjoutRessource/>} ></Route>
    <Route path={'/demandeRessource'} element={<DemandeRessource/>} ></Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
