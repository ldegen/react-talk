const React = require("react");
const shallowCopy = require("./shallow-copy");

const withCursor = function(Base,propNames={}){
  const {
    eventsProp="events",
    cursorProp="cursor", 
    transformProp="transform",
    clickHandlerProp="onCellClicked"
  } = propNames;

  return React.createClass({

    render: function(){
      const props = shallowCopy(this.props);
      props[cursorProp] = this.state.cursor;
      props[eventsProp] = {
        onMouseMove: this.mouseMove,
        onMouseLeave: this.mouseLeave,
        onClick: this.click
      };
      return <Base {...props} />;
    },

    getInitialState: function(){return {};},

    mouseMove: function(ev){
      this.setState({cursor:this.mapPos(ev)});
    },
    mouseLeave: function(){
      this.setState({cursor:null});
    },
    click: function(){
      if(this.props[clickHandlerProp]){
        this.props[clickHandlerProp](this.state.cursor);
      }
    },
    mapPos: function(ev){
      const {top,left}=ev.currentTarget.getBoundingClientRect();
      return this.props[transformProp]
        .invert([ev.clientX-left,ev.clientY-top])
        .map(Math.floor);
    
    }
  });
};

module.exports = withCursor;

