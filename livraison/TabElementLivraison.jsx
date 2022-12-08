import React, { Component } from 'react';
class TabElementLivraison extends Component {
    state = {  } 
    render() { 
        return (
            <table>
                    <thead>
                        <tr>
                            <th>Ressource</th>
                            <th>Quantite</th>
                            <th>Remise</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.elementLivraison.map(element=>
                            <tr>
                            <td>{element.ressource}</td>
                            <td>{element.qte}</td>
                            <td>{element.remise} %</td>
                            <td><button className="btn btn-danger" onClick={()=>this.props.delete(element.id)}>Supprimer</button></td>
                        </tr>) }
                        
                    </tbody>
                </table>
        );
    }
}
 
export default TabElementLivraison;