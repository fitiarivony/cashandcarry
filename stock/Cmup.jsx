import React, { Component } from "react";
import FetchHelper from "../Helper/FetchHelper";
import URLHelper from "../Helper/URLHelper";
import InStock from "./In2";
export default class Cmup extends React.Component {
  state = {
    liste: [],
    etat: [],
  };
  async componentDidMount() {
    this.data();
  }
  async data(){
    // const listes = await FetchHelper.getData(URLHelper.urlgen("api/v_mvstock"));

    const liste2 = await FetchHelper.getData(
      URLHelper.urlgen("api/v_cmup")
    );
    // this.setState({ liste: listes });
    this.setState({ etat: liste2 });
  }
  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col col-lg-12">
                <div>
                    <a className="btn btn-primary" href="mvcmup">Refresh</a>
                    <a className="btn btn-primary" href="mvstock">Etat</a>
                </div>
            </div>
          <div className="col col-lg-6">
            <h1 className="text-center">Etat De Stock</h1>
              <table className="table" border="1">
                <thead className="bg-dark text-light">
                  <tr>
                    <td>ressource</td>
                    <td>fournisseur</td>
                    <td>totalquantite</td>
                    <td>totalmontant</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.etat.map((i) => (
                    <tr>
                      <td>{i.ressource}</td>
                      <td>{i.nomfournisseur}</td>
                      <td>{i.totalquantite}</td>
                      <td>{i.totalmontant}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
    
          </div>
        </div>
      </>
    );
  }
}
