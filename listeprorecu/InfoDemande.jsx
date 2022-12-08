import React, { Component } from 'react';
import FetchHelper from '../Helper/FetchHelper';
import URLHelper from '../Helper/URLHelper';
import background from '../assets/images/commande.jpg'
class InfoDemande extends Component {
    state = { } 
    render() { 
        return (
            <div className="card  mb-3 container">
                 <div className="card-header ">
                    <div className="row">
                        <h3 className="col-md-10 col-xl-10 col-lg-10 text-center"><b>Demande</b></h3>         
                    </div>
                </div>
                <div className="card-body">
                    <div className='row'>
                        <div className='col'></div>
                        <div className='col'>
                        <table>
                    <tr>
                        <td>Nom ressource</td>
                        <td>{this.props.ressource.intitule}</td>
                    </tr>
                    <tr>
                        <td>Code ressource</td>
                        <td>{this.props.ressource.code}</td>
                    </tr>
                    <tr>
                        <td>Quantite exigée</td>
                        <td>{this.props.ressource.totalquantite}</td>
                    </tr>
                   
                    </table>



                        </div>
                        <div className='col'></div>
                    </div>
                   
                </div>
            </div>
        );
    }
}
 
export default InfoDemande;