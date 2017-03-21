const React = require("react");
const transform = require("./transform");
const features =[
  require("./with-cursor.jsx"),
  require("./fitting.jsx"),
  require("./responsive.jsx"),
];

const Grid = features.reduce(function(Cmp, feature){
  return feature(Cmp);
},require("./Grid.jsx"));

const {Bbox} = require("tgol");

const MainPanel = function({cells, onCellClicked}){
  return ( 
    cells
  ? <Grid 
      livingCells={cells}
      cursor={[2,3]} // TODO move cursor 
      onCellClicked={onCellClicked} //TODO use cursor to interact
      transform={transform({scale:100})} //TODO auto-fit
      bbox={new Bbox(cells)}  //TODO use bbox for auto-fit

    /> 
  : <div className="placeholder">No Data (yet)!</div>
  );
};

const ToolBar = function({commands}){
  return (
    <div className="toolbar">
    { commands.map(function(props){
        return <ToolBarButton {...props} />;
      })
    }
    </div>
  );
};

const ToolBarButton = function({icon, action, enabled=true}){
  return ( 
    <button className={"button "+(enabled?"enabled":"disabled")} 
            onClick={action} disabled={!enabled}>
      <img src={icon} />
    </button>
  );
};

const Layout = function({cells, commands, onCellClicked}){
  return (
    <div className="layout">
      <MainPanel {...{cells, onCellClicked}} />
      <ToolBar commands={commands} />
    </div>
  );
};

module.exports=Layout;
