import React, { Component } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import URLHelper from "../Helper/URLHelper";
export default class InputRessource extends React.Component {
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
        document.getElementById(this.props.name).value = item.idressource;
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
      render() {
        return (
          <>
            <input
              type="hidden"
              name={this.props.name}
              id={this.props.name}
            />
    
            <ReactSearchAutocomplete
              items={this.state.CRs}
              fuseOptions={{ keys: ["intitule", "code"] }}
              formatResult={this.formatResult}
              onSelect={this.handleOnSelect}
              showIcon={true}
              showNoResultsText={
                <p
      
                >
                  Ressource pas trouve
                </p>
              }
              showClear={false}
              resultStringKeyName="intitule"
              required
            />
          </>
        );
      }
}