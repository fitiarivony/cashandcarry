import React, { Component } from 'react';
import Info from './Info';
import FicheNote from './FicheNote';
import '../assets/css/bootstrap.min.css';
import FetchHelper from '../Helper/FetchHelper';
class EvalProf extends Component {
    state = { 
        ind:"PE1",
        inf:{
            fournisseur:"Chomage Mad",
            ref:"ref1234",
            qlty: "chiffon bleu",
            qty: 200,
            date: "2022-03-01",
            lieu: "dans la societe",
            pu:4000
        },
        detailsprof:[{
            id: 1,
            intitule: "test",
            coefficient: 4
        },
        {
            id: 2,
            intitule: "test2",
            coefficient: 3
        }]
     } 
     constructor () {
        super();
        const params = new URLSearchParams(window.location.search);
        this.setState({ind:params.get("ind")});                              //indice proformat fournisseur
        this.setState({inf:FetchHelper.getData("test")});       // maka information proformat fournisseur
        this.setState({detailsprof:FetchHelper.getData("test")})// maka detail 
    } 
    render() { 
        
        return (
            <React.Fragment>
                <div className='row'>
                    <Info inf={this.state.inf}></Info>
                    <FicheNote details={this.state.detailsprof} ind={this.state.ind}></FicheNote>
                </div>
            </React.Fragment>
        );
    }
}
 
export default EvalProf;