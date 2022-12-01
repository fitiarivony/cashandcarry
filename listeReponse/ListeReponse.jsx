import React, { Component } from 'react';
import FetchHelper from '../Helper/FetchHelper';
import LigneReponse from './LigneReponse';
class ListeReponse extends Component {
    state = { 
        inf:[{
            id:1,
            nomProduit: "test",
            ref:"ref12345",
            date:"2020-05-23"
        },
        {
            id:2,
            nomProduit: "test2",
            ref:"ref12345",
            date:"2020-05-23"
        }]
     } 
    constructor(){
        super();
        this.state = {inf:FetchHelper.getData("aiza")};
    }
    
    render() { 
        return (
            <div>
                {this.state.inf.map(el=>
                    <LigneReponse inf={el}></LigneReponse>    
                )}
            </div>
        );
    }
}
 
export default ListeReponse;