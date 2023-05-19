import React from "react";
import Cable from "../.././Dropwire.js"; //"react-dropwire"; //
import firebase from ".././init-firebase.js";
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  arrayUnion,
  addDoc,
  getDoc,
  updateDoc,
  setDoc,
  increment,
  query,
  where,
  deleteDoc,
  getDocs,
  arrayRemove
} from "firebase/firestore";
import Admin from "./admin.js";
import Guest from "./guest.js";
import Employee from ".././employee.js";

const firestore = getFirestore(firebase);
export default class Company extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      author: { username: "" },
      admin: [],
      employees: [],
      loadedImgs: []
    }; //CF_CF_API_KEY: ${{ secrets.CF_API_KEY }} wrangler dev &&
    for (let i = 0; i < 250; i++) {
      this["scrollImg" + i] = React.createRef();
    }
  }
  openTask = () => {};

  componentDidUpdate = (prevProps) => {
    const { company } = this.props;
    /*if (prevProps.auth !== this.props.auth)
      this.props.auth.uid && this.hydrateCompanies();*/
    if (prevProps.company !== company) company && this.getCompany(company);
  };
  componentDidMount = () => {
    /*onSnapshot(doc(firestore, "companies", company.id), (doc) => {
      if (doc.exists()) {
        var foo = doc.data();
        foo.id = doc.id;
        this.setState({ company: foo });
      }
    });*/

    var { company } = this.props;
    company && this.getCompany(company);
  };
  getCompany = (company) => {
    //console.log(company);
    company.authorId &&
      onSnapshot(doc(firestore, "users", company.authorId), (doc) => {
        if (doc.exists()) {
          var foo = doc.data();
          foo.id = doc.id;
          this.setState({
            author: foo
          });
        }
      });
    company.admins &&
      company.admins.length > 0 &&
      company.admins.forEach((e) => {
        onSnapshot(doc(firestore, "users", e), (doc) => {
          if (doc.exists()) {
            var foo = doc.data();
            foo.id = doc.id;
            this.setState({
              admin: [...this.state.admin.filter((e) => e.id !== foo.id), foo]
            });
          }
        });
      });
    company.employees &&
      company.employees.length > 0 &&
      company.employees.forEach((e) => {
        onSnapshot(doc(firestore, "users", e), (doc) => {
          if (doc.exists()) {
            var foo = doc.data();
            foo.id = doc.id;
            this.setState({
              employees: [
                ...this.state.employees.filter((e) => e.id !== foo.id),
                foo
              ]
            });
          }
        });
      });
  };
  render() {
    const space = " ";
    const selectMemberType = (e) => {
      //console.log(e.target.id);currentTarget.parentNode
      this.setState({ viewMemberType: e.currentTarget.id });
    };
    const styleIconMember = (e) => {
      const high =
        (!this.state.viewMemberType && e === "author") ||
        e === this.state.viewMemberType;
      return {
        borderRadius: "15px",
        border: `${high ? 2 : 0}px solid white`,
        width: `${30 - (high ? 2 : 0)}px`,
        height: `${30 - (high ? 2 : 0)}px`,
        position: "relative",
        margin: "4px"
      };
    };
    const handleScollImgError = (e) => {
      if (e.message) {
        console.log(e.message);
        this.setState({ serviceCancelingImages: true, noyoutube: true });
      }
    };
    let arrayOfnumbers = [0];
    const scrollnum = () => {
      const num = arrayOfnumbers[arrayOfnumbers.length - 1] + 1;
      arrayOfnumbers.push(num);
      return num;
    };

    const pho1 = this["scrollImg" + scrollnum()];
    //if (pho1)
    //pho1.onload = `javascript: window.loadedImgs: [...window.loadedImgs, ${"author"}];`;
    //console.log(pho1.currentTarget);
    var isAdmin = null,
      isEmployee = null;
    const { company } = this.props;
    if (this.props.auth !== undefined) {
      isAdmin =
        company.authorId === this.props.auth.uid ||
        (company.admin && company.admin.includes(this.props.auth.uid));
      isEmployee =
        isAdmin ||
        (company.employees && company.employees.includes(this.props.auth.uid));
    }
    return (
      <div
        style={{
          minWidth: "200px",
          maxWidth: "1200px",
          width: "80vw",
          border: "2px dashed grey",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <span>
          {this.state.viewMemberType === "author"
            ? "owner"
            : this.state.viewMemberType || "owner"}
          {": "}
          {this.state.viewMemberType === "admin"
            ? this.state.admin.length < 1
              ? "-"
              : //company.admin.map((e) => {
                //return <div>{this.state.admin[e].map((e) => {})}</div>;<div>{
                this.state.admin.map((e) => {
                  return <div>{e.username}</div>;
                }) //}</div>})
            : this.state.viewMemberType === "employee"
            ? this.state.employees.length < 1
              ? "-"
              : this.state.employees.map((e) => {
                  return <div>{e.username}</div>;
                })
            : this.state.author.username}
        </span>
        {/*company.name*/}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around"
          }}
        >
          <span id="author" onClick={selectMemberType}>
            {/*pho1 && !window.loadedImgs.includes("author") && "a"*/}
            {/*React.createElement("img", {
                ...document.getElementById("author"),
                style: { ...styleIconMember("author") }
              })}*/}
            <Cable
              style={{ ...styleIconMember("author") }}
              onError={handleScollImgError}
              img={true}
              src={
                this.state.noyoutube
                  ? ""
                  : "https://www.dropbox.com/s/mi3ksr5dde174qa/author%20icon.png?raw=1"
              }
              float="left"
              title="author"
              scrolling={this.state.scrolling}
              fwd={pho1}
              scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
              scrollTop={!this.state.oldecon ? 0 : this.state.scrollTop}
            />
          </span>
          <span id="admin" onClick={selectMemberType}>
            <Cable
              style={{ ...styleIconMember("admin") }}
              onError={handleScollImgError}
              img={true}
              src={
                this.state.noyoutube
                  ? ""
                  : "https://www.dropbox.com/s/pjelt1l07rvfwl4/admin%20icon.png?raw=1"
              }
              float="left"
              title="admin"
              scrolling={this.state.scrolling}
              fwd={this["scrollImg" + scrollnum()]}
              scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
              scrollTop={!this.state.oldecon ? 0 : this.state.scrollTop}
            />
          </span>
          <span id="employee" onClick={selectMemberType}>
            <Cable
              style={{ ...styleIconMember("employee") }}
              onError={handleScollImgError}
              img={true}
              src={
                this.state.noyoutube
                  ? ""
                  : "https://www.dropbox.com/s/lcjzwa1opxczkrw/employee%20icon.png?raw=1"
              }
              float="left"
              title="employee"
              scrolling={this.state.scrolling}
              fwd={this["scrollImg" + scrollnum()]}
              scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
              scrollTop={!this.state.oldecon ? 0 : this.state.scrollTop}
            />
          </span>
        </div>
        {/*jammin in the name of the lord err where til thru anyhow */}
        <div>{company.website}</div>
        {!isEmployee ? (
          <Guest company={company} auth={this.props.auth} />
        ) : !isAdmin ? (
          <Employee company={company} auth={this.props.auth} />
        ) : (
          <Admin
            company={company}
            auth={this.props.auth}
            isAdmin={isAdmin}
            pathname={this.props.pathname}
            history={this.props.history}
          />
        )}
        <span style={{ fontSize: "12px" }}>
          {
            !isAdmin
              ? "tip: break your spend into multiple proposals"
              : "tip: 'paid' means you can achieve the scope" /*acheive 'c'?? affectation */
          }
          <br />
          note: escrow or partial product should be returnable
        </span>
      </div>
    );
  }
}
