const React = require("react");
const fit = require("./fit");
const PAD=0.01;
const R=0.15;
const MARGIN=75;
const COLORS=["black", "white"];

  

const Cell = ({x,y,color})=>(
  <g className={"cell "+color} transform={"translate("+[x,y]+")"}>
    <rect x={PAD} y={PAD} width={1-2*PAD} height={1-2*PAD} rx={R} ry={R} />
  </g>
);

const Cursor = ({position}) => (
  <g className={"cursor"} transform={"translate("+position+")"}>
    <rect x={0} y={0} width={1} height={1} rx={R} ry={R} />
  </g>
);

const Grid = React.createClass({
  getInitialState: function(){return {size:{width:1,height:1}};},
  componentDidMount: function(){
    window.addEventListener("resize", this.resize);
    this.resize();
  },
  componentWillUnmount: function(){
    window.removeEventListener("resize", this.resize);
  },
  resize: function(){
    this.setState({size:this.svg.getBoundingClientRect()});
  },
  mouseMove: function(ev){
    this.setState({cursor:this.mapPos(ev)});
  },
  mouseLeave: function(){
    this.setState({cursor:null});
  },
  click: function(){
    if(this.props.onCellClicked){
      this.props.onCellClicked(this.state.cursor);
    }
  },
  viewport: function(){
    const {size} = this.state;
    return {top:MARGIN, left:MARGIN, bottom:size.height-MARGIN, right: size.width-MARGIN};
  },
  viewportTransform: function(){
    const {bbox}=this.props;
    return fit(bbox, this.viewport());
  },
  mapPos: function(ev){
    return this
      .viewportTransform()
      .invert([ev.clientX,ev.clientY])
      .map(Math.floor);
  
  },
  render: function(){
    const {livingCells} = this.props;
    const {cursor} = this.state;
    const {scale, transform} = this.viewportTransform();
    const style = {strokeWidth:(2/scale)};
    const self=this;
    return(
      <svg 
        onMouseMove={this.mouseMove} 
        onMouseLeave={this.mouseLeave} 
        onClick={this.click}
        ref={function(svg){self.svg=svg;}}
      >
        <rect className="mouse-catcher" x="0" y="0" width="10000" height="10000" />
        <g className="canvas" transform={transform} style={style}>
          {
            livingCells.map(([x,y,z]) =>
            <Cell key={[x,y]} x={x} y={y} color={COLORS[z]}/>
            )
          }
          { cursor
          ? <Cursor position={cursor} />
          : null
          }
        </g>
      </svg>
    );
  }
});


module.exports = Grid;
