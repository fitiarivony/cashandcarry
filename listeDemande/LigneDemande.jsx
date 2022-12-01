import React, { Component } from 'react';
class LigneDemande extends Component {
    state = {  } 
    render() { 
        return (
            <div>
                <h2>Reference: {this.props.inf.ref}</h2>
                <p>Demande de {this.props.inf.demande}</p>
                <a href="envoye"><button>proformat envoyer</button></a>
                <a href="reçu"><button>proformat reçu</button></a>
            </div>
        );
    }
}
 
export default LigneDemande;