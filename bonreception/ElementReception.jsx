import React, { Component } from 'react';
class ElementReception extends Component {
    state = {  } 
    render() { 
        return (<tr>
            <td>{this.props.data.refRessource}</td>
            <td>{this.props.data.designation}</td>
            <td>{this.props.data.PU}</td>
            <td>{this.props.data.remise} %</td>
        </tr>);
    }
}
 
export default ElementReception;