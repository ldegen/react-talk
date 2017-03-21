const React = require("react");
const {Bbox} = require("tgol");

module.exports = function(getPoints){
  return function(Base){
    return function(props){
      return <Base bbox={new Bbox(getPoints(props))} {...props} />;
    };
  };
};
