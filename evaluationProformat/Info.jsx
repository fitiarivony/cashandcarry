import React, { Component } from 'react';
class Info extends Component {
    state = {  } 
    render() { 
        return (
            <div style={{textAlign: "center"}} className='col-xl-3'>
                <table>
                    <tr>
                        <td>Fournisseur:</td>
                        <td>{this.props.inf.nomfournisseur}</td>
                    </tr>
                    <tr>
                        <td>Ref:</td>
                        <td>{this.props.inf.idreferencedemande}</td>
                    </tr>
                    <tr>
                        <td>Qualite:</td>
                        <td>{this.props.inf.qualite}</td>
                    </tr>
                    <tr>
                        <td>Quantite</td>
                        <td>{this.props.inf.quantite}</td>
                    </tr>
                    <tr>
                        <td>Delai livraison</td>
                        <td>{this.props.inf.delailivraison}</td>
                    </tr>
                    <tr>
                        <td>lieu</td>
                        <td>{this.props.inf.lieulivraison}</td>
                    </tr>
                    <tr>
                        <td>PU(AR)</td>
                        <td>{this.props.inf.pu}</td>
                    </tr>
                </table>
            </div>
        );
    }
}
 
export default Info;