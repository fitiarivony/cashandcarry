import React, { Component } from 'react';
class Info extends Component {
    state = {  } 
    render() { 
        return (
            <div style={{textAlign: "center"}} className='col-xl-3'>
                <table>
                    <tr>
                        <td>Fournisseur:</td>
                        <td>{this.props.inf.fournisseur}</td>
                    </tr>
                    <tr>
                        <td>Ref:</td>
                        <td>{this.props.inf.ref}</td>
                    </tr>
                    <tr>
                        <td>Qualite:</td>
                        <td>{this.props.inf.qlty}</td>
                    </tr>
                    <tr>
                        <td>Quantite</td>
                        <td>{this.props.inf.qty}</td>
                    </tr>
                    <tr>
                        <td>Delai livraison</td>
                        <td>{this.props.inf.date}</td>
                    </tr>
                    <tr>
                        <td>lieu</td>
                        <td>{this.props.inf.lieu}</td>
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