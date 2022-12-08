import React, { Component } from 'react';
import Info from './Info';
import FicheNote from './FicheNote';
import '../assets/css/bootstrap.min.css';
import URLHelper from '../Helper/URLHelper';

class EvalProf extends Component {
    state = { 
        ind:new URLSearchParams(window.location.search).get("idproformat"),
        inf:{
            idproformat_fournisseur:"",
            idfournisseur:"",
            idreferencedemande:"",
            qualite: "",
            quantite: 0,
            delailivraision:new Date(),
            lieulivraison: "",
            pu:0,
            idressource:"",
            nomfournisseur:""
        },
        detailsprof:[{
            iddetail:0,
            intitule: "",
            coefficient: 0
        }]
     } 
     constructor () {
        super();
        let json={
            idproformat_fournisseur:this.state.ind,
            iddemande_ressource:new URLSearchParams(window.location.search).get("iddemande")
        }
     this.getProformat_fournisseurs(json);
     this.listdetail();
        //this.setState({detailsprof:FetchHelper.getData("test")})// maka detail 
    } 
     getProformat_fournisseurs=(json)=>{
       
        fetch(URLHelper.urlgen("api/Proformat_fournisseur_demande/login?data="+JSON.stringify(json)),{crossDomain:true,method:'GET',headers:{}})
        .then(res=>{return res.json() ; })
        .then(data=>{ 
            this.setState({inf:data.data[0]});
         })
      
    }
    listdetail=()=>{
        
        fetch(URLHelper.urlgen("api/Detailsformat"),{crossDomain:true,method:'GET',headers:{}})
        .then(res=>{return res.json() ; })
        .then(data=>{ 
            this.setState({detailsprof:data});
            return null;
         })
    }
    render() { 
        
        return (
            <React.Fragment>
                <div className="card shadow mb-3">
                <div className="title-card card-header bg-info">
                    <p className="text m-0 fw-bold">Evaluer Proformat  du fournisseur</p>
                </div>
                <div className="card-body">
                <div className="container">
                <div className='row'>
                    <div className='col'>
                    <Info inf={this.state.inf}></Info>
                    </div>
                   <div className='col'>
                   <FicheNote details={this.state.detailsprof} ind={this.state.ind}></FicheNote>
                   </div>
                   
                  
                    
                </div>
                </div>
                </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default EvalProf;