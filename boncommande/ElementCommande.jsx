import React, { Component } from 'react';
class ElementCommande extends Component {
    state = {  } 
    render() { 
        return (
        <tr>
            <td>{this.props.inf.designation}</td>
            <td>{this.props.inf.quantite}</td>
            <td>{this.props.inf.prixunitaire}</td>
        </tr>);
    }
}
 
export default ElementCommande;