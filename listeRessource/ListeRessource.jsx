import React, { Component } from 'react';
import FetchHelper from '../Helper/FetchHelper';
import LigneRessource from './LigneRessource';
import URLHelper from '../Helper/URLHelper';
class ListeRessource extends Component {
    state = { 
        inf:[{
            id:0,
            code:"",
            idachattype: "",
            idressource:"",
            intitule:"",
            quantite:0,
        }]
     } 
    constructor(){
        super();
    //    this.state = {inf:FetchHelper.getData(URLHelper.urlgen("api/Proformat_fournisseur_demande_ressource"))};
    this.listProformatRecu();
    }
    listProformatRecu=async ()=>{
        const val=await (FetchHelper.getData(URLHelper.urlgen("api/listeressource")));
        console.log(val);
        this.setState({inf:val.data});
    }
    
    render() { 
        return (
            <div className="container card shadow mb-3">
                <div className="title-card card-header bg-info">
                        <p className="text m-0 ">Liste  des Fournisseurs ayant des proformats validable</p>
                    </div>
                    <div className=" container card-body">
                {this.state.inf.map(el=>
                    <LigneRessource inf={el}></LigneRessource>    
                )}
                </div>
            </div>
        );
    }
}
 
export default ListeRessource;