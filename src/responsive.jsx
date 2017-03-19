
const React = require("react");
const shallowCopy = require("./shallow-copy");
const style = {
  position: "relative",
  top: "0px",
  left: "0px",
  width: "100%",
  height: "100%",
  boxSizing: "border-box"
};

const responsive = function(BaseComponent, {prop="size"}={}){
  return React.createClass({

    getInitialState: function(){
      return {size:{width:1,height:1}};
    },

    componentDidMount: function(){
      window.addEventListener("resize", this.resize);
      this.resize();
    },

    componentWillUnmount: function(){
      window.removeEventListener("resize", this.resize);
    },

    resize: function(){
      this.setState({size:this.div.getBoundingClientRect()});
    },

    setDiv: function(div){
      this.div=div;
    },

    render: function(){
      const props = shallowCopy(this.props);
      props[prop] = this.state.size;
      return ( 
        <div ref={this.setDiv} style={style}>
          <BaseComponent {... props} />      
        </div>
      );
    }
  });  
};

module.exports = responsive;
