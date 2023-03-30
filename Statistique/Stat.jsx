import React, { Component } from "react";
import FetchHelper from "../Helper/FetchHelper";
import URLHelper from "../Helper/URLHelper";

export default class Stat extends React.Component {
  state = {
    liste: [],
    etat: [],
  };
  async componentDidMount() {
    this.data();
  }
  async data(){
    const listes = await FetchHelper.getData(URLHelper.urlgen("api/stat_achat_fournisseur"));
    this.setState({ liste: listes });
  }
  async send(){
    let alefa={
        moi: document.getElementById("moi").value,
        annee:document.getElementById("annee").value,
        client:document.getElementById("client").value,
        fournisseur:document.getElementById("fournisseur").value
    };
    const listes= await FetchHelper.getData(URLHelper.urlgen("api/stat_achat_fournisseur"));
    this.setState({liste:listes})
  }
  render() {
    return (
      <>
        <div className="container">
          <div className="row">
          <div className="col col-lg-6">
            <h1 className="text-center">Statistique Achat</h1>
              <table className="table" border="1">
                <thead className="bg-dark text-light">
                  <tr>
                    <td>idfournisseur</td>
                    <td>pu</td>
                    <td>idressource</td>
                    <td>quantite</td>
                    <td>datefacture</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.liste.map((i) => (
                    <tr>
                      <td>{i.idfournisseur}</td>
                      <td>{i.pu}</td>
                      <td>{i.idressource}</td>
                      <td>{i.quantite}</td>
                      <td>{i.datefacture}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col col-lg-6">
                    <div className="row">
                        <div className="col col-lg-4">
                            <label htmlFor="moi">Mois</label>
                            <input type="text" name="moi" className="form-control" id="moi"  />
                        </div>
                        <div className="col col-lg-4">
                            <label htmlFor="annee">Annee</label>
                            <input type="text" name="annee" className="form-control" id="annee"  />
                        </div>
                        <div className="col col-lg-4">
                        <label htmlFor="client">Client</label>
                            <input type="text" name="client" className="form-control" id="client"  />
                        </div>
                        <div className="col col-lg-4 mb-3">
                        <label htmlFor="fournisseur">Fournisseur</label>
                            <input type="text" name="fournisseur" className="form-control" id="fournisseur"  />
                        </div>
                        <div className="col col-lg-12">
                            <button onClick={this.send} className="btn btn-primary">Search</button>
                        </div>
                    </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
