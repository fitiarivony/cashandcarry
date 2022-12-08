import React, { Component } from 'react';
class FormElementLivraison extends Component {
    state = {  } 
    add=()=>{
        let tab={
            rsc:document.getElementById("rsc").value,
            qte:document.getElementById("qte").value,
            rm:document.getElementById("rm").value
        }
        this.props.add(tab);
        document.getElementById("rsc").value="";
        document.getElementById("qte").value="0";
        document.getElementById("rm").value="0";
    }
    render() { 
        return (
        <table>
            <tr>
                <td>Ressource</td>
                <td>
                    <input type="text" name="" id="rsc" />
                </td>
            </tr>
            <tr>
                <td>Quantite</td>
                <td><input type="number" name="" id="qte" /></td>
            </tr>
            <tr>
                <td>Remise</td>
                <td><input type="number" name="" id="rm" max={100}/></td>
            </tr>
            <tr>
                <td></td>
                <td><button className="btn btn-secondary" onClick={this.add}>Ajouter</button></td>
            </tr>
        </table>);
    }
}
 
export default FormElementLivraison;