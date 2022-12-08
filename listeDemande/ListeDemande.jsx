import React, { Component } from 'react';
import LigneDemande from './LigneDemande';
class ListeDemande extends Component {
    state = { inf:[{
        id:5,
        ref:"ref1234",
        demande:"46 Chocolat",
    },
    {
        id:5,
        ref:"ref1234",
        demande:"46 Chocolat",
    }
    ]}
    render() { 
        return (
            <div>
                {this.state.inf.map(el=>
                    <LigneDemande inf={el}></LigneDemande>
                    )}
            </div>
        );
    }
}
 
export default ListeDemande;