import React from "react";
import "react-datepicker/dist/react-datepicker.css";

import ReactDOM from "react-dom";
import firebase from "../../.././init-firebase.js";
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
  arrayRemove, //marx attacks debri//argument without holes, "don't combine" wassup dog
  deleteField
} from "firebase/firestore";
import Requirements from "./requirements.js";
import { monthsnamlist } from "./index.js";

//collective action does not limit non-respondents
//same spending withot the Affont

const firestore = getFirestore(firebase);
class Proposal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      willCall: props.e.willCall,
      author: { name: "" },
      newRequest: { name: "" },
      fetchingComments: null,
      cost: props.e.cost
    }; //CF_CF_API_KEY: ${{ secrets.CF_API_KEY }} wrangler dev &&
    /*this.immediateStyle = {};
    for (let i = 0; i < 250; i++) {
      this.immediateStyle["details" + i] = React.createRef();
    }*/
  }
  componentWillUnmount = () => {
    clearInterval(this.int);
  };
  openTask = () => {};
  componentDidMount = () => {
    const { e } = this.props;
    e &&
      onSnapshot(
        doc(
          firestore,
          "users",
          e.authorId //CompanyId.split("/" + e.companyId)[0]
        ),
        (doc) => {
          if (doc.exists()) {
            var foo = doc.data();
            foo.id = doc.id;
            this.setState({
              author: foo
            });
          }
        }
      );
  };
  /*componentDidUpdate = (prevProps) => {
    if (prevProps.e !== this.props.e) {
      this.setState({ changed: true }, () => {
        console.log("changed");
        this.setState({ changed: false });
      });
    }
  };*/
  render() {
    const { e, i } = this.props;
    const color = (x) => (this.state.hovering === x ? "white" : "grey");
    const styleOption = {
      margin: "6px 0px",
      borderTopLeftRadius: "10px",
      borderBottomLeftRadius: "10px",
      padding: "5px 10px",
      width: "max-content",
      fontSize: "12px"
    };
    const space = " ";
    let arrayOfnumbers = [0];
    const scrollnum = () => {
      const num = arrayOfnumbers[arrayOfnumbers.length - 1] + 1;
      arrayOfnumbers.push(num);
      return num;
    };

    const num = scrollnum();
    const newRequest = () => {
      addDoc(collection(firestore, "requirements"), {
        ...this.state.newRequest,
        proposalId: e.id

        //name: this.state.name
      })
        .then(() => {
          this.setState({
            newRequest: { name: "" },
            tempRequest: false
          });
        })
        .catch(standardCatch);
    };
    const isCustomer =
      this.props.auth !== undefined &&
      !this.props.isAdmin &&
      e.authorId === this.props.auth.uid; //CompanyId + "/" + this.props.company.id;
    if (!e.willCall || !e.paidAt) {
      clearInterval(this.int);
      this.int = setInterval(() => {
        if (this.state.fetchingComments === null) {
          this.setState({ fetchingComments: true });
        } else if (this.state.fetchingComments) {
          this.setState({ fetchingComments: false });
        } else {
          this.setState({ fetchingComments: null });
        }
      }, 1200);
    }
    const daysSpent = !e.paidAt
      ? 0
      : (new Date().getTime() / 1000 - e.paidAt) / 86400;
    const daysLeft = (e.willCall - new Date().getTime() / 1000) / 86400;
    const longer = Math.max(daysSpent, daysLeft);
    //this.props.newlymodified && console.log(e.name);
    var tone =
      250 - 250 * ((e.willCall - new Date().getTime() / 1000) / 5260000);
    tone = Math.min(tone, 160);
    tone = Math.max(tone, 20);
    //console.log(e.willCall);
    return (
      <div
        style={{
          position: "relative",
          padding: "3px",
          borderRadius: "8px",
          borderTopLeftRadius: "14px",
          borderTopRightRadius: "4px",
          borderBottomLeftRadius: "4px",
          border: "4px solid rgb(120,90,80)",
          backgroundColor: this.props.newlymodified ? "rgba(0,0,20,.6)" : "",
          width: "min-content",
          minWidth: "170px",
          opacity: !this.props.details || this.props.details === e.id ? 1 : 0.8,
          transition: `${
            this.props.details !== e.id && !this.props.newlymodified ? 2.5 : 0
          }s ease-in`
        }}
      >
        <div
          style={{
            display: "flex"
          }}
        >
          <span
            onClick={() => {
              /*this.setState({
                openDatePickerToggler: !this.state.openDatePickerToggler
              })*/
              this.props.portal.current.setOpen(true);
              this.props.setProposalDetail({
                editWillCall: e
              });
            }}
            style={{
              top: "-4px",
              userSelect: "none",
              padding: "0px 8px",
              left: "-3px",
              //position: "absolute",
              display: "block",
              borderRadius: "10px",
              border: `1.5px solid ${e.willCall ? "black" : ""}`,
              backgroundColor: `rgb(${tone + 20},${tone + 40},${tone + 90})`
            }}
          >
            <span style={{ fontSize: "9px" }}>
              {monthsnamlist[new Date(e.willCall * 1000).getMonth()]}
            </span>
            <br />
            {new Date(e.willCall * 1000).getDate()}
          </span>
          <div
            style={{
              position: "relative"
            }}
          >
            {this.props.isAdmin && (
              <div
                style={{
                  width: "100%",
                  right: "115%",
                  position: "absolute",
                  textAlign: "right" //an NBER recession is an efficient labor market (less work more expense)
                  //proof of admission
                }}
              >
                {e.account && !this.state.changeAccount ? (
                  <div onClick={() => this.setState({ changeAccount: true })}>
                    :{e.account}
                  </div>
                ) : (
                  <div>
                    {this.props.company.chartOfAccounts &&
                      this.props.company.chartOfAccounts.length > 0 && (
                        <select
                          value={e.account}
                          style={{ width: "100%" }}
                          onBlur={() => this.setState({ changeAccount: false })}
                          onChange={(w) => {
                            w.preventDefault();
                            const select = w.target;
                            const id = select.children[select.selectedIndex].id;
                            const answer = window.confirm(
                              "the account for " + e.name + " is " + id + "?"
                            );
                            answer &&
                              updateDoc(doc(firestore, "proposals", e.id), {
                                account: id
                              });
                            this.setState({ changeAccount: false });
                          }}
                        >
                          {this.props.company.chartOfAccounts.map((e) => (
                            <option id={e} key={"account" + e}>
                              {e}
                            </option>
                          ))}
                        </select>
                      )}
                    {/*this.state.openDatePickerToggler &&<div
                      onClick={() =>
                        this.setState({
                          editWillCall: !this.state.editWillCall
                        })
                      }
                    >
                      {this.props.makeFancy(new Date(e.willCall * 1000))}
                    </div>*/}
                  </div>
                )}
              </div>
            )}{" "}
            {/**--- */}
            <span style={{ display: "flex" }}>
              {/**++ */}
              <div className="ticker-tape">
                <div className="ticker-tape-collection">
                  {i + 1}. {e.name}{" "}
                </div>
              </div>

              <span
                style={{
                  padding: "2px 4px",
                  //textAlign: "center",
                  paddingRight: "0px",
                  fontSize: "14px",
                  letterSpacing: "5px",
                  borderRadius: "3px",
                  backgroundColor:
                    this.props.isAdmin && e.willCall ? "blue" : "",
                  border: `${this.props.isAdmin && e.willCall ? 0 : 1}px solid`
                }}
                onClick={(w) => {
                  if (!this.props.isAdmin) return null;
                  /*!this.props.isAdmin
                  ? this.setState({
                      tempNameChange: true
                    })
                  : */ e.paidAt
                    ? window.confirm("is this not paid?") &&
                      updateDoc(doc(firestore, "proposals", e.id), {
                        paidAt: deleteField(),
                        willCall: 0
                      })
                    : !this.props.editWillCall.willCall
                    ? window.confirm(
                        "estimate when this job will be completed"
                      ) &&
                      this.props.setProposalDetail({ editWillCall: e }, () =>
                        this.props.portal.current.setOpen(true)
                      )
                    : window.confirm("mark as paid?") &&
                      updateDoc(doc(firestore, "proposals", e.id), {
                        paidAt: new Date().getTime() / 1000,
                        willCall: new Date(this.props.willCall).getTime() / 1000
                      });
                }}
              >
                {e.paidAt ? "X" : "O"}
              </span>
            </span>
          </div>
        </div>

        <div
          style={{
            color: "rgb(180,230,200)",
            width: "100%",
            position: "relative"
          }}
        >
          {!e.paidAt && (
            <div style={{ position: "absolute" }}>
              .
              {this.state.fetchingComments !== null && (
                <span>.{!this.state.fetchingComments && <span>.</span>}</span>
              )}
            </div>
          )}
          {!e.paidAt && (
            <span style={{ fontSize: "12px" }}>
              {this.props.isAdmin ? "your" : "in"} review
            </span>
          )}
          {e.willCall !== 0 && e.paidAt && (
            <div
              style={{
                height: "50px",
                position: "relative",
                width: `100%`
              }}
            >
              <form
                style={{
                  width: "max-content"
                }}
                onSubmit={(w) => {
                  w.preventDefault();
                  const answer = window.confirm(
                    "update chart of accounts with " +
                      this.state.newAccount +
                      "?"
                  );
                  answer &&
                    updateDoc(
                      doc(firestore, "companies", this.props.company.id),
                      {
                        chartOfAccounts: arrayUnion(this.state.newAccount)
                      }
                    );
                  answer &&
                    updateDoc(doc(firestore, "proposals", e.id), {
                      account: this.state.newAccount
                    });
                  this.setState({ changeAccount: false });
                }}
              >
                <input
                  style={{ width: "100%", maxWidth: "80px" }}
                  state={this.state.newAccount}
                  placeholder="account"
                  id="newAccount"
                  onChange={(
                    e //mouse leave == blur mobile
                  ) =>
                    this.setState({
                      [e.target.id]: e.target.value
                    })
                  }
                />
                <span
                  onClick={() => {
                    /*this.immediateStyle[ "details" + num].current.style.zIndex = this.state["details" + e.id]
                ? -99: 0;this.immediateStyle["details" + num ].current.style.position = this.state[
                "details" + e.id]? "fixed" : "relative";this.immediateStyle["details" + num
              ].current.style.transition = `${this.state["details" + e.id] ? 0.3 : 0 }s ease-in`;*/
                    this.props.setProposalDetail(
                      {
                        //["details" + e.id]: !this.state["details" + e.id]
                        details: this.props.details !== e.id && e.id
                      } /*,() => { this.immediateStyle[ "details" + num].current.style.transition = `${
                    this.state["details" + e.id] ? 0 : 3}s ease-in`;}*/
                    );
                  }}
                  style={{
                    border: "1px solid",
                    fontSize: "12px",
                    position: "absolute",
                    right: "0px",
                    transition: ".2s ease-in",
                    transform: `rotate(${
                      this.props.details !== e.id ? 270 : 180
                    }deg)`
                  }}
                >
                  &#9650;
                </span>
              </form>
              {/**get to the choppa euh i love it when yu talk like that (mark as unpaid?????) */}
              <div
                style={{
                  border: "2px solid transparent",
                  height: "10px",
                  backgroundColor: "rgb(50,100,230)",
                  width: `calc(100% * ${daysLeft / longer})`
                }}
              />
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    //border: "2px solid",
                    position: "absolute",
                    height: "10px",
                    width: "100%"
                  }}
                />
              </div>
              <div
                style={{
                  border: "2px solid transparent",
                  height: "10px",
                  backgroundColor: "rgb(30,50,80)",
                  width: `calc(100% * ${daysSpent / longer})`
                }}
              />
            </div>
          )}
        </div>
        {/*<div
          style={{
            overflow: "hidden",
            height: "0px",
            width: "0px",
            position: "relative",
            zIndex: this.state.editWillCall ? "1" : "-10"
          }}
        >
          {/*&& !e.willCall*/
        /*|| this.state.editWillCall* /}{" "}
          {
            //this.props.details === e.id && (
            <ReactDatePicker
              ref={this.props.portal}
              placeholderText="Will Call"
              selected={e.willCall ? e.willCall * 1000 : this.props.willCall}
              onCalendarClose={() => this.setState({ editWillCall: null })}
              onChange={(date) => {
                //console.log(new Date(date).getTime());
                this.setState(
                  {
                    willCall: date
                  },
                  () => {
                    if (!this.props.isAdmin) return null;
                    const dt = new Date(date);
                    //console.log(this.props.makeFancy(dt));
                    const answer = window.confirm(
                      "update will call to " +
                        this.props.makeFancy(dt) +
                        " for the same price of " +
                        e.cost +
                        "?"
                    );
                    answer &&
                      updateDoc(doc(firestore, "proposals", e.id), {
                        willCall: new Date(date).getTime() / 1000
                      }).then((e) => this.setState({ editWillCall: null }));
                  }
                );
              }}
              withPortal //portalId="root-portal"
            />
          }
        </div>*/}
        {this.props.isAdmin && (
          <div
            style={{
              position: "relative",
              width: `100%`
            }}
          >
            <div
              style={{
                width: "100%",
                right: "115%",
                position: "absolute",
                textAlign: "right" //an NBER recession is an efficient labor market (less work more expense)
                //proof of admission
                //Does the natural marginal affectation on revenue not depend on budget constraints of the individual or otherwise a non-expiring and competitive commodity collective?
              }}
            >
              {this.state.author.username}
            </div>
          </div>
        )}
        <div
          //ref={this.immediateStyle["details" + num]}
          style={{
            minHeight: "40px",
            /*transition: `${
                this.state["details" + e.id] ? 0.3 : 0
            }s ease-in`,*/
            transition: ".1s ease-in",
            /*height: this.state["details" + e.id]
              ? "min-content"
              : "0px",*/
            //overflow: this.state["details" + e.id] ? "" : "hidden"
            position:
              /*e.paidAt || */ this.props.details === e.id
                ? "relative"
                : "fixed",
            //position: "fixed",
            opacity: /*e.paidAt || */ this.props.details === e.id ? 1 : 0,
            zIndex: /*e.paidAt || */ this.props.details === e.id ? 0 : -99
            //zIndex: -99
          }}
        >
          {/*<hr style={{ width: "100%" }} />*/}
          {isCustomer && (
            <div style={{ display: "flex", position: "relative" }}>
              <div
                onClick={() =>
                  this.setState({
                    tempRequest: !this.state.tempRequest
                  })
                }
                id="new proposal"
                onMouseEnter={(e) => this.setState({ hovering: e.target.id })}
                onMouseLeave={() => this.setState({ hovering: "" })}
                style={{
                  ...styleOption,
                  border: `2px solid ${color("new proposal")}`
                }}
              >
                + require details
              </div>
              <div
                style={{
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px",
                  height: "100%",
                  width: "100%",
                  textAlign: "center",
                  backgroundColor: "rgb(0,0,20)",
                  color: "rgb(230,230,230)",
                  cursor: "pointer",
                  padding: "10px 0px",
                  margin: "auto"
                }}
              >
                {this.state["requirementCount" + e.id]
                  ? this.state["requirementCount" + e.id]
                  : 0}{" "}
                requirements
                {(!this.state["requirementCount" + e.id] ||
                  this.state["requirementCount" + e.id] === 0) &&
                  " yet"}
              </div>
            </div>
          )}

          <span
            onClick={() =>
              this.props.isAdmin &&
              this.setState({ changeCost: !this.state.changeCost })
            }
            style={{
              WebkitTextStroke: ".3px black",
              color: "rgb(20,140,80)",
              right: "0px",
              position: "absolute",
              backgroundColor: "rgb(175, 140, 90)"
            }}
          >
            $
          </span>
          <div
            style={{
              borderRadius: "8px",
              backgroundColor: "rgb(0,0,20)",
              width: "max-content",
              left: "105%",
              position: "absolute",
              textAlign: "left"
            }}
          >
            {e.cost && !this.state.changeCost ? (
              <div
                onClick={() =>
                  this.props.isAdmin && this.setState({ changeCost: true })
                }
              >
                {e.cost}
              </div>
            ) : (
              this.props.isAdmin && (
                <form
                  onSubmit={(w) => {
                    w.preventDefault();
                    if (this.state.cost === "")
                      return this.setState({ changeCost: false });
                    const answer = window.confirm(
                      "the cost for " + e.name + " is " + this.state.cost + "?"
                    );
                    answer &&
                      updateDoc(doc(firestore, "proposals", e.id), {
                        cost: this.state.cost
                      });
                    this.setState({ changeCost: false });
                  }}
                >
                  <input
                    maxLength={8}
                    type="number"
                    style={{ width: "100%", maxWidth: "60px" }}
                    value={this.state.cost}
                    placeholder="cost"
                    //defaultValue={this.state.cost}
                    id="cost"
                    onChange={(e) =>
                      this.setState({
                        [e.target.id]: e.target.value.slice(
                          0,
                          e.target.maxLength
                        )
                      })
                    }
                  />
                </form>
              )
            )}
          </div>
          {isCustomer && this.state.tempRequest ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                newRequest();
              }}
            >
              <input
                required={true}
                minLength={2}
                state={this.state.newRequest.name}
                placeholder="name"
                id="name"
                onChange={(e) =>
                  this.setState({
                    newRequest: { [e.target.id]: e.target.value }
                  })
                }
                autocomplete="off"
              />
            </form>
          ) : (
            <Requirements
              setBoard={(e) => {
                this.setState({
                  ["requirementCount" + e.id]: e.length
                });
              }}
              company={this.props.company}
              proposal={e}
            />
          )}
        </div>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <Proposal portal={ref.portal} {...props} />
));
/**
 * 
 * 
  /*
  /*this.props.isAdmin || * / e.paidAt ? (
    <div
      style={{
        fontSize: "12px",
        color: "rgb(80,80,80)"
      }}
    >
      {Math.round(daysLeft)} days left: √{Math.round(daysSpent)}
    </div>
  ) : 
<hr style={{ width: "60%" }} />
<div
onClick={() => this.portal.current.setOpen(false)}
style={{
  position: "fixed",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}}
/>
 */
