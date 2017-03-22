//... because: there *ARE* no classes in Javascript. Period.
const StatefulGrid = React.createClass({

  render: function(){
    <svg 
      onMouseMove={this.mouseMove}
      onMouseLeave={this.mouseLeave}
      >

      {drawCells(this.props.livingCells)}
      //... etc.
      
      //... and finally: render the cursor
      <Cursor position={this.state.cursor} />
    </svg>
  },


  getInitialState: function(){
    return {cursor:null};
  },
  mouseMove: function(ev){
    this.setState({cursor: mapPos(ev)});
  },
  mouseLeave: function(){
    this.setState({cursor:null});
  }
});
