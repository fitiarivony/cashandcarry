import React, { Component } from 'react';
import FetchHelper from '../Helper/FetchHelper';
import LignePro from './LigneBonClient';
import URLHelper from '../Helper/URLHelper';
import LigneBonClient from './LigneBonClient';
class ListeBonClient extends Component {
    state = { 
        inf:[{
            idclient:"",
            nomclient: "",
            adresse:"",
            contact:"",
            codeclient:"",
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
            besoin:0,
            idproformat_client:"",
        }],
        
     } 
    constructor(){
        super();
        let json={
            idclient:new URLSearchParams(window.location.search).get("idclient")
        }
    //    this.state = {inf:FetchHelper.getData(URLHelper.urlgen("api/Proformat_client_demande_ressource"))};
    this.listProformatRecu(json);
    }
    listProformatRecu=async (json)=>{
        const val=await (FetchHelper.getData(URLHelper.urlgen("api/procommande?data="+JSON.stringify(json))));
        (this.setState({ inf: val }));
    }
    handleSubmit=(event) => {
        event.preventDefault();
        this.getchamp();
    }

   
    getchamp= () =>{
        var form = document.getElementById("myForm");
        var formData = new FormData(form);
        console.log(formData);
        let object = {};
        formData.forEach(
            (value, key) =>{
                let attribut=key.split("-");
                
                if(object[attribut[1]]!==undefined){
                    let tableau=[];
                    if(Array.isArray(object[attribut[1]]))tableau=[...object[attribut[1]]];
                    else tableau.push(object[attribut[1]]);
                    tableau.push(value);
                    object[attribut[1]]=tableau;
                }else{
                    object[attribut[1]] = value  
                }
               
                // console.log(key+"----"+value);
            } );
            let keys=Object.keys(object);
            keys.forEach(key =>{
                
            });
            // console.log(object);
        //  var json = JSON.stringify(object);
     
        
        let format=this.formatJSON(this.getChecked(object));
        this.getpdf(format);
        // this.askRessources(URLHelper.urlgen("logAdmin/login.php?data="+json));
    }
     getChecked=(object) =>{
        let tableau=[];
        let keys=Object.keys(object);
        keys.forEach(key =>{
          let array=object[key];
          console.log(array.length);
          let j=0;
            if(array.length===2){
                
                for (const i of array) {
                  
                    if(!isNaN(i)){
                        if(i===""){
                           let valeur=this.state.inf.filter((pro)=> pro.idproformat_client===key);
                           document.getElementsByName("quantite-"+key).value=valeur[0].quantite;
                            object[key][j]=valeur[0].quantite;
                            
                        }
                    }
                    j++;
                }
                tableau.push(object[key]);
            }
        });
       
        return tableau;
    }
    formatJSON=(json)=>{
        let boncommande={};
        boncommande.datecommande=new Date().toJSON().slice(0, 10);
        boncommande.idclient=this.state.inf[0].idclient;
        let lignescommande=[];
        for (const lignecommande of json) {
            let ligne={};
            for (const element of lignecommande) {
                if(!isNaN(element)){
                  ligne.quantite=element;
                }else ligne.idproformat_client=element;
            }
            lignescommande.push(ligne);
        }
        // console.log(lignescommande);
        let sending={};
        sending.boncommande=boncommande;
        sending.lignecommande=lignescommande;
        // console.log(sending);
        return sending;
    }
    getdate=()=>{
        let currentDate=new Date().toJSON().slice(0, 10);
       let elements=currentDate.split("-");
       let val="";
       elements.forEach(element => {
         val+=element;
       });
       return val;
    }
    getpdf =(json)=> {
        let vita=false;
        fetch(URLHelper.urlgen("api/storeBon"),{crossDomain:true,method:'POST', body: JSON.stringify(json), headers: {'Content-Type': 'application/pdf'}})
        .then(response=>{
            response.blob().then(blob=>{
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'BDC-'+this.getdate()+this.state.inf[0].idclient+'.pdf';
                alink.click();
                vita=true;
               if(vita){
                window.location.href="/achat";
               }
            })
        })
    }
    render() { 
        return (
            <div>
              
              <form action="" id="myForm" onSubmit={this.handleSubmit} >
            <div className="container card shadow mb-3">
                <div className="title-card card-header bg-info">
                        <p className="text m-0 ">Liste des clients ayant des proformats validable du client "{this.state.inf[0].nomclient}"</p>
                    </div>
                    <div className=" container card-body">
                    <table className='table table-bordered'>
                        <thead className='thead-dark'>
                            <th scope="col">Code client</th>
                            <th scope="col">Code ressource</th>
                            <th scope="col">Prix unitaire</th>
                            <th scope="col">Quantite propose</th>
                            <th scope="col">Quantite que vous allez prendre</th>
                            <th scope="col">Qualite</th>
                            <th scope="col">Lieu livraison</th>
                            <th scope="col">Date livraison</th>
                            <th scope="col">Quantite attendu</th>
                            <th scope="col"></th>
                        </thead>
                {this.state.inf.map(el=>
                    <LigneBonClient inf={el}></LigneBonClient>    
                )}
                </table>
                 
                </div>
                <input type="submit" value="Generer bon de commande"  className='btn btn-info' /> 
                <div style={{height:"20px"}}></div>
            </div>
            </form>   
            </div>
        );
    }
}
 
export default ListeBonClient;