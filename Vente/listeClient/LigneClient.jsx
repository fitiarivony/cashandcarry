import React, { Component } from 'react';
class LigneClient extends Component {
    state = {  } 
    render() {
        return (
            
            <div className='row'>
                <div className='col-xl-5'>
                    <h4>{this.props.inf.nomfournisseur}</h4>
                    <p>Code: {this.props.inf.codefournisseur}</p>
                </div>
                <div className='col-xl-5'>
                    {/* <p>{this.props.inf.delailivraison}</p> */}
                    <a href={"/bonclient?idclient="+this.props.inf.idfournisseur}><button className="btn btn-primary">Lister les proformats</button></a>
                </div>
                
            </div>
        );
    }
}
 
export default LigneClient;