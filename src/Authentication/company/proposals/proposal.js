import React from "react";
import "react-datepicker/dist/react-datepicker.css";

import firebase from "../.././init-firebase.js";
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
import { standardCatch } from "../../Sudo.js";

//collective action does not limit non-respondents
//same spending withot the Affont
class Price extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cost: props.proposal.cost
    };
  }
  render() {
    const { proposal } = this.props;
    return (
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: "0px",
          borderRadius: "8px",
          borderBottomRightRadius: "0px",
          padding: "10px",
          paddingBottom: "0px",
          backgroundColor: "rgb(0,0,20)",
          width: "max-content",
          textAlign: "left"
        }}
      >
        <span
          onClick={() =>
            this.props.isAdmin &&
            this.setState({ changeCost: !this.state.changeCost })
          }
          style={{
            WebkitTextStroke: ".3px black",
            color: "rgb(20,140,80)",
            backgroundColor: "rgb(175, 140, 90)"
          }}
        >
          $
        </span>
        {!this.state.changeCost ? (
          <div
            style={{ color: "white" }}
            onClick={() =>
              this.props.isAdmin && this.setState({ changeCost: true })
            }
          >
            {proposal.cost}
          </div>
        ) : (
          this.props.isAdmin && (
            <form
              onSubmit={(w) => {
                w.preventDefault();
                if (this.state.cost === "")
                  return this.setState({ changeCost: false });
                const answer = window.confirm(
                  "the cost for " +
                    proposal.name +
                    " is " +
                    this.state.cost +
                    "?"
                );
                answer &&
                  updateDoc(doc(firestore, "proposals", proposal.id), {
                    cost: this.state.cost
                  });
                this.setState({ changeCost: false });
              }}
            >
              <input
                maxLength={8}
                type="number"
                style={{ width: "100%", maxWidth: "50px" }}
                value={this.state.cost}
                placeholder="cost"
                //defaultValue={this.state.cost}
                id="cost"
                onChange={(proposal) =>
                  this.setState({
                    [proposal.target.id]: proposal.target.value.slice(
                      0,
                      proposal.target.maxLength
                    )
                  })
                }
              />
            </form>
          )
        )}
      </div>
    );
  }
}
const firestore = getFirestore(firebase);
class Proposal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      willCall: props.proposal.willCall,
      author: { name: "" },
      newRequest: { name: "" },
      fetchingComments: null
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
    const { proposal } = this.props;
    proposal &&
      onSnapshot(
        doc(
          firestore,
          "users",
          proposal.authorId //CompanyId.split("/" + proposal.companyId)[0]
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
    if (prevProps.proposal !== this.props.proposal) {
      this.setState({ changed: true }, () => {
        console.log("changed");
        this.setState({ changed: false });
      });
    }
  };*/
  render() {
    const { proposal, i } = this.props;
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
        proposalId: proposal.id

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
      proposal.authorId === this.props.auth.uid; //CompanyId + "/" + this.props.company.id;
    if (!proposal.willCall || !proposal.paidAt) {
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
    const daysSpent = !proposal.paidAt
      ? 0
      : (new Date().getTime() / 1000 - proposal.paidAt) / 86400;
    const daysLeft = (proposal.willCall - new Date().getTime() / 1000) / 86400;
    const longer = Math.max(daysSpent, daysLeft);
    //this.props.newlymodified && console.log(proposal.name);
    var tone =
      250 - 250 * ((proposal.willCall - new Date().getTime() / 1000) / 5260000);
    tone = Math.min(tone, 160);
    tone = Math.max(tone, 20);
    //console.log(proposal.willCall);
    return (
      <div
        style={{
          position: "relative",
          backgroundColor: this.props.newlymodified ? "rgba(0,0,20,.6)" : "",
          width: "min-content",
          minWidth: "170px",
          opacity:
            !this.props.details || this.props.details === proposal.id ? 1 : 0.8,
          transition: `${
            this.props.details !== proposal.id && !this.props.newlymodified
              ? 2.5
              : 0
          }s ease-in`
        }}
      >
        <Price proposal={proposal} isAdmin={this.props.isAdmin} />
        {this.props.isAdmin && (
          <div
            style={{
              borderTop: "1px solid",

              padding: "5px",
              color: "black",
              left: "0px",
              width: "max-content",
              position: "relative",
              textAlign: "left" //an NBER recession is an efficient labor market (less work more expense)
              //proof of admission
              //Does the natural marginal affectation on revenue not depend on budget constraints of the individual or otherwise a non-expiring and competitive commodity collective?
            }}
          >
            {this.state.author.username}
          </div>
        )}
        <div style={{ width: "100%", display: "flex" }}>
          <span
            onClick={() => {
              /*this.setState({
                openDatePickerToggler: !this.state.openDatePickerToggler
              })*/
              if (
                this.props.company.authorId === this.props.auth.uid ||
                (this.props.company.admin &&
                  this.props.company.admin.includes(this.props.auth.uid))
              ) {
                this.props.portal.current.setOpen(true);
                this.props.setProposalDetail({
                  proposal
                });
              }
            }}
            style={{
              top: "-4px",
              userSelect: "none",
              padding: "0px 8px",
              left: "-3px",
              //position: "absolute",
              display: "block",
              backgroundColor: `rgb(${tone + 20},${tone + 40},${tone + 90})`
            }}
          >
            <span style={{ fontSize: "9px" }}>
              {monthsnamlist[new Date(proposal.willCall * 1000).getMonth()]}
            </span>
            <br />
            {new Date(proposal.willCall * 1000).getDate()}
          </span>
          <div
            style={{
              width: "100%",
              position: "relative"
            }}
          >
            {this.props.isAdmin && (
              <div
                style={{
                  padding: "10px",
                  top: "10px",
                  display: "flex",
                  left: "0px",
                  position: "absolute",
                  textAlign: "right" //an NBER recession is an efficient labor market (less work more expense)
                  //proof of admission
                }}
              >
                {!proposal.account ? (
                  "accept^--"
                ) : this.state.addAccount ? (
                  this.props.isAdmin &&
                  proposal.willCall !== 0 && (
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
                          updateDoc(doc(firestore, "proposals", proposal.id), {
                            account: this.state.newAccount
                          });
                        this.setState({ changeAccount: false });
                      }}
                    >
                      <input
                        style={{ width: "100%", maxWidth: "80px" }}
                        state={this.state.newAccount}
                        placeholder="vendor type"
                        id="newAccount"
                        onChange={(
                          proposal //mouse leave == blur mobile
                        ) =>
                          this.setState({
                            [proposal.target.id]: proposal.target.value
                          })
                        }
                      />
                    </form>
                  )
                ) : !this.state.changeAccount ? (
                  <div onClick={() => this.setState({ changeAccount: true })}>
                    :{proposal.account}
                  </div>
                ) : (
                  <div>
                    {this.props.company.chartOfAccounts &&
                      this.props.company.chartOfAccounts.length > 0 && (
                        <select
                          value={proposal.account}
                          style={{ width: "100%" }}
                          onBlur={() => this.setState({ changeAccount: false })}
                          onChange={(w) => {
                            w.preventDefault();
                            const select = w.target;
                            const id = select.children[select.selectedIndex].id;
                            const answer = window.confirm(
                              "the account for " +
                                proposal.name +
                                " is " +
                                id +
                                "?"
                            );
                            answer &&
                              updateDoc(
                                doc(firestore, "proposals", proposal.id),
                                {
                                  account: id
                                }
                              );
                            this.setState({ changeAccount: false });
                          }}
                        >
                          {this.props.company.chartOfAccounts.map(
                            (proposal) => (
                              <option id={proposal} key={"account" + proposal}>
                                {proposal}
                              </option>
                            )
                          )}
                        </select>
                      )}
                    {/*this.state.openDatePickerToggler &&<div
                      onClick={() =>
                        this.setState({
                          proposal: !this.state.proposal
                        })
                      }
                    >
                      {this.props.makeFancy(new Date(proposal.willCall * 1000))}
                    </div>*/}
                  </div>
                )}
                <div
                  onClick={() =>
                    this.setState({ addAccount: !this.state.addAccount })
                  }
                  style={{ cursor: "pointer", padding: "0px 10px" }}
                >
                  {this.state.addAccount ? "-" : "+"}
                </div>
              </div>
            )}{" "}
            {/**--- */}
            <span style={{ display: "flex" }}>
              {/**++ */}
              <div className="ticker-tape">
                <div className="ticker-tape-collection">
                  {i + 1}. {proposal.name}{" "}
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
                    this.props.isAdmin && proposal.willCall
                      ? proposal.paidAt
                        ? "cornflowerblue"
                        : "rgb(175, 140, 90)"
                      : "tan"
                }}
                onClick={(w) => {
                  if (!this.props.isAdmin) {
                    if (
                      proposal.authorId === this.props.auth.uid &&
                      !proposal.paidAt
                    ) {
                      var answer = window.confirm(
                        "Would you like to cancel " + proposal.name + "?"
                      );
                      if (answer) {
                        this.setState({ confirmDelete: true });
                      }
                    }
                    return null;
                  }
                  /*!this.props.isAdmin
                  ? this.setState({
                      tempNameChange: true
                    })
                  : */ proposal.paidAt
                    ? window.confirm("is this not paid?") &&
                      updateDoc(doc(firestore, "proposals", proposal.id), {
                        paidAt: deleteField(),
                        willCall: 0
                      })
                    : !this.props.proposal || !this.props.proposal.willCall
                    ? window.confirm(
                        "estimate when this job will be completed"
                      ) &&
                      this.props.setProposalDetail(
                        { proposal: proposal, willCall: 0 },
                        () => this.props.portal.current.setOpen(true)
                      )
                    : window.confirm("mark as paid?") &&
                      updateDoc(doc(firestore, "proposals", proposal.id), {
                        paidAt: new Date().getTime() / 1000
                        //willCall: new Date(this.props.proposal.willCall).getTime() / 1000
                      });
                }}
              >
                {proposal.paidAt ? (
                  "X"
                ) : proposal.willCall ? (
                  <span role="img" aria-label="clock">
                    &#8986;
                  </span>
                ) : (
                  "O"
                )}
              </span>
            </span>
          </div>
        </div>

        {this.state.confirmDelete && (
          <form
            style={{ display: "flex" }}
            onSubmit={(e) => {
              e.preventDefault();
              if (this.state.confirmDelete === "delete") {
                deleteDoc(doc(firestore, "proposals", proposal.id));
              }
            }}
          >
            <input
              placeholder="delete"
              onChange={(e) => {
                this.setState({ confirmDelete: e.target.value });
              }}
            />
            <div
              onClick={() => this.setState({ confirmDelete: false })}
              style={{ padding: "10px" }}
            >
              &times;
            </div>
          </form>
        )}
        {proposal.willCall !== 0 && (
          <div
            style={{
              height: "26px",
              position: "relative",
              width: `100%`
            }}
          >
            <div
              style={{
                fontSize: "8px",
                //border: "2px solid",
                position: "absolute",
                height: "10px",
                width: "100%"
              }}
            >
              {
                //Math.round(daysLeft, 2)} days left
              }
            </div>
            {/**get to the choppa euh i love it when yu talk like that (mark as unpaid?????) */}
            <div
              style={{
                fontSize: "8px",
                border: "2px solid transparent",
                height: "10px",
                backgroundColor: "rgb(50,100,230)",
                width: `calc(100% * ${daysLeft / longer} - 4px)`
              }}
            />

            <div style={{ position: "relative" }}>
              <div
                style={{
                  fontSize: "8px",
                  //border: "2px solid",
                  position: "absolute",
                  height: "10px",
                  width: "100%"
                }}
              >
                {
                  //Math.round(daysSpent, 2)} days spent
                }
              </div>
            </div>
            <div
              style={{
                border: "2px solid transparent",
                height: "10px",
                backgroundColor: "rgb(30,50,80)",
                width: `calc(100% * ${daysSpent / longer} - 4px)`
              }}
            />
          </div>
        )}
        <div
          style={{
            backgroundColor: "rgba(40,40,40,.3)",
            //color: "rgb(140,210,190)",
            width: "100%",
            position: "relative"
          }}
        >
          {!proposal.paidAt && (
            <div style={{ position: "absolute" }}>
              .
              {this.state.fetchingComments !== null && (
                <span>.{!this.state.fetchingComments && <span>.</span>}</span>
              )}
            </div>
          )}
          {proposal.paidAt ? (
            <span style={{ fontSize: "12px" }}>
              {Math.round(daysLeft, 2)} days left: {Math.round(daysSpent, 2)}{" "}
              days spent
            </span>
          ) : (
            <span style={{ fontSize: "12px" }}>
              {this.props.isAdmin ? "your " : "in "}review
            </span>
          )}
          <span
            onClick={() => {
              /*this.immediateStyle[ "details" + num].current.style.zIndex = this.state["details" + proposal.id]
              ? -99: 0;this.immediateStyle["details" + num ].current.style.position = this.state[
              "details" + proposal.id]? "fixed" : "relative";this.immediateStyle["details" + num
            ].current.style.transition = `${this.state["details" + proposal.id] ? 0.3 : 0 }s ease-in`;*/
              this.props.setProposalDetail(
                {
                  //["details" + proposal.id]: !this.state["details" + proposal.id]
                  details: this.props.details !== proposal.id && proposal.id
                } /*,() => { this.immediateStyle[ "details" + num].current.style.transition = `${
                  this.state["details" + proposal.id] ? 0 : 3}s ease-in`;}*/
              );
            }}
            style={{
              zIndex: "1",
              border: "1px solid",
              fontSize: "12px",
              position: "absolute",
              right: "0px",
              transition: ".2s ease-in",
              transform: `rotate(${
                this.props.details !== proposal.id ? 270 : 180
              }deg)`
            }}
          >
            &#9650;
          </span>
        </div>
        {/*<div
          style={{
            overflow: "hidden",
            height: "0px",
            width: "0px",
            position: "relative",
            zIndex: this.state.proposal ? "1" : "-10"
          }}
        >
          {/*&& !proposal.willCall*/
        /*|| this.state.proposal* /}{" "}
          {
            //this.props.details === proposal.id && (
            <ReactDatePicker
              ref={this.props.portal}
              placeholderText="Will Call"
              selected={proposal.willCall ? proposal.willCall * 1000 : this.props.willCall}
              onCalendarClose={() => this.setState({ proposal: null })}
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
                        proposal.cost +
                        "?"
                    );
                    answer &&
                      updateDoc(doc(firestore, "proposals", proposal.id), {
                        willCall: new Date(date).getTime() / 1000
                      }).then((proposal) => this.setState({ proposal: null }));
                  }
                );
              }}
              withPortal //portalId="root-portal"
            />
          }
        </div>*/}
        <div
          //ref={this.immediateStyle["details" + num]}
          style={{
            /*transition: `${
                this.state["details" + proposal.id] ? 0.3 : 0
            }s ease-in`,*/
            transition: ".1s ease-in",
            /*height: this.state["details" + proposal.id]
              ? "min-content"
              : "0px",*/
            //overflow: this.state["details" + proposal.id] ? "" : "hidden"
            position:
              /*proposal.paidAt || */ this.props.details === proposal.id
                ? "relative"
                : "fixed",
            //position: "fixed",
            opacity:
              /*proposal.paidAt || */ this.props.details === proposal.id
                ? 1
                : 0,
            zIndex:
              /*proposal.paidAt || */ this.props.details === proposal.id
                ? 0
                : -99
            //zIndex: -99
          }}
        >
          {/*<hr style={{ width: "100%" }} />*/}
          {isCustomer && !proposal.paidAt && (
            <div style={{ display: "flex", position: "relative" }}>
              <div
                onClick={() =>
                  this.setState({
                    tempRequest: !this.state.tempRequest
                  })
                }
                id="new proposal"
                onMouseEnter={(proposal) =>
                  this.setState({ hovering: proposal.target.id })
                }
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
                {this.state["requirementCount" + proposal.id]
                  ? this.state["requirementCount" + proposal.id]
                  : 0}{" "}
                requirements
                {(!this.state["requirementCount" + proposal.id] ||
                  this.state["requirementCount" + proposal.id] === 0) &&
                  " yet"}
              </div>
            </div>
          )}

          {isCustomer && this.state.tempRequest ? (
            <form
              onSubmit={(proposal) => {
                proposal.preventDefault();
                newRequest();
              }}
            >
              <input
                required={true}
                minLength={2}
                state={this.state.newRequest.name}
                placeholder="name"
                id="name"
                onChange={(proposal) =>
                  this.setState({
                    newRequest: { [proposal.target.id]: proposal.target.value }
                  })
                }
                autocomplete="off"
              />
            </form>
          ) : (
            <Requirements
              setBoard={(requirements) => {
                this.setState({
                  ["requirementCount" + proposal.id]: requirements.length
                });
              }}
              company={this.props.company}
              proposal={proposal}
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
  /*this.props.isAdmin || * / proposal.paidAt ? (
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
