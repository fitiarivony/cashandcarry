import React, { Component } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import FetchHelper from '../Helper/FetchHelper';
class ProformatClient extends Component {
    state = { 
        form:{
            ressource: '',
            intitule: '',
            qty:0,
            client: ''
        },
        ressource : [
            {
                id: 0,
                intitule: 'AAA',
                idressource: 'a',
                code:'CA',
                idachatype: '',
            },
            {
                id: 0,
                intitule: 'III',
                idressource: 'a',
                code:'cII',
                idachatype: '',
            }
        ],
        client:[
            {id:1,
            name:"test"}
        ]
     } 
    formatResult = (item) => {
        return (
          <>
            <span style={{ display: 'block', textAlign: 'left' }}>Code: {item.code}</span>
            <span style={{ display: 'block', textAlign: 'left' }}>intitule: {item.intitule}</span>
          </>
        )
      }
    handleOnSelectRess=(item)=>{
        console.log("test");
        this.state.form.ressource=item.idressource;
    }
    handleOnSelectCl=(item)=>{
        console.log("test");
        this.state.form.client=item.id;
    }
    handleIntitule=(event)=>{
        console.log(event.target.value);
        this.state.form.intitule=event.target.value;
    }
    handleQty=(event)=>{
        console.log(event.target.value);
        this.state.form.qty=event.target.value;
    }
    handleValidate=(event)=>{
        event.preventDefault();
        FetchHelper.getDataPost("url",this.state.form);
    }
    render() { 
        return (
            <React.Fragment>
                <h3>Saisir proformat envoyé par le client</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>Ressource</td>
                            <td>
                                <ReactSearchAutocomplete 
                                    showIcon={false}
                                    formatResult={this.formatResult}
                                    items={this.state.ressource}
                                    fuseOptions={{ keys: ["intitule", "code"] }}
                                    onSelect={this.handleOnSelectRess}
                                    showClear={false}
                                    resultStringKeyName="intitule"
                   
                                />

                            </td>
                        </tr>
                        <tr>
                            <td>Intitule</td>
                            <td>
                                <input type="text" name="intitule" id="" onInput={this.handleIntitule}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Quantite</td>
                            <td>
                                <input type="text" name="qte" id="" onInput={this.handleQty}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Client</td>
                            <td>
                                <ReactSearchAutocomplete showIcon={false} items={this.state.client}
                                onSelect={this.handleOnSelectCl}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-success">Valider</button>
                            </td>
                            <td>
                                <button className="btn btn-danger">Annuler</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}
 
export default ProformatClient;