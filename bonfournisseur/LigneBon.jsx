import React, { Component } from 'react';
class LigneBon extends Component {
    state = {  } 
    render() {
        return (
            
            
              
                    <tr>
                    <td>{this.props.inf.codefournisseur}</td>
                    <td>{this.props.inf.pu}</td>
                    <td>{this.props.inf.quantite}</td>
                    <td>{this.props.inf.qualite}</td>
                    <td>{this.props.inf.lieulivraison}</td>
                    <td>{this.props.inf.delailivraison}</td>
                    <td>{this.props.inf.besoin}</td>
                    </tr>
                
                
          
        );
    }
}
 
export default LigneBon;