import React, { Component } from 'react';
class ElementReception extends Component {
    state = {  } 
    render() { 
        return (<tr>
            <td>{this.props.data.code}</td>
            <td>{this.props.data.nomressource}</td>
            <td>{this.props.data.quantite}</td>
        </tr>);
    }
}
 
export default ElementReception;