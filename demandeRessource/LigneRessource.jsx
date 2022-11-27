import React, { Component } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import Modal from 'react-modal';
import URLHelper from '../Helper/URLHelper';
import '../assets/dist/css/bootstrap.min.css';
// import './../assets/dist/css/bootstrap.min.csrc/profromaTyping/ProTyper.jsxss'


class LigneRessource extends Component {
    state = this.props; 
    items = [
        {
          id: 0,
          name: 'Cobol'
        },
        {
          id: 1,
          name: 'JavaScript'
        },
        {
          id: 2,
          name: 'Basic'
        },
        {
          id: 3,
          name: 'PHP'
        },
        {
          id: 4,
          name: 'Java'
        }
        
      ]
    formatResult = (item) => {
        return (
          <>
            <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>
            <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
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
        data.CR=event.target.value;
        this.props.changeCR(data);
    }
    changeQ=(event)=>{
        let data=this.state.data;
        data.Q=event.target.value;
        this.props.changeCR(data);
    }
    changeDL=(event)=>{
        let data=this.state.data;
        data.DL=event.target.value;
        this.props.changeCR(data);
    }
    handleOnSelect = (item) => {
        // the item selected
        
        let data=this.state.data;
        console.log("ambany");
        console.log(item);
        document.getElementById("CR"+this.props.data.id).value=item.id;
        data.CR=item.id;
        this.props.changeCR(data);

    }
    handleCreate=(event) => {
        console.log("creating");
        event.preventDefault();
        this.create();
    }
    create= () =>{
        let data=this.state.data;
        var form = document.getElementById("Form2");
        var formData = new FormData(form);
        var object = {};
        formData.forEach((value, key) => object[key] = value);
        console.log(object);
        this.getId(URLHelper.urlgen("Ressource"), object);
        document.getElementById("CR"+this.props.data.id).value=object.code;
        data.CR=object.code;
        this.props.changeCR(data);
    }
    getId=(url, postobj)=>{
        const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(postobj)
              };
        fetch(url, options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }
    // const options = {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: '{"idressource":"tokony","intitule":"kiraro","idachattype":"ACH1","code":"4040"}'
    //   };
      
    //   fetch('http://127.0.0.1:8000/api/Ressource', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));
    openModal=()=> {
        this.setState({modal:true});
        this.initialize();
    }
    closeModal=()=> {
        this.setState({modal:false});
    }
    initialize =()=> {
        this.askService(URLHelper.urlgen("Achattype"));
    }
    askService = (url) => {
        fetch(url,{crossDomain:true,method:'GET', headers: {}})
        .then(res => { return res.json();})
        .then(data=>{
            console.log(data);
            let res=[];
            data.forEach(inf=>{
                res.push({
                    id:inf.idachattype,
                    name:inf.nomachattype
                });
            })
            console.log(res);
            this.setState(
                {
                    types: res
                }
            )
         })
    }
    // handleSearch=(item)=>{
    //     if()
    // }
    render() { 

        return (<tr>
            <td>
            <div className="App">
            
                <div style={{ width: 200 }}>
                <input type="hidden" name={"CR"+this.props.data.id} id={"CR"+this.props.data.id}/>
                <ReactSearchAutocomplete
                    items={this.props.items}
                    formatResult={this.formatResult}
                    onSelect={this.handleOnSelect}
                    showIcon={false}
                    showNoResultsText={<button onClick={this.openModal}>create new one</button>}
                    showClear={false}
                    
                    />
                    
            
                </div>
            </div>
            </td>
            <td>
                <input type="number" name={"Q"+this.props.data.id} onChange={this.changeQ} id="" value={this.props.data.Q} onKeyPress={this.onlyNumber}  />
            </td>
            <td>
                <input type="date" name={"DL"+this.props.data.id} id="" onChange={this.changeDL} value={this.props.data.DL} />
            </td>
            <td>
                <button onClick={this.props.add} className="btn btn-success" >More</button>
                <button onClick={()=>this.props.delete(this.props.data.id)} className="btn btn-danger" >Delete</button>
            </td>
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
                            <select className="form-select form-select-lg" name="idachattype" id="">
                                {this.state.types.map(data => 
                                    <option value={data.id}>{data.name}</option>
                                    )}
                            </select>
                            
                        </div>
                        <button onClick={this.handleCreate} >Submit</button>
                        <button onClick={this.closeModal}>Annuler</button>
                    </form>
                </Modal>
        </tr>);
    }
}
 
export default LigneRessource;