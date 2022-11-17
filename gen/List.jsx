import React, { Component } from 'react';
import ListHeader from './ListHeader';
import ListLine from './ListLine';
class List extends Component {
    state = {  } 
    test=[{
        nom:"rakoto",
        prenom:"faly"
    },
    {
        nom:"rabe",
        prenom:"nandra"
    }];
    render() { 
        return (
            <table>
                <thead>
                    <ListHeader obj={this.test[0]}></ListHeader>
                </thead>
                <tbody>
                    {this.test.map(el=>
                        <ListLine obj={el}/>
                        )}
                </tbody>
            </table>)
        ;
    }
}
 
export default List;