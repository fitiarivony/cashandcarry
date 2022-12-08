import React, { Component } from 'react';
import FetchHelper from '../Helper/FetchHelper';
import URLHelper from '../Helper/URLHelper';
import background from '../assets/images/commande.jpg'
class RightFournisseur extends Component {
    state = { 
        inf:{
            idreferencedemande:"",
            intitule:"",
            quantite:0,
            nomfournisseur:""
        }
     } 
     constructor(){
        super();
        let json={
            idproformat_fournisseur:new URLSearchParams(window.location.search).get("idproformat"),
            iddemande_ressource:new URLSearchParams(window.location.search).get("iddemande")
        }
    //    this.state = {inf:FetchHelper.getData(URLHelper.urlgen("api/Proformat_fournisseur_demande_ressource"))};
    this.listProformatRecu(json);
    }
    listProformatRecu=async (json)=>{
        const val=await (FetchHelper.getData(URLHelper.urlgen("api/Proformat_fournisseur_demande/login?data="+JSON.stringify(json))));
       
        this.setState({inf:val.data[0]});
    }
    testpdf =()=> {
        let info={
            idproformat_fournisseur:this.state.inf.idproformat_fournisseur,
        };
        fetch(URLHelper.urlgen("api/boncommande"),{crossDomain:true,method:'POST', body: JSON.stringify(info), headers: {'Content-Type': 'application/pdf'}})
        .then(response=>{
            response.blob().then(blob=>{
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'BDC-'+this.state.inf.idreferencedemande+this.state.inf.idfournisseur+'.pdf';
                alink.click();
              
            })
        })
    }
    handleClick=()=>{
        this.testpdf();
    }
    render() { 
        return (
            <div className="card  mb-3 container">
                 <div className="card-header bg-danger">
                    <div className="row">
                        <h3 className="col-md-10 col-xl-10 col-lg-10"><b>Proformat</b></h3>         
                    </div>
                </div>
                <div className="card-body">
                    <div className='row'>
                        <div className='col' style={{ backgroundImage: `url(${background})`,backgroundSize:"450px" }}></div>
                        <div className='col'>
                        <table>
                    <tr>
                        <td>Reference</td>
                        <td>{this.state.inf.idreferencedemande}</td>
                    </tr>
                    <tr>
                        <td>ressource</td>
                        <td>{this.state.inf.intitule}</td>
                    </tr>
                    <tr>
                        <td>quantite</td>
                        <td>{this.state.inf.quantite}</td>
                    </tr>
                    <tr>
                        <td>fournisseur</td>
                        <td>{this.state.inf.nomfournisseur}</td>
                    </tr>
                    <tr>
                        <td  colSpan={2}><button onClick={this.handleClick} className="btn btn-primary ">Generer un bon de commande</button></td>
                    </tr>
                    </table>



                        </div>
                    </div>
                   
                </div>
            </div>
        );
    }
}
 
export default RightFournisseur;