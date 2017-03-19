const fit = require("./fit.js");
const shallowCopy = require("./shallow-copy");
const React = require("react");
const MARGIN=75;

const viewport = function(size){
  return {
    top:MARGIN, 
    left:MARGIN, 
    bottom:size.height-MARGIN, 
    right: size.width-MARGIN
  };
};

const viewportTransform = function(bbox, size){
  return fit(bbox, viewport(size));
};

const fitting = function(Base,propNames={}){
  const {
    sizeProp="size", 
    bboxProp="bbox",
    transformProp="transform"
  } = propNames;

  return function(props0){
    const props = shallowCopy(props0);
    const size = props0[sizeProp];
    const bbox = props0[bboxProp];
    props[transformProp] = viewportTransform(bbox,size);
    return (<Base {...props} />);
  };
};

module.exports = fitting;
