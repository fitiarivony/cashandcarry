import React, { Component } from 'react';
import URLHelper from '../Helper/URLHelper';
class ProSender extends Component {
    state = { 
        data:[
            {
                coderessource: "239C",
                intitule:"chiffon",
                quantite:29,
                fournisseurs:[
                    {
                        id:"FRN1",
                        nom:"Total"
                    },
                    {
                        id:"FRN2",
                        nom:"Jovenna"
                    },
                    {
                        id:"FRN3",
                        nom:"Galana"
                    }
                ]
            },
            {
                coderessource: "239D",
                intitule:"casque",
                quantite:29,
                fournisseurs:[
                    {
                        id:"FRN1",
                        nom:"Total"
                    },
                    {
                        id:"FRN2",
                        nom:"Jovenna"
                    },
                    {
                        id:"FRN3",
                        nom:"Galana"
                    }
                ]
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
    render() { 
        return (    
            <div>
                <h2>Proformat Envoyer</h2>
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
                                    <td>{el.coderessource}</td>
                                    <td>{el.intitule}</td>
                                    <td>{el.quantite}</td>
                                    {el.fournisseurs.map(frn=>
                                    <td>
                                        <input type="radio" name={"chb"+el.coderessource} value={frn.id} />
                                        <label htmlFor="chb">{frn.nom}</label>
                                    </td>
                                    )}
                                </tr>
                            )}
                            <tr>
                                <td colSpan={4}>
                                    <input type="submit" value="Soumettre" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}
 
export default ProSender;