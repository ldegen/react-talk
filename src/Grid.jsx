const React = require("react");
const withNullCheck = require("./with-null-check.jsx");
const PAD=0.01;
const R=0.15;
const COLORS=["black", "white"];

  

const Cell = ({data:[x,y,z]})=>(
  <g className={"cell "+COLORS[z]} transform={"translate("+[x,y]+")"}>
    <rect x={PAD} y={PAD} 
      width={1-2*PAD} height={1-2*PAD} 
      rx={R} ry={R} />
  </g>
);

const Cursor = withNullCheck("position")(function({position}){
  return ( 
    <g className={"cursor"} transform={"translate("+position+")"}>
      <rect width={1} height={1} rx={R} ry={R} />
    </g>
  );
});

const drawCells = function(cells){
  return cells.map(function([x,y,z]){
    return <Cell key={[x,y]} data={[x,y,z]}/>;
  });
};

const Grid = function({ events={}, cursor={}, 
                        livingCells=[], transform={}}){
  const { scale=1, transform:tf=""}=transform;
  const style = {strokeWidth:(2/scale)};

  return(
    <svg {...events}>
      <rect className="mouse-catcher" width="10000" height="10000"/>
      <g className="canvas" transform={tf} style={style}>
        {drawCells(livingCells)}
        <Cursor position={cursor} />
      </g>
    </svg>
  );
};



module.exports = Grid;
