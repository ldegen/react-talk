const React = require("react");
const ReactDOM = require("react-dom");
const App = require("./App.jsx");

ReactDOM.render(<App />, document.getElementById("app"));

// oder:
// const RcE = React.createElement;
// ReactDOM.render(RcE(App, null), document.getElementById("app"));
