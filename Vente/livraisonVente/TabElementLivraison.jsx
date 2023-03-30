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
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.elementLivraison.map(element=>
                            <tr>
                            <td>{element.idressource}</td>
                            <td>{element.quantite}</td>
                            <td><button className="btn btn-danger" onClick={()=>this.props.delete(element.id)}>Supprimer</button></td>
                        </tr>) }
                        
                    </tbody>
                </table>
        );
    }
}
 
export default TabElementLivraison;