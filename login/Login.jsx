import React, { Component } from 'react';
import URLHelper from '../Helper/URLHelper'
class Login extends Component {
    state = {  } 
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
        this.askAnnee(URLHelper.urlgen("Admindept/login?identifiant="+object.identifiant+"&mdp="+object.mdp));
    }
    askAnnee=(url)=>{
            // const navigate = useNavigate();
            
        fetch(url,{crossDomain:true,method:'GET',headers:{}})
        .then(res=>{return res.json() ; })
        .then(data=>{ 
            console.log(data);
            if (data.etat) {
                localStorage.setItem("iduser", data.data[0].idadmin);
                localStorage.setItem("iddept", data.data[0].iddept);
                window.location.replace("/demandeRessource")  
            }else{
                alert("erreur");
                console.log("echec");
            }
         })
    }
    render(){
        return <div>
            <form action="" id='myForm' onSubmit={this.handleSubmit}>
                <table>
                    <tr>
                        <td>Login</td>
                        <td>
                            <input type="text" name="identifiant" id="" />
                        </td>
                    </tr>
                    <tr>
                        <td>mot de passe</td>
                        <td>
                            <input type="text" name="mdp" id="" />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <input type="submit" />
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    }
}
 
export default Login;

//Les codes ci dessous sont executé lors que la page est chargée
