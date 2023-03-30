import React, { Component } from "react";
import FetchHelper from "../Helper/FetchHelper";
import URLHelper from "../Helper/URLHelper";
export default class BonCommandeList extends Component {
  state = {
    data: [],
  };
  async componentDidMount() {
    let json={
      client:true
    }
    const liste = await FetchHelper.getData(
      URLHelper.urlgen("api/ListeBonComm?data="+JSON.stringify(json))
    );
    this.setState({ data: liste });
  }

  
  testpdf =(idb)=> {
    let vita=false;
    fetch(URLHelper.urlgen("api/facture?idboncommande=" + idb),{crossDomain:true,method:'POST', headers: {'Content-Type': 'application/pdf'}})
    .then(response=>{
      const isJson = response.headers.get('content-type')?.includes('application/json');
           if(isJson){
                 alert("Mbola tsy recu le produit");
                return;
           }
        response.blob().then(blob=>{
            const fileURL = window.URL.createObjectURL(blob);
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = 'FC'+idb+'.pdf';
            alink.click();
            vita=true;
            if(vita){
             window.location.href="/achat";
            }
        })
    })
}
handleClick=(idb)=>{
    this.testpdf(idb);
}
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col">
            <h1 className="text-center"> Listes des bons de commande signe</h1>
          </div>
          <div className="col-lg-12 col">
            <table className="table table-striped table-hover" border="1">
              <thead className="text-center">
                <th>Reference</th>
                <th>Date bon de commande</th>
                <th></th>
              </thead>
              <tbody className="text-center">
                {this.state.data.map((d) => (
                  <tr>
                    <td>{d.idboncommande}</td>
                    <td>{d.datecommande}</td>
                    <td><button className="btn btn-success"  onClick={()=>{this.handleClick(d.idboncommande)}}>Generer facture</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
