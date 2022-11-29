import React, { Component } from 'react';
import URLHelper from '../Helper/URLHelper';
 import classes from"../assets/css/ProformatEnvoyer.module.css";
import "../assets/dist/css/bootstrap.min.css";
class ProSender extends Component {
    state = { 
        data:[
            {
                id:0,
                idressource:"",
                intitule:"",
                idachattype:"",
                code:"",
                totalquantite:0,
                fournisseurs:[
                   {
                        idfournisseur:"",
                        nomfournisseur:"",
                        adresse:"",
                        contact:"",
                        codefournisseur:"",
                        idressource:""
                   }
                ],
            }
        ]
     } 
     handleSubmit=(event) => {
        event.preventDefault();
        this.callchamp();
    }
    
    
    callchamp= () =>{
        var form = document.getElementById("myForm");
        var formData = new FormData(form);
        let object = {};
        formData.forEach(
            (value, key) =>{
                if(object[key]!==undefined){
                    let tableau=[];
                    if(Array.isArray(object[key]))tableau=[...object[key]];
                    else tableau.push(object[key]);
                    tableau.push(value);
                    object[key]=tableau;
                }else{
                    object[key] = value  
                }
                // console.log(key+"----"+value);
               
            } );

        // var json = JSON.stringify(object);
        let tableau=this.formatJSON(object);
        this.sendProformat(tableau);
        // this.askRessources(URLHelper.urlgen("logAdmin/login.php?data="+json));
    }
    formatJSON=(json)=>{
        let keys=Object.keys(json);
        let array=[];
        keys.forEach(key => {
            let table=this.state.data.filter((demande=> demande.idressource=key))[0];
           
            if (Array.isArray(json[key])) {
                for (const element of json[key]) {
                    let proformat={
                        reference:table.intitule,
                        intitule:table.intitule,
                        idressource:table.idressource,
                        quantite:table.totalquantite,
                        idfournisseur:element,
                     }
                     array.push(proformat);
                }
            }else{
                let proformat={
                    reference:table.intitule,
                    intitule:table.intitule,
                    idressource:table.idressource,
                    quantite:table.totalquantite,
                    idfournisseur:json[key]
                 }
                array.push(proformat);
            }
         });
         return array;

    }
    sendProformat=(tableau)=>{
        fetch(URLHelper.urlgen("api/Proformat_envoye"),{crossDomain:true,method:'POST',headers:{'Content-Type': 'application/json'},body: JSON.stringify(tableau)})
        .then(res=>{return res.json() ; })
        .then(data=>{ 
           
            if (data.etat) {
                // console.log(data);
                 window.location.replace("/option")  
            }else{
                alert("erreur");
                console.log("echec");
            }
         })
    }
    constructor () {
        super();
         this.initialize();
    }
    initialize =()=> {
        this.listRessource();
    }
    listRessource =()=> {
        fetch(URLHelper.urlgen("api/Demande_ressource/details"),{crossDomain:true,method:'GET', headers: {}})
        .then(res => { return res.json();})
        .then(data=>{
            this.setState(
                {
                     data: data, 
                }
            )
         })
    }
    render() { 
        return (    
            <div>

        <div className={`card shadow mb-3 ${classes.carte}`} >
                 <div class={`title-card card-header ${classes.titrecarte}`}>
            <p className="text m-0 fw-bold"><h2>Envoyer proformat</h2></p>
        </div>

               
                <form action="" id="myForm" onSubmit={this.handleSubmit} >
                    <table style={{textAlign:"center"}}>
                        <thead>
                            <tr>
                                <th>Code ressource</th>
                                <th>intitule</th>
                                <th>Quantite</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {this.state.data.map(el=>
                                <tr>
                                    <td>{el.code}</td>
                                    <td>{el.intitule}</td>
                                    <td>{el.totalquantite}</td>
                                    {el.fournisseurs.map(frn=>
                                    <td>
                                        <div class="form-group form-check">
                                        <input type="checkbox" className='form-check-input'  name={el.idressource} value={frn.idfournisseur} />
                                        <label  className='form-check-label' htmlFor="chb">{frn.nomfournisseur}</label>
                                        </div>
                                    </td>
                                    )}
                                </tr>
                            )}
                            <tr>
                                <td colSpan={4}>
                                    <input type="submit" className="btn btn-success" value="Soumettre" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                </div>
            </div>
        );
    }
}
 
export default ProSender;