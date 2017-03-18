const Grid = require("./Grid.jsx");
const React = require("react");
const ReactDOM = require("react-dom");
const {Pattern, Board} = require("tgol");

const board = Board([ 
  "o|_|_|",
  "_|*|_|",
  "_|*|_|",
  "_|o|_|",
  "_|o|_|",
  "_|_|*|"
].join("\n"));
    
const render = function(){
  const size = document.querySelector("#grid").getBoundingClientRect();
  ReactDOM.render(
    <Grid bbox={board.bbox()} size={size} livingCells={board.livingCells()}/>,
    document.getElementById('grid')
  );
}
window.onresize=function(){
  render();
};
render();
