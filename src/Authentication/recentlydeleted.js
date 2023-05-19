import React from "react";
import firebase from "./init-firebase.js";
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  addDoc,
  getDocs,
  updateDoc,
  setDoc,
  increment,
  query,
  where,
  deleteDoc
  //getDocs
} from "firebase/firestore";
import Company from "./company";
import { standardCatch } from "./Sudo.js";

const firestore = getFirestore(firebase);
class Fetch extends React.Component {
  state = { companies: [], newCompany: { name: "" }, deletedlist: [] }; //CF_CF_API_KEY: ${{ secrets.CF_API_KEY }} wrangler dev &&
  openTask = () => {};
  render() {
    const color = (x) => (this.state.hovering === x ? "white" : "grey");
    const styleOption = {
      margin: "6px 0px",
      borderRadius: "10px",
      padding: "10px 20px"
    };
    const restore = (nul, e = this.props.companyclone) => {
      //if (!this.props.companyclone) return null;
      console.log(e.id);
      const docref = e && doc(firestore, "companies", e.id);
      const answer = window.confirm("restore this company?");
      answer &&
        updateDoc(docref, {
          deleted: false
        })
          .then(
            () => /*this.setState({
              deletedlist: [
                ...this.state.deletedlist.filter((id) => docref.id !== id)
              ]
            })*/ {}
          )
          .catch(standardCatch);
    };
    const space = " ";
    const companies = this.props.companies.filter(
      (e) => !this.state.deletedlist.includes(e.id) && e.deleted
    );
    return (
      <div style={{ cursor: "pointer" }}>
        <div
          ref={this.props.companyCloner}
          style={{ display: "none" }}
          onClick={restore}
        />
        {!this.props.tempRecentlyDeleted
          ? null
          : companies.length < 1
          ? "nothing to show you"
          : //ohh certainly - ut for lawyer ones
            companies.map((e) => (
              <div
                style={{
                  alignItems: "center",
                  display: "flex"
                }}
                key={e.name + e.id}
              >
                <div
                  onClick={() => this.openTask()}
                  id={e.name}
                  onMouseEnter={(e) => this.setState({ hovering: e.target.id })}
                  onMouseLeave={() => this.setState({ hovering: "" })}
                  style={{
                    ...styleOption,
                    border: `2px solid ${color(e.name)}`
                  }}
                >
                  {e.name}
                </div>
                {e.authorId === this.props.auth.uid && (
                  <div style={{ padding: "9px" }}>
                    <div
                      style={{ padding: "9px" }}
                      onClick={() => restore(null, e)}
                    >
                      ^
                    </div>
                    <div
                      onClick={() => {
                        const docref = doc(firestore, "companies", e.id);
                        console.log(docref.id);
                        const answer = window.confirm("delete this company?");
                        answer &&
                          deleteDoc(doc(firestore, "companies", docref.id))
                            .then(() => {
                              console.log("deleted " + docref.id);
                              this.setState({
                                deletedlist: [
                                  ...this.state.deletedlist.filter(
                                    (id) => docref.id !== id
                                  ),
                                  e.id
                                ]
                              });
                            })
                            .catch(standardCatch);
                      }} //make recoverable, law applied equally, save the rats
                    >
                      &times;
                    </div>
                  </div>
                )}
              </div>
            ))}
        {this.state.viewCompany && (
          <Company companyId={this.state.viewCompany} />
        )}
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => {
  return <Fetch companyCloner={ref.current["companyCloner"]} {...props} />;
});

//commodity land is money perishable for tax
