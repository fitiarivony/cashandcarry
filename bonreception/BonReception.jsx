import React, { Component } from 'react';
import ElementReception from './ElementReception';
import TabInfo from './TabInfo';
class BonReception extends Component {
    state = { 
        info:{
            fournisseur:"BLABLA",
            societe:"ZALA",
            date:"02/11/21",
            elementReception:[
                {
                    refRessource:"403C",
                    designation:"Achat Chiffon Jaune",
                    PU:12000,
                    remise: 1
                }
            ]
        }
     } 
    total=()=>{
        let total=0;
        this.state.info.elementReception.forEach(data=>
            total+=data.PU-(data.PU*data.remise/100)
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
                <h2>Fournisseur {this.state.info.fournisseur}</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>Societe</td>
                            <td>{this.state.info.societe}</td>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td>{this.state.info.date}</td>
                        </tr>
                    </tbody>
                </table>
                <table style={{border:"2px solid"}}>
                    <thead>
                        <tr>
                            <th>RefRessource</th>
                            <th>Designation</th>
                            <th>PU</th>
                            <th>Remise</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {this.state.info.elementReception.map(data=>
                            <ElementReception data={data}/>
                                )}
                            
                        <TabInfo txt={"Total HT: "+this.total()+" (avec remise)"}></TabInfo>
                        <TabInfo txt={"TVA: "+this.totalTVA()}></TabInfo>
                        <TabInfo txt={"TTC: "+this.totalTTC()}></TabInfo>

                    </tbody>
                </table>
                <label htmlFor="montant">Montant a payer</label>
                <p id="montant">DEUX CENT MILLE ARIARY</p>
                <button style={{float:"right"}} className="btn btn-success">dispatch</button>
                <button style={{float:"right"}} className="btn btn-success">pdf</button>
            </div>
        );
    }
}
 
export default BonReception;