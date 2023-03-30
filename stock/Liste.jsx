import React, { Component } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import URLHelper from "../Helper/URLHelper";
import InputRessource from "../ressource/Ressource";
import FetchHelper from "../Helper/FetchHelper";
import Ligne from "./Ligne";
export default class Liste extends Component {
  state = {
    element:[]
  };
  openModal = () => {
    this.setState({ modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  render() {
    return (
      <>
      <div className="container">
        <table className="table" border="1">
            <thead>
                <td>Identification Ressource</td>
                <td>Quantite</td>
            </thead>
            <tbody>
                {
                    this.element.map(
                        i=>{}
                    )
                }
            </tbody>
        </table>
      </div>

      </>
    );
  }
}
