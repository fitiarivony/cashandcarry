import React, { Component } from 'react';
import FetchHelper from '../Helper/FetchHelper';

class RightFournisseur extends Component {
    state = { 
        inf:{
            ref:"ref131983",
            ressource:"Stylo",
            QT:456,
            fournisseur:"schneider"
        }
     } 
     constructor(){
        super();
        this.state = {inf:FetchHelper.getData("aiza")};
    } 
    render() { 
        return (
            <div>
                <h3>Demande</h3>
                <table>
                    <tr>
                        <td>ref</td>
                        <td>{this.state.inf.ref}</td>
                    </tr>
                    <tr>
                        <td>ressource</td>
                        <td>{this.state.inf.ressource}</td>
                    </tr>
                    <tr>
                        <td>QT</td>
                        <td>{this.state.inf.QT}</td>
                    </tr>
                    <tr>
                        <td>fournisseur</td>
                        <td>{this.state.inf.fournisseur}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}><button>Generer un bon de commande</button></td>
                    </tr>
                </table>
            </div>
        );
    }
}
 
export default RightFournisseur;