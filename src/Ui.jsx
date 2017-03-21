const React = require("react");
const ToolBar = require("./ToolBar.jsx");
const transform = require("./transform");
const {Bbox} = require("tgol");
const get = (prop)=>(obj)=>obj[prop];
const points = get("livingCells");

const features =[
 // require("./with-cursor.jsx"),
  require("./fitting.jsx"),
  require("./responsive.jsx"),
  require("./with-bbox.jsx")(points),
  require("./with-null-check.jsx")("livingCells"),
];

const Grid = features.reduce(function(Cmp, feature){
  return feature(Cmp);
},require("./Grid.jsx"));


const Ui = function({cells, commands, onCellClicked}){
  return (
    <div className="layout">
      <ToolBar commands={commands} />
      <Grid 
        livingCells={cells}
        cursor={[2,3]} 
        onCellClicked={onCellClicked} 
      /> 
    </div>
  );

// bzw:
//
// RcE("div", { className: "layout" },
//   RcE(Grid, {
//     livingCells: cells,
//     cursor: [2, 3],
//     onCellClicked: onCellClicked
//   }),
//   RcE(ToolBar, { commands: commands })
// );
};

module.exports=Ui;
