import React, { Component } from 'react';
class LigneRessource extends Component {
    state = {  } 
    render() {
        return (
            
            <div className='row'>
                <div className='col-xl-5'>
                    <h4>{this.props.inf.intitule}</h4>
                    <p>Code: {this.props.inf.code}</p>
                </div>
                <div className='col-xl-5'>
                    {/* <p>{this.props.inf.delailivraison}</p> */}
                    <a href={"/proformat_fournisseur?idressource="+this.props.inf.idressource}><button className="btn btn-primary">Lister les proformats</button></a>
                </div>
                
            </div>
        );
    }
}
 
export default LigneRessource;