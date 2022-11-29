import React, { Component } from 'react';
import LigneRessource from './LigneRessource';
import URLHelper from '../Helper/URLHelper';

import   '../assets/dist/css/bootstrap.min.css';
import   classes from '../assets/css/DemandeRessource.module.css';
import '../assets/js/form-validation.js';
import image from'../assets/images/abstract3.jpg';
/* TODO:
* liste déroulante code ressource
* nomDepartment atao props
*/
class DemandeRessource extends Component {
    state = { 
        modal:false,
        departement:{
            id:0,
            iddept:'',
            nomdepartement:''
        },

        data:[
            {
                id:1,
                idressource:"",
                quantite:0,
                datelimite:"",
                datedemande:"",
                iddept:new URLSearchParams(window.location.search).get('iddept'),
            }
        ],
        CRs : [
            {
              id: 0,
              intitule: '',
              idressource: '',
              code:'',
              idachatype: '',
            }
          ],
          types:[
            {
                id: 1,
                nom:"type 1"
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
            idressource:"",
            quantite:0,
            datelimite:"",
            datedemande:"",
            iddept:this.state.departement.iddept,
        });
        this.setState({data:newData});
        // console.log(this.state);
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
        this.askRessources(URLHelper.urlgen("api/Demande_ressource"));
    }
   
    askRessources=(url)=>{
        fetch(url,{crossDomain:true,method:'POST',headers:{ 'Content-Type': 'application/json'},body: JSON.stringify(this.state.data)})
        .then(res=>{return res.json() ; })
        .then(data=>{ 
            console.log(data);
            if (data.etat) {
                // window.location.replace("/option")  
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
        // this.askService(URLHelper.urlgen("testFA.php"));
        this.listeressource();
        this.listetype();
        this.getInfoDept();
    }

    listeressource = () => {
        fetch(URLHelper.urlgen("api/Ressource"),{crossDomain:true,method:'GET', headers: {}})
        .then(res => { return res.json();})
        .then(data=>{
            this.setState(
                {
                     CRs: data, 
                }
            )
         })
    }
    listetype = () => {
        
        fetch(URLHelper.urlgen("api/Achattype"),{crossDomain:true,method:'GET', headers: {}})
        .then(res => { return res.json();})
        .then(data=>{
            this.setState(
                {
                    types: data
                }
            )
         })
    }
    getInfoDept(){
        const params = new URLSearchParams(window.location.search);
        let data=params.get("iddept");
        let sending={
            "iddept":data,
        }
        // console.log(URLHelper.urlgen("api/Departement/login?data="+JSON.stringify(sending)));
        fetch(URLHelper.urlgen("api/Departement/login?data="+JSON.stringify(sending)),{crossDomain:true,method:'GET', headers: {}})
        .then(res => { return res.json();})
        .then(data=>{
            this.setState({ departement:data.data[0] })
         })
    }
    
    cancel=(event)=>{
        event.preventDefault();
    }
    render() { 
        return (
            <div  
             className='element'>
              
            <div className={`card shadow mb-3 ${classes.carte}`} >
                 <div class={`title-card card-header ${classes.titrecarte}`}>
            <p className="text m-0 fw-bold"><h2>Departement: {this.state.departement.nomdepartement}</h2><small>Demande ressource</small></p>
        </div>
        <div style={{height:"50px"}}></div>
            <div>
                
                <form className="needs-validation" action="" onSubmit={this.cancel} id="myForm">
                <table style={{textAlign:"center"}}>
                  
                    <tbody>
                        {this.state.data.map( data =>
                            <LigneRessource 
                                data={data} 
                                add={this.add} 
                                delete={this.delete} 
                                changeCR={this.changeCR} 
                                items={this.state.CRs}
                                reload={this.listeressource}
                                types={this.state.types} />
                        )}
                        
                        <tr>
                            <td colSpan={4}>
                                <button onClick={this.handleSubmit} className={`btn btn-primary ${classes.bouton} `}>Continuer</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </form>
                
                
            </div>
            </div>
            </div>
        );
    }
}
 
export default DemandeRessource;