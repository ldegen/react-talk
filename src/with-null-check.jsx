const React = require("react");

module.exports = function(...propNames){
  return function(Base){
    const check = function(props){
      return propNames.every(function(propName){
        const p = props[propName];
        return (typeof p !== "undefined") && p !== null;
      });
    };
    return function(props){
      return check(props) ? <Base {...props} /> : null;
    };
  };
};
