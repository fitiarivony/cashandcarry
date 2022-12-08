import React, { Component } from 'react';
import TabElementLivraison from './TabElementLivraison';
import FormElementLivraison from './FormElementLivraison';
import Modal from 'react-modal';

class Livraison extends Component {
    state = { 
        fournisseur:"",
        date:"",
        remise:0,
        elementLivraison:[{
            id:0,
            ressource:"401C",
            qte:120,
            remise:0
        }],
        modal:false
     } 
    supprId=0;
    deleteEL=(id)=>{
        this.supprId=id;
        let temp=this.state.elementLivraison;
        let nArr=temp.filter(this.filterById)
        this.setState({elementLivraison:nArr});
    }

    addEL=(data)=>{
        let temp=[...this.state.elementLivraison];
        temp.push({
            id:this.state.elementLivraison[this.state.elementLivraison.length-1].id+1,
            ressource:data.rsc,
            qte:data.qte,
            remise:data.rm
        })
        this.setState({elementLivraison:temp})

    }
    filterById=(item)=>{
        if(item.id!==this.supprId)return true;
        return false;
    }
    openModal=()=> {
        this.setState({modal:true});
    }

    closeModal=()=> {
        this.setState({modal:false});
    }
    updateFournisseur=(event)=> {
        this.setState({fournisseur:event.target.value})
    }
    updateDate=(event)=> {
        this.setState({date:event.target.value})
    }
    updateRemise=(event)=> {
        this.setState({remise:event.target.value})
    }
    
    render() { 
        return (
        <div>
            <h2>Livraison par SOCO</h2>
            
                <table>
                    <tr>
                        <td>Fournisseur</td>
                        <td>
                            <input type="text" name="fournisseur" id="" onInput={this.updateFournisseur}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Date</td>
                        <td>
                            <input type="date" name="date" id="" onInput={this.updateDate}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Remise</td>
                        <td>
                            <input type="number" name="remise" id="" max={100} onInput={this.updateRemise} />
                        </td>
                    </tr>
                    <tr>
                        <td>Ressource</td>
                        <td><button className="btn btn-primary" onClick={this.openModal}>Ressource</button></td>
                    </tr>
                </table>
                <Modal isOpen={this.state.modal} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal}>
                    <FormElementLivraison add={this.addEL}></FormElementLivraison>
                    <TabElementLivraison elementLivraison={this.state.elementLivraison} delete={this.deleteEL}/>
                    <button className="btn btn-success" onClick={this.closeModal}>Finir</button>
                </Modal>

        </div>);
    }
}
 
export default Livraison;