import React, { Component } from 'react';
class ListHeader extends Component {
    state = {  } 
    render() {
        var temp=this.props.obj; 
        var key=Object.keys(temp);
        console.log(key);
        return (
            <tr>
                {key.map(element => 
                    <th>{element}</th>
                    
                    )}
                
            </tr>)
        ;
    }
}
 
export default ListHeader;