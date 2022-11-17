import React, { Component } from 'react';
import LigneRessource from './LigneRessource';
import URLHelper from '../Helper/URLHelper';

import '../assets/dist/css/bootstrap.min.css';

/* TODO:
* liste déroulante code ressource
* nomDepartment atao props
*/
class DemandeRessource extends Component {
    state = { 
        modal:false,
        data:[
            {
                id:1,
                CR:"",
                Q:0,
                DL:""
            }
        ],
        CRs : [
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
          ],
          types:[
            {
                id: 1,
                nom:"type 1"
            },
            {
                id: 2,
                nom:"type 2"
            }
          ]
        
    } 
    
        
    onlyNumber=(event) => {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    }
    add=()=>{
        console.log("add");
        let data=this.state.data;
        let newData=[...data];
        newData.push({
            id:this.state.data[this.state.data.length-1].id+1,
            CR:"",
            Q:0,
            DL:""
        });
        this.setState({data:newData});
        console.log(this.state);
    }
    delete=(id)=>{
        console.log("nihena");
        let newData=[];
        let data=[...this.state.data];
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            if(element.id!==id){
                newData.push(element);
            }
        }
        this.setState({data:newData});
    }
    changeCR=(el)=>{
        console.log(el);
        console.log("niova");
        let newData=[];
        let data=[...this.state.data];
        for (let index = 0; index < data.length; index++) {
            let element = data[index];
            if(element.id===el.id){
                element=el;
            }
            newData.push(element);

        }
        this.setState({data:newData});
    }
    handleSubmit=(event) => {
        event.preventDefault();
        this.callchamp();
    }
    callchamp= () =>{
        var form = document.getElementById("myForm");
        var formData = new FormData(form);
        var object = {};
        formData.forEach((value, key) => object[key] = value);
        var json = JSON.stringify(object);
        console.log(formData);
        console.log( json);
        this.askRessources(URLHelper.urlgen("logAdmin/login.php?data="+json));
    }
    askRessources=(url)=>{
        fetch(url,{crossDomain:true,method:'GET',headers:{}})
        .then(res=>{return res.json() ; })
        .then(data=>{ 
            console.log(data);
            if (data.etat) {
                window.location.replace("/option")  
            }else{
                alert("erreur");
                console.log("echec");
            }
         })
    }
    
    constructor () {
        super();
        this.initialize();
    }

    initialize =()=> {
        this.askService(URLHelper.urlgen("testFA.php"));
    }
    askService = (url) => {
        fetch(url,{crossDomain:true,method:'GET', headers: {}})
        .then(res => { return res.json();})
        .then(data=>{
            console.log(data);
            this.setState(
                {
                    CRs: data.CRs,
                    types: data.types
                }
            )
         })
    }
    cancel=(event)=>{
        event.preventDefault();
    }
    render() { 
        return (
            <div>
                <h2>Departement: NomDepartement</h2>
                <form action="" onSubmit={this.cancel} id="myForm">
                <table style={{textAlign:"center"}}>
                    <thead>
                        <tr>
                            <th>Code ressources</th>
                            <th>Quantite</th>
                            <th>Date Limite</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map( data =>
                            <LigneRessource data={data} add={this.add} delete={this.delete} changeCR={this.changeCR} items={this.state.CRs} types={this.state.types} />
                        )}
                        
                        <tr>
                            <td colSpan={4}>
                                <button onClick={this.handleSubmit} className="btn btn-primary">Continuer</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </form>
                
                
            </div>
        );
    }
}
 
export default DemandeRessource;