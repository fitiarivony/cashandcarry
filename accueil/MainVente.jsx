import { Component } from "react";
import classes from '../assets/css/MenuVente.module.css';
export default class MainVente extends Component{
    render(){
        return(
            <div className="container">
            <center>
            <h2 className={ `title ${classes.loha}`}></h2>
          
                    <div className="album py-5" >
                        <div className={ `row ${classes.acc}`}>
                            <div className="col">
                            <div className={` ${classes.carte}` }>
                                    
                                    <br/>
                                    <a   className="text-dark" href="/proformatclient"><h4>Saisir un proformat envoyé par le client</h4></a>
                                </div>
                            </div>
                
                            <div className="col">
                                <div className={` ${classes.carte}` }>
                                   
                                    <br/>
                                    <a   className=" text-dark" href="/proformatNodie"><h4>Envoyer un proformat comme reponse à un client</h4></a>
                                </div>
                            </div>
                
                            
                            <div className={ `row `}>
                        <div className="col">
                            <div className={`${classes.carte}` }>
                                   
                                    <br/>
                                    <a   className=" text-dark" href="/listebonclient"><h4>Bon de commande</h4></a>
                                </div>
                            </div>
                        
                        <div className="col">
                            <div className={` ${classes.carte}` }>
                                   
                                    <br/>
                                    <a   className=" text-dark" href="/livraisonvente"><h4>Bon de livraison</h4></a>
                                </div>
                            </div>
                       

                        <div className="col">
                            <div className={` ${classes.carte}` }>
                                   
                                    <br/>
                                    <a   className=" text-dark" href="/listereceptionvente"><h4>Bon de reception</h4></a>
                                </div>
                            </div>

                            <div className="col">
                            <div className={` ${classes.carte}` }>
                                   
                                    <br/>
                                    <a   className=" text-dark" href="/factureclient"><h4>Facture</h4></a>
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