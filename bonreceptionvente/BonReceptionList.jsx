import React, { Component } from 'react';
import FetchHelper from '../Helper/FetchHelper';
import URLHelper from '../Helper/URLHelper';
export default class  BonReceptionList extends Component {
    state={
        valeur:[
            {
                idlivraison:"",
                idbonreception:"",
                datereception:""
            }
        ],
        counter:0
    }
    constructor(){
        super();
        this.fonction();

        
    }
     fonction=async () =>{
        const val=await (FetchHelper.getData(URLHelper.urlgen("api/bonreception")));
        console.log(val);
        this.setState({valeur:val,counter:1});
        // this.state.valeur=val;
    }
    dispatch=async ()=>{
        const reponse= await (FetchHelper.post(URLHelper.urlgen("api/dispatcher")));
        if(reponse.etat){
         window.location.href="/achat";
        }
     }

    render(){
        console.log(this.state.valeur);
        const newLocal = "/reception";
        return (
            <>
             <div className="container card shadow mb-3">
                <div className="title-card card-header bg-info">
                        <p className="text m-0 ">Liste des bons de receptions</p>
                      
                    </div>
                    <button  onClick={this.dispatch} className="btn btn-success m-3">Disptach</button>
                    <div className=" container card-body">
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-12">
                        
                <table border="1" className="table table-stripped table-light">
                    <thead>
                    <tr>
                        <td>Numero bon de reception</td>
                        <td>Date de fabrication du bon de reception</td>
                        <td>Reference livraison</td>
                        <td></td>
                    </tr>
                    </thead>
                    
                    <tbody>
                    {   (this.state.counter===1)?
                        this.state.valeur.map( i => 
                           {
                                return <tr>
                                     <td>{i.idbonreception}</td>
                                    <td>{i.datereception}</td>
                                    <td>{i.idlivraison}</td>
                                    <td><a className='btn btn-info' href={newLocal+"?idbonreception="+i.idbonreception+"&&idlivraison="+i.idlivraison}>Voir Details</a></td>
                                </tr>;
                            }
                        ):
                        
                        <>loading...</>
                    }
                    </tbody>
                    
                </table>
                        </div>
                        <div className="col col-lg-12"></div>
                    </div>
                </div>
                </div>
                </div>
            </>
        );
    }
}