import React, { Component } from 'react';
class LignePro extends Component {
    state = {  } 
    render() {
        return (
            
            
              
                    <tr>
                    <td>{this.props.inf.nomfournisseur}</td>
                    <td>{this.props.inf.codefournisseur}</td>
                    <td>{this.props.inf.pu}</td>
                    <td>{this.props.inf.quantite}</td>
                    <td>{this.props.inf.qualite}</td>
                    <td>{this.props.inf.lieulivraison}</td>
                    <td>{this.props.inf.delailivraison}</td>
                    </tr>
                
                
          
        );
    }
}
 
export default LignePro;