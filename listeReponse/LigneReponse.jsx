import React, { Component } from 'react';
class LigneReponse extends Component {
    state = {  } 
    render() { 
        return (
            <div className='row'>
                <div className='col-xl-5'>
                    <h4>{this.props.inf.nomProduit}</h4>
                    <p>Reference demande: {this.props.inf.ref}</p>
                </div>
                <div className='col-xl-5'>
                    <p>{this.props.inf.date}</p>
                    <a href={"link?id="+this.props.inf.id}><button className="btn btn-success">Evaluer</button></a>
                </div>
                
            </div>
        );
    }
}
 
export default LigneReponse;