import React from "react";
import { createRoot } from "react-dom/client";
import createReactClass from "create-react-class";
import Basic from ".";

/*const RefFacility = () => {
  return Object.keys(this).map((x) => {
    return this[x];
  });
};*/
/*class RefFacility extends React.Component {
  render() {
    return Object.keys(this).map((x) => {
      return this[x];
    });
  }
}*/
function RefFacility() {
  return createReactClass(arguments[1], {
    ...Object.keys(arguments[0]).map((x) => {
      return { [x]: arguments[0][x] };
    })
  });
}

export default React.forwardRef((props, ref) => {
  /*const current = {
    ...["gui", "pa", "ra"].reduce((a, c) => ({ ...a, [c]: ref.current[c] }), {})
  };*/
  //return (<RefFacility {...props} />).apply(ref.current, []);
  //console.log(<RefFacility />); //https://reactjs.org/docs/react-dom.html#render
  //return createRoot(document.getElementById("facility")).render(RefFacility); //.apply(ref.current, [props.app]);
  //return RefFacility();/https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/40f16570d903680eb5841a45c25d28c1675cb2df/lib/runtime/RefreshUtils.js#L236
  //https://stackoverflow.com/a/73364839/11711280
  //document.body.appendChild(document.getElementById("facility"));
  //const App = props.app;
  //return <App {...props} {...props} />;
  /*const App = createReactClass({
    getInitialState: function () {
      return this;
    },
    //handleClick: function () {
    //this.click(); //https://reactjs.org/docs/react-without-es6.html
    //},
    render: function () {
      /*return Object.keys(this).map((x) => {
      return { [x]: this[x] };
    });* /
      const App = arguments[0];
      return <App {...this} />; //Aren't paying publishers alone allowed to prohibit certain ideas?
    }
  });*/
  //const App = props.app;
  return RefFacility(props, props.app);
  //React.createElement(App);
  //return props.app;
  //RefFacility.apply(props, [props.app]);
  /*(
    <RefFacility
      //gui={ref.current["gui"]}
      //pa={ref.current["pa"]}
      //ra={ref.current["ra"]}
      //{...props}
      ref={{
        current: {
          ...Object.keys(current).map((x) => {
            React.createRef();
            return current[x];
          })
        }
      }}
    />
  );*/
});
