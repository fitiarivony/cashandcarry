import React, { Component } from 'react';
class LigneClient extends Component {
    state = {  } 
    render() {
        return (
            
            <div className='row'>
                <div className='col-xl-5'>
                    <h4>{this.props.inf.nomclient}</h4>
                    <p>Code: {this.props.inf.codeclient}</p>
                </div>
                <div className='col-xl-5'>
                    {/* <p>{this.props.inf.delailivraison}</p> */}
                    <a href={"/bonclient?idclient="+this.props.inf.idclient}><button className="btn btn-primary">Lister les proformats</button></a>
                </div>
                
            </div>
        );
    }
}
 
export default LigneClient;