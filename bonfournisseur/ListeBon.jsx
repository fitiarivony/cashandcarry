import React, { Component } from 'react';
import FetchHelper from '../Helper/FetchHelper';
import LignePro from './LigneBon';
import URLHelper from '../Helper/URLHelper';
import LigneBon from './LigneBon';
class ListeBon extends Component {
    state = { 
        inf:[{
            idfournisseur:"",
            nomfournisseur: "",
            adresse:"",
            contact:"",
            codefournisseur:"",
            delailivraison:"",
            lieulivraison:"",
            pu:0,
            qualite:"",
            quantite:0,
            code:"",
            id:0,
            idachattype:"",
            idressource:"",
            intitule:"",
            besoin:0
        }],
        
     } 
    constructor(){
        super();
        let json={
            idfournisseur:new URLSearchParams(window.location.search).get("idfournisseur")
        }
    //    this.state = {inf:FetchHelper.getData(URLHelper.urlgen("api/Proformat_fournisseur_demande_ressource"))};
    this.listProformatRecu(json);
    }
    listProformatRecu=async (json)=>{
        const val=await (FetchHelper.getData(URLHelper.urlgen("api/procommande?data="+JSON.stringify(json))));
        this.setState({inf:val});
    }
    
    render() { 
        return (
            <div>
              

            <div className="container card shadow mb-3">
                <div className="title-card card-header bg-info">
                        <p className="text m-0 ">Liste  des Fournisseurs ayant des proformats validable du fournisseur "{this.state.inf[0].nomfournisseur}"</p>
                    </div>
                    <div className=" container card-body">
                    <table className='table table-bordered'>
                        <thead className='thead-dark'>
                            <th scope="col">Code fournisseur</th>
                            <th scope="col">Prix unitaire</th>
                            <th scope="col">Quantite</th>
                            <th scope="col">Qualite</th>
                            <th scope="col">Lieu livraison</th>
                            <th scope="col">Date livraison</th>
                            <th scope="col">Quantite attendu</th>
                        </thead>
                {this.state.inf.map(el=>
                    <LigneBon inf={el}></LigneBon>    
                )}
                </table>
                </div>
            </div>
            </div>
        );
    }
}
 
export default ListeBon;