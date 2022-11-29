import React, { Component } from 'react';
import URLHelper from '../Helper/URLHelper';
// CSS
import "../assets/css/form-validation.css";
import "../assets/dist/css/bootstrap.min.css";
import classes from "../assets/css/LoginDepartement.module.css";

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
        return <div className="container">
            
             
            <div className='row'>
            <div className={`col ${classes.image}`}>
               
            </div>

         
             <div className='col'>
             <h1>Login departement</h1>
                <hr className="tirer mb-4"/>
            <form action="" className="needs-validation" id='myForm' onSubmit={this.handleSubmit}>
            <div>
                <input type="text" name="identifiant" id="" className="form-control" placeholder="Email"   required />
            </div>
            <br/>
            <div>
            <input type="text" name="mdp" className="form-control"  placeholder="Mot de passe" id="password" required />
                        
                    </div>
                <br/>           
                    
                            <p><input className={classes.submit} type="submit" /></p>
                        
               
            </form>
            </div>
            </div>


             
        </div>
    }
}
 
export default Login;

//Les codes ci dessous sont executé lors que la page est chargée
