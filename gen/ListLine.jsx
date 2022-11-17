import React, { Component } from 'react';
class ListLine extends Component {
    state = {  } 
    render() { 
        var obj=this.props.obj;
        var key=Object.keys(obj);
        return (
            <tr>
                {
                    key.map(element=>
                        <td>{obj[element]}</td>
                        )
                }
                
            </tr>)
        ;
    }
}
 
export default ListLine;