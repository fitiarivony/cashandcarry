import React, { Component } from 'react';
import URLHelper from '../Helper/URLHelper'
class AjoutRessource extends Component {
    state = { liste:[{
        idachattype: "ID1",
        nomachattype: "Type 1"
    }] } 
    handleSubmit=(event) => {
        event.preventDefault();
        this.callchamp();
        
    }
    callchamp= () =>{
        //const sending={"identifiant":this.state.email,"mdp":this.state.mdp};
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
            // const navigate = useNavigate();
            
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
    initialize =()=> {
        this.askService(URLHelper.urlgen("listtypeachat.php"));
    }
    askService = (url) => {
        fetch(url,{crossDomain:true,method:'GET', headers: {}})
        .then(res => { return res.json();})
        .then(data=>{
            console.log(data);
            this.setState(
                {
                    liste: data
                }
            )
        })
    } 
    constructor () {
        super();
        this.initialize();
    } 
    render() { 
        return (
            <div>
                <h1>Ajout d'une nouvelle ressource</h1>
                <h3>Departement : nomDept</h3>
                <form action="" id="myForm"onSubmit={this.handleSubmit} >
                    <table style={{textAlign: "center"}}>
                        <thead></thead>
                        <tbody>
                            <tr>
                                <td>Code ressource</td>
                                <td>
                                    <input type="text" name="code"/>
                                </td>
                            </tr>
                            <tr>
                                <td>Nom de la ressource</td>
                                <td>
                                    <input type="text" name="nom" id="" />
                                </td>
                            </tr>
                            <tr>
                                <td>Type d'achat</td>
                                <td>
                                    <select name="type" id="">
                                        {this.state.liste.map(data => 
                                            <option value={data.idachattype}>{data.nomachattype}</option>
                                            )}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <input type="submit" value="Envoyer" />
                                </td>
                            </tr>
                        </tbody>    
                    </table>
                </form>
            </div>
        );
    }
}
 
export default AjoutRessource;