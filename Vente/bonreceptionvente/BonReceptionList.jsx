import React, { Component } from 'react';
import FetchHelper from '../../Helper/FetchHelper';
import URLHelper from '../../Helper/URLHelper';
export default class  BonReceptionList extends Component {
    state={
        valeur:[
            {
                idlivraison:"",
                idboncommande:"",
                daty:""
            }
        ],
        counter:0
    }
    constructor(){
        super();
        this.fonction();

        
    }
     fonction=async () =>{
        let json={
            idfournisseur:"FOU6"
        }
        const val=await (FetchHelper.getData(URLHelper.urlgen("api/BonLivraisonSociete/login?data="+JSON.stringify(json))));
        console.log(val);
        if(val.etat) this.setState({valeur:val.data,counter:1});
       
        // this.state.valeur=val;
    }

    getdate=()=>{
        let currentDate=new Date().toJSON().slice(0, 10);
       let elements=currentDate.split("-");
       let val="";
       elements.forEach(element => {
         val+=element;
       });
       return val;
    }

    topdf =(idlivraison)=> {
        let json={
            idlivraison:idlivraison
        };
      
        let vita=false;
        fetch(URLHelper.urlgen("api/storeReception"),{crossDomain:true,method:'POST', body: JSON.stringify(json), headers: {'Content-Type': 'application/pdf'}})
        .then(response=>{
            response.blob().then(blob=>{
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'BDR-'+this.getdate()+this.state.valeur[0].idclient+'.pdf';
                alink.click();
                vita=true;
               if(vita){
                window.location.href="/vente";
               }
            })
        })
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
                    
                    <div className=" container card-body">
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-12">
                        
                <table border="1" className="table table-stripped table-light">
                    <thead>
                    <tr>
                        <td>Numero bon de livraison</td>
                        <td>Date de fabrication du bon de livraison</td>
                        <td>Reference commande</td>
                        <td></td>
                    </tr>
                    </thead>
                    
                    <tbody>
                    {   (this.state.counter===1)?
                        this.state.valeur.map( i => 
                           {
                                return <tr>
                                     <td>{i.idlivraison}</td>
                                    <td>{i.daty}</td>
                                    <td>{i.idboncommande}</td>
                                    <td><button className='btn btn-info' onClick={()=>{this.topdf(i.idlivraison)}}>Generer bon de reception</button></td>
                                </tr>;
                            }
                        ):
                        
                        <>No results</>
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