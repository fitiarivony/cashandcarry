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
        var json = JSON.stringify(object);
        console.log(formData);
        console.log( json);
        this.askAnnee(URLHelper.urlgen("api/Admindept/login?data="+json));
    }
    askAnnee=(url)=>{
            // const navigate = useNavigate();
            
        fetch(url,{crossDomain:true,method:'GET',headers:{}})
        .then(res=>{return res.json() ; })
        .then(data=>{ 
            console.log(data);
            if (data.etat) {
                // console.log(data.data[0].iddept);
                window.location.replace("/demandeRessource?iddept="+data.data[0].iddept);  
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
