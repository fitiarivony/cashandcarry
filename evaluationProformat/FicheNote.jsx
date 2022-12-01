import React, { Component } from 'react';
import FetchHelper from '../Helper/FetchHelper';
class FicheNote extends Component {
    state = { result:[{
        idprofomatfournisseur:"test",
        iddetailsproformat:1,
        note:2
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
    constructor(props){
        console.log("test");
        super(props);
        this.state=({result:[]})
        let temp=[...this.state.result]
        props.details.map( element=> (
            console.log(element),
            temp.push({
                idprofomatfournisseur:props.ind,
                iddetailsproformat:element.id,
                note:0
            }))
        )
        this.state={result:temp}
    }
    callchamp= () =>{
        FetchHelper.postData("test", this.state.result);
    }
    update=(id)=>{
        console.log(id);
        let res=[];
        let temp=this.state.result;
        for (let index = 0; index < temp.length; index++) {
            const element = temp[index];
            if (element.iddetailsproformat===id) {
                element.note=document.getElementById("el"+id).value;
            }
            res.push(element);   
        }
        this.setState({result:res});
    }
    render() { 
        return (
            <div style={{textAlign: "center"}} className='col-xl-4'>
                <h2>Evaluation</h2>
                <form action="" id="myForm" onSubmit={this.handleSubmit}>
                    <table>
                        {this.props.details.map( element=>
                            <tr>
                                <td>{element.intitule}</td>
                                <td>
                                    <input type="number" name={element.intitule} min={0} max={element.coefficient} onKeyPress={this.onlyNumber} id={"el"+element.id} onChange={()=>this.update(element.id)}/>
                                </td>
                            </tr>
                        )}
                        <tr>
                            <td colSpan={2}>
                                <button>Continuer</button>
                            </td>
                        </tr>
                    </table>
            </form>
            </div>
        );
    }
}
 
export default FicheNote;