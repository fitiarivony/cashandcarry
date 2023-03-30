import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/templatemo-breezed.css';
class HomeNodie extends Component {
    state = {  } 
    render() { 
        return (
           <div className='row'>
            <div className='col'></div>
            <div className='col'>
            <div className="container card shadow mb-3">
                <div className="title-card card-header bg-info">Bienvenue!!</div>
                <div className=" container card-body">
                    
                    <ul class="list-group">
                        <li class="list-group-item" > <a href="/achat">Achat</a></li>
                        <li class="list-group-item"><a href="/vente" >Vente</a></li>
                        <li class="list-group-item"><a href="/login" >Demande ressource</a></li>
                        <li class="list-group-item"><a href="/mvstock" >LIFO/FIFO</a></li>
                        <li class="list-group-item"><a href="/mvcmup" >CMUP</a></li>
                      
                    </ul>
                    
                   
                    
                    
                </div>
            </div>

            </div>
            <div className='col'></div>
           </div>
        );
    }
}
 
export default HomeNodie;