import React, { Component } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import URLHelper from "../Helper/URLHelper";
import InputRessource from "../ressource/Ressource";
import FetchHelper from "../Helper/FetchHelper";
import Ligne from "./Ligne";
export default class In extends Component {
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
  send=()=>{
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
       <Ligne></Ligne>
      </div>

      </>
    );
  }
}
