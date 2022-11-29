import React, { Component } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import Modal from 'react-modal';
import URLHelper from '../Helper/URLHelper';
import   classes from '../assets/css/DemandeRessource.module.css';
// import './../assets/dist/css/bootstrap.min.csrc/profromaTyping/ProTyper.jsxss'


class LigneRessource extends Component {
    state = this.props; 
    items = [
        {
            id: 0,
            intitule: '',
            idressource: '',
            code:'',
            idachatype: '',
          }
      ]
      type={
        idachatype:"",
        nomachattype:'',
      }
   
    formatResult = (item) => {
        return (
          <>
            <span style={{ display: 'block', textAlign: 'left' }}>Code: {item.code}</span>
            <span style={{ display: 'block', textAlign: 'left' }}>intitule: {item.intitule}</span>
          </>
        )
      }
    onlyNumber=(event) => {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    }
    changeCR=(event)=>{
        let data=this.state.data;
        data.idressource=event.target.value;
        this.props.changeCR(data);
        
    }
    changeQ=(event)=>{
        let data=this.state.data;
        data.quantite=event.target.value;
        this.props.changeCR(data);
    }
    changeDL=(event)=>{
        let data=this.state.data;
        data.datelimite=event.target.value;
        this.props.changeCR(data);
    }
    changeDE=(event)=>{
        let data=this.state.data;
        data.datedemande=event.target.value;
        this.props.changeCR(data);
    }
    handleOnSelect = (item) => {
        // the item selected
        let data=this.state.data;
        console.log("ambany");
         document.getElementById("CR"+this.props.data.id).value=item.idressource;
         data.idressource=item.idressource;
        this.props.changeCR(data);
        // console.log( document.getElementById("CR"+this.props.data.id));
       

      }
    
    


    handleCreate=(event) => {
        console.log("creating");
        event.preventDefault();
        this.create();
    }
    create= () =>{
        var form = document.getElementById("Form2");
        var formData = new FormData(form);
        var object = {};
        formData.forEach((value, key) => object[key] = value);
        var json = JSON.stringify(object);
        console.log(formData);
        console.log( json);
         this.getId(json);
    }
    getId=(data)=>{
        fetch(URLHelper.urlgen("api/Ressource"),{crossDomain:true,method:'POST',headers:{'Content-Type': 'application/json'},body: data })
        .then(res=>{return res.json() ; })
        .then(valiny=>{ 
            // console.log(data);
            if (valiny.etat) {
                console.log("reussite");
                this.props.reload();
                let data=this.state.data;
                data.idressource=valiny.last.idressource;
                this.props.changeCR(data);
                 this.closeModal();
                 
            }else{
                alert("erreur");
                console.log("echec");
            }
         })
    }
    openModal=()=> {
        this.setState({modal:true});
    }

    closeModal=()=> {
        this.setState({modal:false});
    }
    // handleSearch=(item)=>{
    //     if()
    // }
    render() { 

        return (
            <div className="row g-3">
           <div className="col">
           <label  className="form-label">Code ressource</label>
            <div className="App">
            
                <div style={{ width: 200 }}>
                <input type="hidden" name={"CR"+this.props.data.id} id={"CR"+this.props.data.id}/>
                <ReactSearchAutocomplete
                    items={this.props.items}
                    fuseOptions={{ keys: ["intitule", "code"] }} 
                    formatResult={this.formatResult}
                    onSelect={this.handleOnSelect}
                    showIcon={false}
                    showNoResultsText={<button onClick={this.openModal} className='btn btn-info' style={{width:"150px"}}>create new one</button>}
                    showClear={false}
                    resultStringKeyName="intitule"
                   required />
                </div>
                <div className="invalid-feedback">
                                Code ressource requis
                            </div>
            </div>
            </div>
            
            <div className='col'>
            <label  className="form-label">Quantite</label>
                <input type="number" name={"Q"+this.props.data.id} onChange={this.changeQ} id="cc-number" value={this.props.data.quantite} onKeyPress={this.onlyNumber} className="form-control" required />
                <div className="invalid-feedback">
                                Quantite requis
                            </div>
            </div>

            <div className='col'>
            <label  className="form-label">Date limite</label>
                <input type="date" className="form-control" name={"DL"+this.props.data.id} id="" onChange={this.changeDL} value={this.props.data.datelimite} required/>
                <div className="invalid-feedback">
                                Date limite requis
                            </div>

            </div>
            <div className='col'>
            <label  className="form-label">Date Envoi</label>
                <input type="date"  className="form-control" name={"DE"+this.props.data.id} id="" onChange={this.changeDE} value={this.props.data.datedemande} required/>
                <div className="invalid-feedback">
                                Date Envoi requis
                            </div>
            </div>

            <div className='col'>
                <button onClick={this.props.add} className={`btn btn-success ${classes.bouton}`} id="btn_sub" >More</button>
                <div style={{height:"10px"}}></div>
                <button onClick={()=>this.props.delete(this.props.data.id)} className={`btn btn-danger ${classes.bouton}`} id="btn_sub" >Delete</button>
            </div>
           
        
                <Modal isOpen={this.state.modal} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal}>
                    <form action="" id="Form2" >
                        <div className="mb-3">
                            <label for="" className="form-label">code ressource</label>
                            <input type="text" className="form-control" name="code" id="" aria-describedby="helpId" placeholder=""/>
                        </div>
                        <div className="mb-3">
                            <label for="" className="form-label">intitule</label>
                            <input type="text" className="form-control" name="intitule" id="" aria-describedby="helpId" placeholder=""/>
                        </div>
                        <div className="mb-3">
                            <label for="" className="form-label">Type</label>
                            <select value={this.type}  className="form-select form-select-lg" name="idachattype" id="">
                                {this.state.types.map(data => 
                                    <option value={data.idachattype}>{data.idachattype}</option>
                                )}
                            </select>
                            
                        </div>
                        <div className='row'>
                        <div className='col'>
                        <button onClick={this.handleCreate} className={`btn btn-success ${classes.bouton}`} >Enregistrer</button>
                        </div>
                       <div className='col'>
                       <button onClick={this.closeModal} className={`btn btn-warning ${classes.bouton}`} >Annuler</button>
                       </div>
                       </div>
                       
                    </form>
                </Modal>
                <div style={{height:"50px"}}></div>
                </div>);
    }
}
 
export default LigneRessource;