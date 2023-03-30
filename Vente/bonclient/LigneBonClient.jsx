import React, { Component } from 'react';
class LigneBonClient extends Component {
    state = {  }
    onlyNumber=(event) => {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }

    } 
    render() {
        return (
            
            
              
                    <tr>
                    <td>{this.props.inf.codefournisseur}</td>
                    <td>{this.props.inf.code}</td>
                    <td>{this.props.inf.pu}</td>
                    <td>{this.props.inf.quantite}</td>
                    <td><input type="number" min={1}  name={"quantite-"+this.props.inf.idproformat_fournisseur} max={this.props.inf.quantite} onKeyPress={this.onlyNumber} /></td>
                    <td>{this.props.inf.qualite}</td>
                    <td>{this.props.inf.lieulivraison}</td>
                    <td>{this.props.inf.delailivraison}</td>
                    <td>{this.props.inf.besoin}</td>
                    <td> <input type="checkbox"  className='form-check-input'  name={"checked-"+this.props.inf.idproformat_fournisseur} value={this.props.inf.idproformat_fournisseur} /></td>
                    </tr>
                
                
          
        );
    }
}
 
export default LigneBonClient;