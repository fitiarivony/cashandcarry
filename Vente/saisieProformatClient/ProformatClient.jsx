import React, { Component } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import FetchHelper from '../../Helper/FetchHelper';
import URLHelper from '../../Helper/URLHelper';
class ProformatClient extends Component {
    state = { 
        form:{
            idressource: '',
            intitule: '',
            quantite:0,
            idclient: '',
            reference:''
            
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
            {idfournisseur:1,
            nomfournisseur:"test"}
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

      formatResultClient = (item) => {
        return (
          <>
            <span style={{ display: 'block', textAlign: 'left' }}>Code: {item.codefournisseur}</span>
            <span style={{ display: 'block', textAlign: 'left' }}>intitule: {item.nomfournisseur}</span>
          </>
        )
      }
    handleOnSelectRess=(item)=>{
        console.log("test");
        this.state.form.idressource=item.idressource;
    }
    handleOnSelectCl=(item)=>{
        console.log("test");
        this.state.form.idclient=item.idfournisseur;
    }
    handleIntitule=(event)=>{
        console.log(event.target.value);
        this.state.form.intitule=event.target.value;
        this.state.form.reference=event.target.value;
    }
    handleQty=(event)=>{
        console.log(event.target.value);
        this.state.form.quantite=event.target.value;
    }
    handleValidate=(event)=>{
        event.preventDefault();
        this.insertProformat();
    }
    insertProformat=async()=>{
       
        const val= await (FetchHelper.getDataPost(URLHelper.urlgen("api/Proformat_envoye"),this.state.form));
        if(val.etat)window.location.href='/vente';
    }

    initialize=async () =>{
        const val=await (FetchHelper.getData(URLHelper.urlgen("api/Ressource")));
       this.setState({ressource: val});
       const liste=await (FetchHelper.getData(URLHelper.urlgen("api/NotNodie")));
       this.setState({client: liste});
    }
    constructor() {
        super();
        this.initialize();
    }
    render() { 
        return (
            <React.Fragment>
                <div className='row'>
                    <div className='col'></div>
                    <div className='col'>
                    <div class="card shadow mb-3"> 
                <div class="title-card card-header" > <h3>Saisir proformat envoyé par le client</h3></div>
                <div class="card-body">

                   
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
                                <ReactSearchAutocomplete 
                                showIcon={false} 
                                items={this.state.client}
                                fuseOptions={{ keys: ["codefournisseur", "nomfournisseur"] }}
                                onSelect={this.handleOnSelectCl}
                                formatResult={this.formatResultClient}
                                resultStringKeyName="codefournisseur"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={this.handleValidate} className="btn btn-success">Valider</button>
                            </td>
                            <td>
                                <a className="btn btn-danger" href='/vente'>Annuler</a>
                            </td>
                        </tr>
                    </tbody>
                </table>




                </div>
                </div>

                    </div>
                    <div className='col'></div>
                </div>
             
            </React.Fragment>
        );
    }
}
 
export default ProformatClient;