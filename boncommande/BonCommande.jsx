import React, { Component } from 'react';
import URLHelper from '../Helper/URLHelper';
import FetchHelper from '../Helper/FetchHelper';
import ElementCommande from './ElementCommande';
class BonCommande extends Component {
    state = { 
        inf:{
            societe: "ChomeurMad",
            fournisseur: "SOCOMAD",
            refDemande:"num 1",
            date:"12/12/2002",
            refProformat:"pro123",
            elementCommande:[
                {
                    designation:"chiffon",
                    quantite:123,
                    prixunitaire:3456
                }
            ],
            totalHTC:3000,
            TVA: 20
        }
    } 
    constructor(){
        super();
        this.listProformatRecu();
    }
    listProformatRecu=async ()=>{
        const val=await (FetchHelper.getData(URLHelper.urlgen("api/Proformat_fournisseur_demande_ressource")));
        this.setState({inf:val});
    }
    render() { 
        return (
            <div>
                <h2>{this.state.inf.societe}</h2>
                <h4>En guise de notre engagement  envers {this.state.inf.fournisseur}, ce bon de commande sera une piece justifcative</h4>
                <table>
                    <tbody>
                        <tr>
                            <td>Reference Demande</td>
                            <td>{this.state.inf.refDemande}</td>
                        </tr>
                        <tr>
                            <td>Session du</td>
                            <td>{this.state.inf.date}</td>
                        </tr>
                        <tr>
                            <td>Reference Proformat</td>
                            <td>{this.state.inf.refProformat}</td>
                        </tr>
                        <tr>
                            <td>Fournisseur</td>
                            <td>{this.state.inf.fournisseur}</td>
                        </tr>
                    </tbody>
                </table>
                <table style={{border:"2px solid"}}>
                    <thead>
                        <tr>
                            <th>Designation</th>
                            <th>quantite</th>
                            <th>prix unitaire</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.inf.elementCommande.map(data=>
                        <ElementCommande inf={data}/>
                        )}
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <td>Total HTC</td>
                            <td>{this.state.inf.totalHTC} AR</td>
                        </tr>
                        <tr>
                            <td>TVA</td>
                            <td>{this.state.inf.TVA}</td>
                        </tr>
                        <tr>
                            <td>TTC</td>
                            <td>{"eventuelle fonction de conversion"}</td>
                        </tr>
                    </tbody>
                </table>
                <button style={{float:"right"}} className="btn btn-success">Signer</button>
            </div>
        );
    }
}
 
export default BonCommande;