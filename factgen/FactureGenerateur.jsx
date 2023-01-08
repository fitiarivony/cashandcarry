import React, { Component } from 'react';
class FactureGenerateur extends Component {
    state = { 
        liste:[
            {
                id:"BDC1",
                nomClient:"Zara"
            }
        ]
     } 
    render() { 
        return (
            <React.Fragment>
                <h2>Generer facture</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Numero bon de commande</th>
                            <th>Client</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.liste.map(el=>
                        <tr>
                            <td>{el.id}</td>
                            <td>{el.nomClient}</td>
                            <td><button className="btn btn-secondary">Generer</button></td>
                        </tr>    
                            
                            )}
                        <tr>
                            <td>BDC1</td>
                            <td>Zara</td>
                            <td><button className="btn btn-secondary">Generer</button></td>
                        </tr>
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}
 
export default FactureGenerateur;