import React, { Component } from 'react';
import FetchHelper from '../Helper/FetchHelper';
import URLHelper from '../Helper/URLHelper';

class FicheNote extends Component {
    state = { result:[{
        idproformat:"",
        iddetailsproformat:0,
        note:0
    }] } 
    onlyNumber=(event) => {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    }
    handleSubmit=(event) => {
        event.preventDefault();
        this.callchamp();
        
    }
   
    initDetail(){
        if (this.state.result[0].iddetailsproformat===0) {
            let temp=[];   
        this.props.details.map( element=> (
        temp.push({
            idproformat:this.props.ind,
            iddetailsproformat:element.iddetail,
            note:0
        }))
    )
    this.state={result:temp}
        }
        
    }
    callchamp=async () =>{
        let element=[];
        const val=await (FetchHelper.getDataPost(URLHelper.urlgen("api/NoteProformat"),this.state.result));    
         if(val.etat)window.location.href="/listereponse";
        // console.log(this.state.result);
    }
    update=(id)=>{
        // console.log(id);
        let res=[];
        let temp=this.state.result;
        for (const element of temp) {
            if (element.iddetailsproformat===id) {
                element.note=document.getElementById("el"+id).value;
            }
            // console.log(element);
            res.push(element);       
    }
    this.setState({result:res});
    // console.log(this.state.result);
}
    render() { 
       this.initDetail();
        return (
            <div style={{textAlign: "center"}} className='col-xl-4'>
                <h2>Evaluation</h2>
                <form action="" id="myForm" onSubmit={this.handleSubmit}>
                <div className="row g-3">
                        {this.props.details.map( element=>
                      
                        <div className="col-md-12">
                                <div className="row">
                                    <label  className="form-label col-11">{element.intitule}</label>
                                    
                                </div>
                                <input type="number" className='form-control' name={element.intitule} min={0} max={element.coefficient} onKeyPress={this.onlyNumber} id={"el"+element.iddetail} onChange={()=>this.update(element.iddetail)}/>
                        </div>

                        )}
                        </div>
                       
                                <button class="w-100 btn btn-success  submit">Continuer</button>
                         
                   
            </form>
            </div>
        );
    }
}
 
export default FicheNote;

