import React, { Component } from 'react';
import FetchHelper from '../Helper/FetchHelper';
import LigneReponse from './LigneReponse';
import URLHelper from '../Helper/URLHelper';
class ListeReponse extends Component {
    state = { 
        inf:[{
            delailivraison:"",
            intitule: "",
            reference:"",
        }]
     } 
    constructor(){
        super();
    //    this.state = {inf:FetchHelper.getData(URLHelper.urlgen("api/Proformat_fournisseur_demande_ressource"))};
    this.listProformatRecu();
    }
    listProformatRecu=async ()=>{
        const val=await (FetchHelper.getData(URLHelper.urlgen("api/Proformat_fournisseur_demande_ressource")));
        this.setState({inf:val});
    }
    
    render() { 
        return (
            <div className="container card shadow mb-3">
                <div className="title-card card-header bg-info">
                        <p className="text m-0 ">Liste des reponses des Fournisseurs</p>
                    </div>
                    <div className=" container card-body">
                {this.state.inf.map(el=>
                    <LigneReponse inf={el}></LigneReponse>    
                )}
                </div>
            </div>
        );
    }
}
 
export default ListeReponse;