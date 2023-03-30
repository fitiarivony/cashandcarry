import React, { Component } from "react";
import TabElementLivraison from "../livraison/TabElementLivraison";
import FormElementLivraison from "../livraison/FormElementLivraison";
import Modal from "react-modal";
import FetchHelper from "../Helper/FetchHelper";
import URLHelper from "../Helper/URLHelper";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import RessourceComponent from "./RessourceComponent";

class InStock extends Component {
  state = {
    elementLivraison: [
      {
        id: 0,
        idressource: "401C",
        quantite: 120,
      },
    ],
    listebon: [],
    modal: false,
  };
  supprId = 0;
  deleteEL = (id) => {
    this.supprId = id;
    let temp = this.state.elementLivraison;
    let nArr = temp.filter(this.filterById);
    this.setState({ elementLivraison: nArr });
  };

  addEL = (data) => {
    let temp = [...this.state.elementLivraison];
    temp.push({
      id:
        this.state.elementLivraison[this.state.elementLivraison.length - 1].id +
        1,
      idressource: data.rsc,
      quantite: data.quantite,
      pu: data.pu,
    });
    this.setState({ elementLivraison: temp });
  };
  filterById = (item) => {
    if (item.id !== this.supprId) return true;
    return false;
  };
  openModal = () => {
    this.setState({ modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };
  updateFournisseur = (event) => {
    this.setState({ fournisseur: event.target.value });
  };
  handle = (event) => {
    document.getElementById("rsc").value = event.target.value;
  };
  send = () => {
    let alefa = [];
    for (let i = 0; i < this.state.elementLivraison.length; i++) {
      let temp = {
        idressource: this.state.elementLivraison[i].idressource,
        quantite: Number.parseInt(this.state.elementLivraison[i].quantite),
        pu: this.state.elementLivraison[i].pu,
      };
      alefa.push(temp);
    }
    FetchHelper.getDataPost(URLHelper.urlgen("api/stock"), alefa);
    console.log(alefa);
    // FetchHelper.getDataPost(URLHelper.urlgen("api/storeLivraison"),alefa);
  };
  render() {
    return (
      <div>
        <h2 className="text-center">Gestion de Stock</h2>
        <div class="card mb-3">
          <div class="card-body">
            <div className="row">
              <div className="col col-lg-6">
                <h4>Ressource</h4>
              </div>
              <div className="col col-lg-6">
                <button
                  className="btn btn-primary btn-block form-control mb-3"
                  onClick={this.openModal}
                >
                  Faire Un Mouvement
                </button>
                <button className="btn btn-success btn-block form-control mb-3" onClick={this.send}>
                  Valider
                </button>
                <a href="/" className="btn btn-danger btn-block form-control">Retour</a>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={this.state.modal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
        >
          <RessourceComponent
            show={{ value: "idressource", label: ["code", "intitule"] }}
            add={this.addEL}
          ></RessourceComponent>
          <TabElementLivraison
            elementLivraison={this.state.elementLivraison}
            delete={this.deleteEL}
          />
          <button className="btn btn-success" onClick={this.closeModal}>
            Finir
          </button>
        </Modal>
        <div></div>
      </div>
    );
  }
}

export default InStock;
