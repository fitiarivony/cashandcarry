import React, { Component } from "react";
import TabElementLivraison from "./TabElementLivraison";
import FormElementLivraison from "./FormElementLivraison";
import Modal from "react-modal";
import FetchHelper from "../../Helper/FetchHelper";
import URLHelper from "../../Helper/URLHelper";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

class LivraisonVente extends Component {
  state = {
    fournisseur: "",
    date: "",
    remise: 0,
    elementLivraison: [
      
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
  async componentDidMount() {
    let json={
        idfournisseur:'FOU6'
    }
    const liste = await FetchHelper.getData(
      URLHelper.urlgen("api/BonCommandeSociete/login?data="+JSON.stringify(json))
    );
    console.log(liste);
    this.setState({ listebon: liste.data });
  }

  addEL = (data) => {
    console.log(data);
    let temp = [...this.state.elementLivraison];
    temp.push({
    
      idressource: data.rsc,
      quantite: data.quantite,
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
  handle=(event)=>{
    document.getElementById("rsc").value=event.target.value;

}
  send = () => {
      let alefa={
          idboncommande:this.state.fournisseur,
          data:this.state.elementLivraison
        };
        
        console.log(alefa);
      
        this.testpdf(alefa);
   
  };
  getdate=()=>{
    let currentDate=new Date().toJSON().slice(0, 10);
   let elements=currentDate.split("-");
   let val="";
   elements.forEach(element => {
     val+=element;
   });
   return val;
}
  testpdf =(livraison)=> {
    console.log(livraison);
    let vita=false;
    fetch(URLHelper.urlgen("api/storeLivraison"),{crossDomain:true,method:'POST',body:JSON.stringify(livraison), headers: {'Content-Type': 'application/pdf'}})
    .then(response=>{
        response.blob().then(blob=>{
            const fileURL = window.URL.createObjectURL(blob);
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = 'BDL-'+this.getdate()+this.state.fournisseur+'.pdf';
            alink.click();
            vita=true;
            if(vita){
             window.location.href="/vente";
            }
        })
    })
}


  handleOnSelect = (item) => {
    // the item selected
    // let data = this.state.data;
    console.log("ambany");
    // document.getElementById("rsc").value = item.idboncommande;
    this.setState({fournisseur:item.idboncommande});
    // data.idressource = item.idressource;
    // this.setState({selected:item.idressource});
    // console.log( document.getElementById("CR"+this.props.data.id));
  };
  formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          Code:<strong>{item.idboncommande}</strong>{" "}
        </span>
        <span style={{ display: "block", textAlign: "left" }}>
          intitule: <strong>{item.datecommande}</strong>
        </span>
      </>
    );
  };
  render() {
    return (
      <div>
        <h2>Livraison par SOCO</h2>

        <table>
          <tr>
            <td>Bon de Commande</td>
            <td>
              <ReactSearchAutocomplete
          items={this.state.listebon}
          fuseOptions={{ keys: ["idboncommande", "datecommande"] }}
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
          resultStringKeyName="idboncommande"
          required
        />
            </td>
          </tr>
          <tr>
            <td>Ressource</td>
            <td>
              <button className="btn btn-info btn-block" onClick={this.openModal}>
                Ressource
              </button>
            </td>
          </tr>
        </table>
        <Modal
          isOpen={this.state.modal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
        >
          <FormElementLivraison add={this.addEL}></FormElementLivraison>
          <TabElementLivraison
            elementLivraison={this.state.elementLivraison}
            delete={this.deleteEL}
          />
          <button className="btn btn-success" onClick={this.closeModal}>
            Finir
          </button>
        </Modal>
        <div>
          <button className="btn btn-success" onClick={this.send}>
            Envoyer
          </button>
        </div>
      </div>
    );
  }
}

export default LivraisonVente;
