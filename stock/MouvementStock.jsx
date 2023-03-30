import React, { Component } from "react";
import FetchHelper from "../Helper/FetchHelper";
import URLHelper from "../Helper/URLHelper";
import InStock from "./In2";
export default class MouvementStock extends React.Component {
  state = {
    liste: [],
    etat: [],
  };
  async componentDidMount() {
    this.data();
  }
  async data(){
    const listes = await FetchHelper.getData(URLHelper.urlgen("api/v_mvstock"));

    const liste2 = await FetchHelper.getData(
      URLHelper.urlgen("api/v_activestock")
    );
    this.setState({ liste: listes });
    this.setState({ etat: liste2 });
  }
  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col col-lg-12">
                <div>
                    <a className="btn btn-primary" href="mvstock">Refresh</a>
                    <a className="btn btn-primary" href="mvcmup">CMUP</a>
                </div>
                <InStock></InStock>
            </div>
          <div className="col col-lg-6">
            <h1 className="text-center">Etat De Stock</h1>
              <table className="table" border="1">
                <thead className="bg-dark text-light">
                  <tr>
                    <td>ressource</td>
                    <td>quantite</td>
                    <td>PU</td>
                    <td>datesortie</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.etat.map((i) => (
                    <tr>
                      <td>{i.ressource}</td>
                      <td>{i.quantite}</td>
                      <td>{i.pu}</td>
                      <td>{i.datesortie}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col col-lg-6">
              <h1 className="text-center">Mouvement De Stock</h1>
              <table className="table" border="1">
                <thead className="bg-secondary text-light">
                  <tr>
                    <td>Reference Stock</td>
                    <td>ressource</td>
                    <td>quantite</td>
                    <td>PU</td>
                    <td>datesortie</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.liste.map((i) => (
                    <tr>
                      <td>{i.idstock}</td>
                      <td>{i.ressource}</td>
                      <td>{i.quantite}</td>
                      <td>{(i.pu!=="0")?i.pu:"-"}</td>
                      <td>{i.datesortie}</td>
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
