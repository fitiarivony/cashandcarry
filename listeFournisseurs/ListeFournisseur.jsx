import React, { Component } from 'react';
import FetchHelper from '../Helper/FetchHelper';
import LigneFournisseur from './LigneFournisseur';
import URLHelper from '../Helper/URLHelper';
class ListeFournisseur extends Component {
    state = { 
        inf:[{
            adresse:"",
            codefournisseur:"",
            contact: "",
            idfournisseur:"",
            nomfournisseur:"",
        }]
     } 
    constructor(){
        super();
    //    this.state = {inf:FetchHelper.getData(URLHelper.urlgen("api/Proformat_fournisseur_demande_ressource"))};
    this.listProformatRecu();
    }
    listProformatRecu=async ()=>{
        const val=await (FetchHelper.getData(URLHelper.urlgen("api/fournisseurspro")));
        this.setState({inf:val.data});
        // console.log("hereeee");
    }
    
    render() { 
        return (
            <div className="container card shadow mb-3">
                <div className="title-card card-header bg-info">
                        <p className="text m-0 ">Liste  des Fournisseurs ayant des proformats validable</p>
                    </div>
                    <div className=" container card-body">
                {this.state.inf.map(el=>
                    <LigneFournisseur inf={el}></LigneFournisseur>    
                )}
                </div>
            </div>
        );
    }
}
 
export default ListeFournisseur;