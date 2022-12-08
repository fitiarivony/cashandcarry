import { Component } from "react";
import classes from '../assets/css/Menu.module.css';
export default class Main extends Component{
    render(){
        return(
            <div className="container">
            <center>
            <h2 className="title">Welcome admin!!</h2>
          
                    <div className="album py-5" >
                        <div className={ `row  ${classes.acc}`}>
                            <div className="col">
                            <div className={`card shadow mb-3 ${classes.carte}` }>
                                    
                                    <br/>
                                    <a   className="stretched-link text-dark" href="/prosend"><h4>Envoyer proformat</h4></a>
                                </div>
                            </div>
                
                            <div className="col">
                                <div className={`card shadow mb-3 ${classes.carte}` }>
                                   
                                    <br/>
                                    <a   className="stretched-link text-dark" href="/proformatyper"><h4>Saisir proformat reçu</h4></a>
                                </div>
                            </div>
                
                            <div className="col">
                            <div className={`card shadow mb-3 ${classes.carte}` }>
                                   
                                    <br/>
                                    <a   className="stretched-link text-dark" href="/listereponse"><h4>Noter les proformats des fournisseurs</h4></a>
                                </div>
                            </div>
                
                            <div className="col">
                            <div className={`card shadow mb-3 ${classes.carte}` }>
                                   
                                    <br/>
                                    <a   className="stretched-link text-dark" href="/listeressource"><h4>Moins Disant</h4></a>
                                </div>
                            </div>
                            <div className={ `row `}>
                        <div className="col">
                            <div className={`card shadow mb-3 ${classes.carte}` }>
                                   
                                    <br/>
                                    <a   className="stretched-link text-dark" href="/listefournisseur"><h4>Generer bon de commande</h4></a>
                                </div>
                            </div>
                        </div>
                          
                        </div>
                       
                    </div>
            </center>
            </div>
        );
    }
}