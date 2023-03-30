import React, { Component } from 'react';
import FetchHelper from '../../Helper/FetchHelper';
import URLHelper from '../../Helper/URLHelper';
class FactureGenerateur extends Component {
    state = { 
        liste:[
            {
                idboncommande:"",
                datecommande:"",
                etat:""
                
            }
        ]
     } 
    
    initialize=async() =>{
        console.log("mandalo ato");
        let json={
          client:false
        }
        const liste = await FetchHelper.getData(
          URLHelper.urlgen("api/ListeBonComm?data="+JSON.stringify(json))
        );
        
        this.setState({ liste: liste });
      }
      constructor() {
        super();
        this.initialize();
      }
      testpdf =(idb)=> {
        let vita=false;
        fetch(URLHelper.urlgen("api/facture?idboncommande=" + idb),{crossDomain:true,method:'POST', headers: {'Content-Type': 'application/pdf'}})
        .then(response=>{
            const isJson = response.headers.get('content-type')?.includes('application/json');
           if(isJson){
                 alert("Mbola tsy recu le produit");
                return;
           }
            response.blob().then(blob=>{
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'FC'+idb+'.pdf';
                alink.click();
                vita=true;
                if(vita){
                 window.location.href="/vente";
                }
            })
        })
    }
    handleClick=(idb)=>{
        this.testpdf(idb);
    }

    render() { 
        return (
            <React.Fragment>
                <div className='row'>
                <div className='col'></div>
                <div className='col'>
                <div class="card shadow mb-3"> 
                <div class="title-card card-header" > <h2>Generer facture</h2></div>
                <div class="card-body">

                
                <table className="table table-striped table-hover" border="1">
                    <thead>
                        <tr>
                            <th>Numero bon de commande</th>
                            <th>Date fabrication</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.liste.map(el=>
                        <tr>
                            <td>{el.idboncommande}</td>
                            <td>{el.datecommande}</td>
                            <td><button className="btn btn-success"  onClick={()=>{this.handleClick(el.idboncommande)}}>Generer facture</button></td>
                        </tr>    
                            
                            )}
                       
                    </tbody>
                </table>
                </div>
                </div>



                </div>
                <div className='col'></div>
                    </div> 
                
               
            </React.Fragment>
        );
    }
}
 
export default FactureGenerateur;