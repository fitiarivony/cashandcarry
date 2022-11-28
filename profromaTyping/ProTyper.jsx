import React, { Component } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

import URLHelper from '../Helper/URLHelper';
import FetchHelper from '../Helper/FetchHelper';


class ProTyper extends Component {
    state = { 
        listFournisseur:[
            {
                idfournisseur:"",
                nomfournisseur:"",
                adresse:"",
                contact:"",
                codefournisseur:"",
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
        
        fetch(URLHelper.urlgen("api/Fournisseurs"),{crossDomain:true,method:'GET',headers:{}})
        .then(res=>{return res.json() ; })
        .then(data=>{ 
          this.setState({listFournisseur:data});
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
        this.askRessources(URLHelper.urlgen("logAdmin/login.php?data="+json));
    }
    askRessources=(url)=>{
        fetch(url,{crossDomain:true,method:'GET',headers:{}})
        .then(res=>{return res.json() ; })
        .then(data=>{ 
            console.log(data);
            if (data.etat) {
                window.location.replace("/option")  
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
         document.getElementById("idfournisseur").value=item.idfournisseur;
      }
    render() { 
        return (
            <div>
                <h2>Entrer proformat des fournisseurs</h2>
                <form action="" id="myForm" style={{textAlign:"center"}} onSubmit={this.handleSubmit}>
                    <table>
                        <tr>
                            <td>Code Fournisseur</td>
                            <td>
                                <input type="hidden" name="idfournisseur"  id="idfournisseur" />
                                <ReactSearchAutocomplete 
                                items={this.state.listFournisseur}
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
                                <input type="text" name="idreferencedemande" />
                                {/* <ReactSearchAutocomplete/> */}
                            </td>
                        </tr>
                        <tr>
                            <td>Qualite</td>
                            <td>
                                <input type="text" name="qualite" />
                            </td>
                        </tr>
                        <tr>
                            <td>Quantite</td>
                            <td>
                                <input type="number" name="quantite" min={0} onKeyPress={this.onlyNumber}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Delai de livraison</td>
                            <td>
                                <input type="datetime-local" name="delailivraison" id="" />
                            </td>
                        </tr>
                        <tr>
                            <td>Lieu de livraison</td>
                            <td>
                                <input type="text" name="lieulivraison"/>
                            </td>
                        </tr>
                        <tr>
                            <td>PU (AR)</td>
                            <td><input type="number" min={0} name="PU" id="" onKeyPress={this.onlyNumber}/></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <input type="submit" value="Inserer" />
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        );
    }
}
 
export default ProTyper;