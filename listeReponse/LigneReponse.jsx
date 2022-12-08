import React, { Component } from 'react';
class LigneReponse extends Component {
    state = {  } 
    render() {
        var valeur=this.props.inf.reference.slice(1,this.props.inf.reference.length-1).split(',')[0];
        return (
            
            <div className='row'>
                <div className='col-xl-5'>
                    <h4>{this.props.inf.intitule}</h4>
                    <p>References demandes: {this.props.inf.reference}</p>
                </div>
                <div className='col-xl-5'>
                    <p>{this.props.inf.delailivraison}</p>
                    <a href={"/evaluer?idproformat="+this.props.inf.idproformat_fournisseur+"&&iddemande="+valeur}><button className="btn btn-primary">Evaluer</button></a>
                </div>
                
            </div>
        );
    }
}
 
export default LigneReponse;