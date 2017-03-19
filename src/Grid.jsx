const React = require("react");
const PAD=0.01;
const R=0.15;
const COLORS=["black", "white"];

  

const Cell = ({data:[x,y,z]})=>(
  <g className={"cell "+COLORS[z]} transform={"translate("+[x,y]+")"}>
    <rect x={PAD} y={PAD} width={1-2*PAD} height={1-2*PAD} rx={R} ry={R} />
  </g>
);

const Cursor = function({position}){
  return (
      position 
    ? <g className={"cursor"} transform={"translate("+position+")"}>
        <rect x={0} y={0} width={1} height={1} rx={R} ry={R} />
      </g>
    : null
  );
};

const Grid = function(props={}){
  const {
    events={},
    cursor,
    livingCells=[], 
    transform:{scale, transform}
  } = props;
  const style = {strokeWidth:(2/scale)};
  const drawCell = function([x,y,z]){
    return <Cell key={[x,y]} data={[x,y,z]}/>;
  };
  return(
    <svg {...events}>
      <rect 
        className="mouse-catcher" 
        x="0" y="0" width="10000" height="10000"/>

      <g className="canvas" transform={transform} style={style}>
        { livingCells.map(drawCell)}
        <Cursor position={cursor} />
      </g>
    </svg>
  );
};



module.exports = Grid;
