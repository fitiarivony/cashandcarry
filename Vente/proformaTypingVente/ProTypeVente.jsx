import React, { Component } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

import URLHelper from '../../Helper/URLHelper';
import FetchHelper from '../../Helper/FetchHelper';
import classes from '../../assets/css/InsertProformat.module.css';

class ProTyperVente extends Component {
    state = { 
        listClient:[
            {
                idfournisseur:"",
                nomfournisseur:"",
                adresse:"",
                contact:"",
                codefournisseur:"",
            }
        ],
        listproformat:[
            {
                id:0,
                idprenvoye:"",
                reference:"",
                idressource:"",
                intitule:"",
                quantite:"",
                idfournisseur:"",
            }
        ],
        liststock:[
            {
               idressource:"",
               quantite:0,
               pu:0,
            }
        ]
     }
     constructor () {
        super();
       this.initialize();
    }

    initialize =()=> {
     
        this.getData();
        // this.setState({listFournisseur:data});
    }
    getData=()=>{
        
        fetch(URLHelper.urlgen("api/NotNodie"),{crossDomain:true,method:'GET',headers:{}})
        .then(res=>{return res.json() ; })
        .then(data=>{ 
            console.log(data);
          this.setState({listClient:data});
         })
        
    }
    onlyNumber=(event) => {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    }
    handleSubmit=(event) => {
        event.preventDefault();
        this.callchamp();
    }
    callchamp= () =>{
        var form = document.getElementById("myForm");
        var formData = new FormData(form);
        var object = {};
        formData.forEach((value, key) => object[key] = value);
        var json = JSON.stringify(object);
        console.log(formData);
        console.log( json);
        this.askRessources(json);
    }
    askRessources=(json)=>{
        fetch(URLHelper.urlgen("api/Proformat_fournisseur"),{crossDomain:true,method:'POST',headers:{'Content-Type': 'application/json'},body: (json)})
        .then(res=>{ console.log(res);
            return res.json() ; })
        .then(data=>{ 
            console.log(data);
            if (data.etat) {
                 window.location.replace("/vente")  
            }else{
                alert("erreur");
                console.log("echec");
            }
         })
    }
   
      formatResult = (item) => {
        return (
          <>
          <span style={{ display: 'block', textAlign: 'left' }}>{item.nomfournisseur}</span>
            <span style={{ display: 'block', textAlign: 'left' }}>Code: {item.codefournisseur}</span>
          </>
        )
      }
      handleOnSelect = (item) => {
         document.getElementById("idfournisseur").value='FOU6';
         this.findDemandeProformat(item.idfournisseur);
      }
      findDemandeProformat=async(idclient)=>{
        let json={
            idclient:idclient
        };
           const val=await(FetchHelper.getData(URLHelper.urlgen("api/getNoninsererClient?data="+JSON.stringify(json))));
           if(val.etat)this.setState({listproformat:val.data})
           else alert("No proformat found");
      }


      handleOnChange = (event) => {
    
        console.log("hello");
        let json={
            idprenvoye:event.target.value
        };
        
        this.getStock(json);
        
     }

     handleOnChangeQuantite = (event) => {

        let data=this.state.liststock.filter((stock)=>parseInt(stock.pu*1.3)=== parseInt(event.target.value));
        
        document.getElementById("quantite").value=data[0].quantite;  
        document.getElementById("quantity").innerHTML=data[0].quantite;  
     }

     
     getStock=async(json)=>{
       const val=await(FetchHelper.getData(URLHelper.urlgen("api/getStockRessource?data="+JSON.stringify(json))));
       console.log(val);
        if(val.etat)this.setState({liststock:val.data})
        else alert("No stock found");
     }
    render() { 
        // console.log(this.state.listproformat)
        return (
           
            <div className='row'>
                
                <div className='col-md-1'></div>
                <div className={`col-md-5 ${classes.image}`}></div>
                <div className='col-md-6'>
            <div class="card shadow mb-3">
                <div class={`title-card card-header  ${classes.titrecarte}`}>
            <p class="text m-0 fw-bold">Entrer Proformat des Clients</p>
        </div>
        <div class="card-body">
                <form action="" id="myForm" style={{textAlign:"center"}} onSubmit={this.handleSubmit}>
                    <table>
                        <tr>
                            <td>Code Client</td>
                            <td>
                                <input type="hidden" name="idfournisseur"  id="idfournisseur" />
                                <ReactSearchAutocomplete 
                                items={this.state.listClient}
                                onSelect={this.handleOnSelect}
                                fuseOptions={{ keys: ["nomfournisseur", "codefournisseur"] }} 
                                resultStringKeyName="codefournisseur"
                                formatResult={this.formatResult}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Reference demande</td>
                            <td>
                                {/* <input class="form-control" type="text" name="idreferencedemande" /> */}
                               <select name="idreferencedemande" className='form-control'  onClick={this.handleOnChange} id="selecta">
                                   {this.state.listproformat.map(element=>
                                        <option value={element.idprenvoye}>{element.idprenvoye}</option>
                                   )} 
                                       
                                     
                               </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Qualite</td>
                            <td>
                                <input class="form-control" type="text" name="qualite" />
                            </td>
                        </tr>
                        <tr>
                            <td>Prix unitaire</td>
                            <td><select name="pu" className='form-control' onClick={this.handleOnChangeQuantite}  id="">
                                   {this.state.liststock.map(element=>
                                        <option value={element.pu*1.3}>{element.pu*1.3}</option>
                                   )} 
                                       
                                     
                               </select>
                               </td>  
                        </tr>
                        <tr>
                            <td>Delai de livraison</td>
                            <td>
                                <input class="form-control" type="datetime-local" name="delailivraison" id="" />
                            </td>
                        </tr>
                        <tr>
                            <td>Lieu de livraison</td>
                            <td>
                                <input class="form-control" type="text" name="lieulivraison"/>
                            </td>
                        </tr>
                       
                        <tr>
                            <td>Quantite</td>
                            <td>
                                <input type="hidden" name="quantite" id="quantite" />
                                <p id="quantity">0</p>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <input type="submit" className={`btn btn-success ${classes.bouton}`} value="Inserer" />
                            </td>
                        </tr>
                    </table>
                </form>
                </div>
            </div>
            </div>
            </div>
        );
    }
}
 
export default ProTyperVente;