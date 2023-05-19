import React from "react";
import Cable from "./Dropwire.js";
import { handleScollImgError } from "./Authentication/Sudo";
import Authentication from "./Authentication/index.js";

class Frame extends React.Component {
  constructor(props) {
    super(props);
    const { paths, l, n } = this.props;
    //ref={this.props.fwd}
    const init = {
      p: "/" + paths["*"], //"everyone in order to be for the people that use it. who decides?"
      l,
      n
    };
    this.state = { sudo: false, ...init };
    this.henri = React.createRef();
  }

  componentDidMount = () => {
    this.assumepath();
  };
  assumepath = () => {
    if (!["/"].includes(this.state.p)) {
      this.setState({ sudo: false });
      // trigger = true;
    }
  };
  componentDidUpdate = (prevProps) => {
    const { paths, l, n } = this.props;
    if (paths !== prevProps.paths) {
      this.setState({
        p: "/" + paths["*"],
        l,
        n
      });
    }
  };
  render() {
    const { p: pathname, l: location, n } = this.state;
    const sp =
      location.state &&
      location.state.statePathname &&
      location.state.statePathname;
    //const {} = this.state;
    //console.log(this.state.username);
    //const space = " ";
    const setting = (n, more) => {
      return {
        style: {
          color: this.state["hoverin" + n] ? "rgb(50,70,90)" : "black",
          cursor: "pointer",
          ...more
        },
        onMouseEnter: () => this.setState({ ["hoverin" + n]: true }),
        onMouseLeave: () => this.setState({ ["hoverin" + n]: false })
      };
    };
    const setting2 = (n, more) => {
      return {
        style: {
          color: this.state["hoverin" + n]
            ? "rgb(80,100,120)"
            : "rgb(50,70,90)",
          cursor: "pointer",
          ...more
        },
        onMouseEnter: () => this.setState({ ["hoverin" + n]: true }),
        onMouseLeave: () => this.setState({ ["hoverin" + n]: false })
      };
    };
    const space = " ";
    return (
      <div
        style={{
          //I named my squirrel
          transition: ".3s ease-in",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          //justifyContent: this.state.emulateRoot ? "start" : "space-around",
          maxheight: "min-content",
          height: "calc(100vh - 20px)",
          fontFamily: "sans-serif",
          textAlign: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            position: "relative",
            top: "0px",
            marginTop: "30px"
          }}
        >
          <div
            style={{
              display: !this.state.emulateRoot ? "block" : "none",
              bottom: "80px",
              left: "0px",
              width: "200px",
              position: "fixed"
            }}
          >
            <div
              style={{
                display: "block",
                maxWidth: "calc(100% - 80px)",
                maxHeight: this.props.height,
                width: "400px",
                bottom: "5px",
                right: "5px",
                position: "fixed",
                backgroundColor: "rgba(250,250,250,.6)"
                /**
             * By week or by unit parts. Only authorize spending by labor scheduling
          after material. Only authorize spending by week or unit part estimate
          appraisal proposals to bid labor scheduling after material
          acquisitions.
             * 
             */
              }}
            >
              Authorize spending projects by week to bid labor scheduling after
              material-procurement acquisitions.
            </div>
            <a href="https://docs.google.com/document/d/1oGrjzaNlltUsq3Qw950yigpNPLRspbIlBRl-nz2PVP0/edit?usp=sharing">
              <Cable
                style={{
                  boxShadow: "0px 0px 0px 0px transparent",
                  width: "100px",
                  transform: "scale(-1,1)"
                }}
                onError={handleScollImgError}
                img={true}
                src={
                  this.state.noyoutube
                    ? ""
                    : "https://www.dropbox.com/s/zgceu1uen2ov9n1/transparentSaverAcorn.png?raw=1"
                }
                float={null}
                title="author"
                scrolling={this.state.scrolling}
                fwd={this.henri}
                scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
                scrollTop={!this.state.oldecon ? 0 : this.state.scrollTop}
              />
            </a>
            {/*}
            <h3>"Help! I need user testers!</h3>
            <h4>- our technological guild mascot simon henri</h4>*/}
          </div>

          {window.location.href.includes("https://scopes.cc/") ? (
            <a
              {...setting(8, {
                textDecoration: "none",
                position: "fixed",
                right: "30px",
                top: "40px"
              })}
              href="https://employee.scopes.cc"
            >
              &diams;
            </a>
          ) : (
            <div
              {...setting(8, {
                textDecoration: "none",
                position: "fixed",
                right: "30px",
                top: "40px"
              })}
              onClick={() =>
                this.setState({
                  viewCompany: null,
                  //sudo: !this.state.sudo
                  emulateRoot: !this.state.emulateRoot
                })
              }
            >
              &diams;
            </div>
          )}
          <div
            //onClick={() => this.setState({ morewhy: !this.state.morewhy })}
            {...setting(20, {
              textAlign: "left",
              color: "white",
              textDecoration: "none",
              position: "fixed",
              right: "30px",
              top: "80px"
            })}
          >
            {/*!this.state["hoverin" + 20] ? (
              <div>
                what?
                <br />
                <a href="https://www.quora.com/What-is-a-negative-supply-curve-in-economics/answer/Nick-Carducci">
                  Contractor
                </a>
                {space}
                value cards
                <Cable
                  style={{
                    boxShadow: "0px 0px 0px 0px transparent",
                    width: "calc(100% - 20px)",
                    maxWidth: "300px"
                  }}
                  onError={handleScollImgError}
                  img={true}
                  src={
                    this.state.noyoutube
                      ? ""
                      : "https://www.dropbox.com/s/hm3xsgi8huiob4v/Negative%20supply.png?raw=1"
                  }
                  float={null}
                  title="author"
                  scrolling={this.state.scrolling}
                  fwd={this.henri}
                  scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
                  scrollTop={!this.state.oldecon ? 0 : this.state.scrollTop}
                />
              </div>
            ) : (
              <div
                style={{
                  padding: "30px 0px",
                  transform: "translateY(-30px)",
                  maxWidth: "200px"
                }}
              >
                <a href="https://law.stackexchange.com/questions/83265/requirement-of-deposit-for-obligatory-claim-in-contract-prima-facie">
                  Wouldn’t
                </a>{" "}
                a permit be the only majeured novation for the requirements and
                not the of party claims? surrendering the public good will by
                expiring commodity (Electronic Funds{" "}
                <a href="https://saltbank.org">Transfer</a>) or exclusion for
                what appointment or commodity I can recover in rent,{" "}
                <a href="https://courttechnology.quora.com/Why-cant-a-person-who-doesnt-have-a-license-to-practice-law-give-out-legal-advice-1">
                  insurance
                </a>
                , or debt
              </div>
              )*/}
          </div>

          <div
            onClick={() => this.setState({ morewhy: !this.state.morewhy })}
            {...setting(30, {
              display: "none",
              backgroundColor:
                this.state["hoverin" + 30] && "rgba(20,20,50,.6)",
              textAlign: "left",
              color: "white",
              textDecoration: "none",
              position: "fixed",
              left: !this.state["hoverin" + 30] ? "20px" : "0px",
              bottom: "5px"
              //top: "calc(100% - 70px)"
            })}
            //onMouseEnter={() => this.setState({ hvr: true })} "not the  cost, it is the price, this price is risk of something,"
            //"asset is only worth something pay for it, input costs matter." we are talking about normal things "saliency [of real]"
            //Why do psychiatrists change medications for their patients? Aren't they all guessing and checking? Why can’t patients quit their services once they try them?
            //Has homelessness and involuntary residences increased while poverty has decreased because they weren’t medicated?
          >
            {!this.state["hoverin" + 30] && !this.state["hoverin" + 20] ? (
              ""
            ) : (
              <div style={{ padding: "30px 0px" }}>
                +
                <div>
                  expiring padrone overtime change order: escrow{" "}
                  <a
                    style={{ color: "lightskyblue" }}
                    href="https://commie.dev"
                  >
                    par
                  </a>{" "}
                  <span
                    style={{
                      color: "rgb(200,200,240)"
                    }}
                  >
                    Isn’t{" "}
                    <a
                      style={{ color: "lightskyblue" }}
                      href="https://realvelocity.asia"
                    >
                      dynam
                      <span style={{ textDecoration: "line-through" }}>e</span>
                      ism
                    </a>{" "}
                    just as much about renaming nature as it is, luxury? Isn’t
                    yesterday’s inflation this week’s growth other than
                    dynamically-renaming the charted account?
                  </span>
                </div>
              </div>
            )}
            why?
          </div>
          <div
            {...setting(8, {
              display: !this.state.emulateRoot ? "block" : "none",
              textAlign: "left",
              padding: "6px 4px",
              color: "white",
              textDecoration: "none",
              position: "fixed",
              left: "30px",
              top: "40px"
            })}
          >
            <span
              style={{
                top: "-20px",
                userSelect: "none",
                margin: "3px",
                padding: "0px 8px",
                left: "0px",
                position: "absolute",
                display: "block",
                borderRadius: "10px",
                border: "1px solid"
              }}
            >
              <span style={{ fontSize: "9px" }}>
                {
                  [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                  ][new Date().getMonth()]
                }
              </span>
              <br />
              {new Date().getDate()}
            </span>
            <br />
            <a
              {...setting(8, {
                color: "white",
                textDecoration: "none"
              })}
              href="https://vaults.biz/party"
            >
              vaults.biz
            </a>

            {this.state.morewhy && (
              <div
                style={{
                  width: "max-content",
                  maxWidth: `${this.props.width - 100}px`,
                  boxShadow: "-4px -4px 1px 1px rgb(240,130,190)",
                  padding: "6px 4px",
                  left: this.props.width < 400 ? "30px" : "0px",
                  top: "40px",
                  backgroundColor: "rgb(30,30,90)",
                  borderRadius: "10px",
                  textAlign: "left",
                  color: "white",
                  textDecoration: "none",
                  position: "relative"
                }}
              >
                <h5>Scopebook is a review system & your</h5>
                <h4>personal-contract, escrow-steward,</h4>

                <br style={{ fontSize: "5px" }} />
                <div
                  style={{
                    fontSize:
                      "12px" /*, inlineSize: "100%" politics routes not law that discount*/
                  }}
                >
                  away from{" "}
                  <a
                    style={{
                      color: "white",
                      textDecoration: "line-through"
                    }}
                    href="https://thirdpartybeneficiary.quora.com"
                  >
                    third party donee beneficiaries
                  </a>{" "}
                  <span style={{ color: "rgb(200,200,200)" }}>borne of</span>{" "}
                  change-excluded-exchange{" "}
                  <span style={{ color: "rgb(200,200,200)" }}>due by</span>{" "}
                  <a
                    style={{
                      color: "white",
                      textDecoration: "line-through"
                    }}
                    href="https://commie.dev"
                  >
                    overtime implied change order(s)
                  </a>
                  . We care about the buyer and the labor,{" "}
                  <i style={{ color: "darkturquoise" }}>
                    including the contractor
                  </i>
                  .
                  <br />
                  <a
                    style={{
                      color: "cornflowerblue"
                    }}
                    href="https://www.quora.com/unanswered/Aren-t-quality-indemnity-rights-the-cause-of-consumer-protection-fraud-cases-over-reckless-estimates-instead-of-merely-returning-the-partial-product-or-escrow-if-not-yet-dispensed"
                  >
                    Aren’t 'quality indemnity rights' the cause of consumer
                    protection fraud cases over{" "}
                    <span
                      style={{
                        color: "cornflowerblue"
                      }}
                    >
                      reckless estimates
                    </span>{" "}
                    instead of merely returning the partial product (or escrow,
                    if not yet dispensed)?
                  </a>
                </div>
              </div>
            )}
          </div>
          <Authentication
            hoverin30={this.state["hoverin" + 30]}
            sudo={this.state.sudo}
            onroot={this.state.emulateRoot}
            onscroll={this.props.onscroll}
            lastPath={this.props.lastPathname}
            pathname={pathname}
            history={location.history}
            emulateRoot={() =>
              this.setState({
                emulateRoot: !this.state.emulateRoot
              })
            }
            setSudo={() => this.setState({ sudo: false })}
          />
        </div>
        <div
          style={{
            position: "fixed",
            //alignSelf: "start",
            bottom: "3px",
            right: "5px"
          }}
        ></div>
      </div>
    );
  }
}

export default Frame;
