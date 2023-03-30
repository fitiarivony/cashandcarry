import React, { Component } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import URLHelper from "../Helper/URLHelper";
import InputRessource from "../ressource/Ressource";
import FetchHelper from "../Helper/FetchHelper";
export default class Ligne extends Component {
  state = {
    CRs: [
      {
        id: 0,
        intitule: "",
        idressource: "",
        code: "",
        idachatype: "",
      },
    ],
    selected: "",

    modal: true,
    element:[]
  };
  openModal = () => {
    this.setState({ modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };
  listeressource = () => {
    fetch(URLHelper.urlgen("api/Ressource"), {
      crossDomain: true,
      method: "GET",
      headers: {},
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          CRs: data,
        });
      });
  };
  componentDidMount() {
    this.listeressource();
  }

  handleOnSelect = (item) => {
    // the item selected
    // let data = this.state.data;
    console.log("ambany");
    document.getElementById("CR").value = item.idressource;
    // data.idressource = item.idressource;
    this.setState({selected:item.idressource});
    // console.log( document.getElementById("CR"+this.props.data.id));
  };
  formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          Code:<strong>{item.code}</strong>{" "}
        </span>
        <span style={{ display: "block", textAlign: "left" }}>
          intitule: <strong>{item.intitule}</strong>
        </span>
      </>
    );
  };
  add=()=>{
    let alefa={
      idressource:document.getElementById("Azy").value,
      quantite:document.getElementById("qte").value
    };
    FetchHelper.getDataPost(URLHelper.urlgen("api/stock"),alefa);
  }
  render() {
    return (
      <>
      <div style={{width:"28em",top:"50%",left:"50%",position:"absolute",transform:"translate(-50%,-50%)"}} className="card">
       <div className="card-header">
          <h1 className="text-center">Mouvement Stock</h1>
       </div>
        <div  className="card-body">
            <div className="row">
              <div className="col col-lg-4 mb-3">
                <label htmlFor="Azy">Ressource</label>
              <InputRessource name="Azy"></InputRessource>
              </div>
              <div className="col col-lg-4 mb-3">
              <label htmlFor="qte">Quantite</label>
                <input type="number" name="qte" id="qte" class="form-control" />
              </div>
              <div className="col col-lg-4 mt-4">
                <button onClick={this.send} className="form-control btn btn-success btn-block">Add</button>
              </div>
  
            </div>
        </div>
      </div>

      </>
    );
  }
}
