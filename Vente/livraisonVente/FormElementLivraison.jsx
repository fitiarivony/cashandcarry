import React, { Component } from 'react';
import FetchHelper from '../../Helper/FetchHelper';
import URLHelper from '../../Helper/URLHelper';
class FormElementLivraison extends Component {
    state = {

        listebon:[],
    }
    add=()=>{
        let tab={
            rsc:document.getElementById("rsc").value,
            quantite:document.getElementById("qte").value,
        }
        console.log(tab);
        this.props.add(tab);
        document.getElementById("rsc").value="";
        document.getElementById("qte").value="0";
    }
    async componentDidMount(){
        const liste = await FetchHelper.getData(
            URLHelper.urlgen("api/Ressource")
          );
          console.log(liste);
          this.setState({listebon:liste});
    }
    handle=(event)=>{
        console.log(event.target.value);
        document.getElementById("rsc").value=event.target.value;
    }
    render() { 
        return (
        <React.Fragment>
            <table>
            <tbody>
            <tr>
                <td>Ressource</td>
                <td>
                    <input type="hidden" name="" id="rsc" />
                    <select onClick={this.handle} name="" className="custom-select form-control mb-3" id="idc">
                        {
                            this.state.listebon.map( (i)=>(
                                <option value={i.idressource}>{i.code+" "+i.intitule}</option>
                            ))
                        }
                    </select>
                </td>
            </tr>
            <tr>
                <td>Quantite</td>
                <td><input type="number" className="form-control mb-3" name="" id="qte" /></td>
            </tr>
            <tr>
                <td></td>
                <td><button className="btn btn-primary form-control" onClick={this.add}>Ajouter</button></td>
            </tr>
            </tbody>
        </table>
        </React.Fragment>
        
        );
    }
}
 
export default FormElementLivraison;