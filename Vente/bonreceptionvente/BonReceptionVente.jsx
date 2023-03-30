import React, { Component } from 'react';
import ElementReceptionVente from './ElementReceptionVente';
import TabInfo from './TabInfo';
import FetchHelper from '../../Helper/FetchHelper';
import URLHelper from '../../Helper/URLHelper';
class BonReceptionVente extends Component {
    state = { 
        info:{
            client:"BLABLA",
            societe:"ZALA",
            date:"02/11/21",
            elementReception:[
                {
                    refRessource:"403C",
                    designation:"Achat Chiffon Jaune",
                    quantite:12000,
                    remise: 1
                }
            ]
        }
     }
    componentWillMount(){
        this.getData();
    }
    getData=async ()=>{
        let json={
            idbonreception:new URLSearchParams(window.location.search).get("idbonreception")
        };
        const liste=await (FetchHelper.getData(URLHelper.urlgen("api/bonreceptioncomplete/login?data="+JSON.stringify(json))));
        const societe=await (FetchHelper.getData(URLHelper.urlgen("api/societe")));
        
        let ina=liste.data;
        if(ina.length!==0){
            let temp={
                client:ina[0].nomclient,
                societe:societe[0].nomsociete,
                date:ina[0].datereception,
                elementReception:[]
            };
            for(let i=0;i<ina.length;i++){
                temp.elementReception.push(ina[i]);
            }
            this.setState({info:temp});
        }
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

    

     topdf =()=> {
        let json={
            idlivraison:new URLSearchParams(window.location.search).get("idlivraison")
        };
      
        let vita=false;
        fetch(URLHelper.urlgen("api/storeReception"),{crossDomain:true,method:'POST', body: JSON.stringify(json), headers: {'Content-Type': 'application/pdf'}})
        .then(response=>{
            response.blob().then(blob=>{
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'BDR-'+this.getdate()+this.state.info.client+'.pdf';
                alink.click();
                vita=true;
               if(vita){
                window.location.href="/achat";
               }
            })
        })
    }
    total=()=>{
        let total=0;
        this.state.info.elementReception.forEach(data=>
            total+=data.quantite-(data.quantite*data.remise/100)
        )
        return total;
    }
    totalTVA=()=>{
        return this.total()*20/100;
    }
    totalTTC=()=>{
        return this.total()*120/100;
    }
    render() { 
        return (
            <div>
                <h2 className="text-center">client {this.state.info.client}</h2>

                <div className="container card shadow mb-3">
                <div className="title-card card-header bg-success">
                        <p className="text m-0 ">Liste des bons de receptions</p>
                    </div>
                    <div className=" container card-body">
                <table >
                    <tbody>
                        <tr>
                            <td><strong>Societe</strong></td>
                            <td>{this.state.info.societe}</td>
                        </tr>
                        <tr>
                            <td><strong>Numero bon reception</strong></td>
                            <td>{new URLSearchParams(window.location.search).get("idbonreception")}</td>
                        </tr>
                        <tr>
                            <td><strong>Date Fabrication</strong></td>
                            <td>{this.state.info.date}</td>
                        </tr>

                    </tbody>
                </table>
                </div>
                </div>
                
                <table border="1" className="table table-light">
                    <thead>
                        <tr>
                            <th>RefRessource</th>
                            <th>Designation</th>
                            <th>quantite</th>
       
                        </tr>
                    </thead>
                    <tbody>
                        
                        {this.state.info.elementReception.map(data=>
                            <ElementReceptionVente data={data}/>
                                )}
                    </tbody>
                </table>
                <div className='row'>
                    <div className='col'>

                    </div>
                    <div className='col'>
                 
                <button  onClick={this.topdf} className="btn btn-info m-3">Generer pdf</button>
                        </div>
                        <div className='col'>
                        
                        </div>
                </div>
               
            </div>
        );
    }
}
 
export default BonReceptionVente;