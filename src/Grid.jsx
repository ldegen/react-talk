const React = require("react");
const fit = require("./fit");
const PAD=0.01;
const R=0.15;
const COLORS=["black", "white"];



const Cell = ({x,y,color})=>(
  <g className={"cell "+color} transform={"translate("+[x,y]+")"}>
    <rect x={PAD} y={PAD} width={1-2*PAD} height={1-2*PAD} rx={R} ry={R} />
  </g>
);

const Cursor = ({x,y}) => (
  <g className={"cursor"} transform={"translate("+[x,y]+")"}>
    <rect x=0 y=0 width=1 height=1 rx={R/2} ry={R/2} />
  </g>
);

const Grid = ({bbox, livingCells, size})=>{
  const viewport = {top:25, left:25, bottom:size.height-25, right: size.width-25};
  const {scale, transform} = fit(bbox, viewport);
  const style = {strokeWidth:(2/scale)};
  return(
    <svg>
      <rect className="mouse-catcher" x="0" y="0" width="1000" height="1000" />
      <g className="canvas" transform={transform} style={style}>
        {
          livingCells.map(([x,y,z]) =>
            <Cell key={[x,y]} x={x} y={y} color={COLORS[z]}/>
          )
        }
      </g>
    </svg>
  );
};


module.exports = Grid;
