import React, { Component } from 'react';
import FetchHelper from '../Helper/FetchHelper';
import LignePro from './LignePro';
import InfoDemande from './InfoDemande';
import URLHelper from '../Helper/URLHelper';
class ListeFournisseur extends Component {
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
            quantite:0
        }],
        ressource:{
            code:"",
            id:0,
            idachattype:"",
            idressource:"",
            intitule:"",
            totalquantite:0
        }
     } 
    constructor(){
        super();
        let json={
            idressource:new URLSearchParams(window.location.search).get("idressource")
        }
    //    this.state = {inf:FetchHelper.getData(URLHelper.urlgen("api/Proformat_fournisseur_demande_ressource"))};
    this.listProformatRecu(json);
    }
    listProformatRecu=async (json)=>{
        const val=await (FetchHelper.getData(URLHelper.urlgen("api/moinsdisant?data="+JSON.stringify(json))));
      
        console.log(val);
        this.setState({inf:val.data[0],ressource:val.data[1]});
    }
    
    render() { 
        return (
            <div>
                <InfoDemande ressource={this.state.ressource}></InfoDemande>

            <div className="container card shadow mb-3">
                <div className="title-card card-header bg-info">
                        <p className="text m-0 ">Liste  des Fournisseurs ayant des proformats validable</p>
                    </div>
                    <div className=" container card-body">
                    <table className='table table-bordered'>
                        <thead className='thead-dark'>
                            <th scope="col">Nom fournisseur</th>
                            <th scope="col">Code fournisseur</th>
                            <th scope="col">Prix unitaire</th>
                            <th scope="col">Quantite</th>
                            <th scope="col">Qualite</th>
                            <th scope="col">Lieu livraison</th>
                            <th scope="col">Date livraison</th>
                        </thead>
                {this.state.inf.map(el=>
                    <LignePro inf={el}></LignePro>    
                )}
                </table>
                </div>
            </div>
            </div>
        );
    }
}
 
export default ListeFournisseur;