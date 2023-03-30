import React, { Component } from 'react';
import FetchHelper from '../Helper/FetchHelper';
import URLHelper from '../Helper/URLHelper';
class RessourceComponent extends Component {
    state = {

        listebon:[],

    }
    add=()=>{
        let tab={
            rsc:document.getElementById("rsc").value,
            quantite:document.getElementById("qte").value,
            pu:(document.getElementById("pu").value==="")?0:Number.parseInt(document.getElementById("pu").value)
        }
        console.log(tab);
        this.props.add(tab);
        document.getElementById("rsc").value="";
        document.getElementById("qte").value="0";
        document.getElementById("pu").value="0";
    }
    async componentDidMount(){
        const liste = await FetchHelper.getData(
            URLHelper.urlgen("api/Ressource")
          );
          console.log(liste);
          this.setState({listebon:liste});
    }
    handle=(event)=>{
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
                    <select onChange={this.handle} name="" className="custom-select form-control mb-3" id="idc">
                        {
                            this.state.listebon.map( (i)=>(
                                <option value={i[this.props.show.value]}>{i[this.props.show.label[0]]+" "+i[this.props.show.label[1]]}</option>
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
                <td>PU</td>
                <td><input type="number" className="form-control mb-3" name="" id="pu" /></td>
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
 
export default RessourceComponent;