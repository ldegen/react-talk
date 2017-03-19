
const Grid = require("./Grid.jsx");
const React = require("react");
const ReactDOM = require("react-dom");
const {Pattern, Board, Bbox} = require("tgol");
const Promise = require("bluebird");
const request = Promise.promisify(require("request"));
const identity = function(x){return x};
const constant = function(x){return function(){return x;};};
const get = function(prop){return function(obj){return obj[prop];};};
const undoable = function(spec){
  const update = (
    typeof spec === "function"
  ? spec
  : typeof spec === "undefined"
  ? identity
  : constant(spec)
  );
  return function(state){
    const newState = update(state);
    newState.redo=[];
    newState.cells = newState.cells || state.cells;
    newState.undo= (
      state.cells 
    ? [newState.cells].concat(state.undo)
    : state.undo
    );
    return newState;
  };
};
const App = React.createClass({
  getInitialState:function(){
    return {
      cells:null,
      undo:[],
      redo:[],
      intervalId: null
    }
  },
  boardLoaded: function(board){
    this.setState(undoable({cells:board.livingCells()}));
  },
  play: function(){
    const id=setInterval(this.autoStep, 200);
    this.setState(undoable({intervalId:id}));
  },
  stop: function(){
    this.setState(undoable(function({intervalId}){
      clearInterval(intervalId);
      return {intervalId:null};
    }));
  },
  autoStep: function(){
    this.setState(function({cells}){
      return Board(cells).next().livingCells();
    });
  },
  manualStep: function(){
    this.setState(undoable(function({cells}){
      return Board(cells).next().livingCells();
    }));
  },
  cellClicked: function([x,y]){
    this.setState(function({cells}){
      return {
        cells: Board(cells).cycle(x,y).livingCells()
      };
    });
  },
  undo: function(){
    this.setState(function({undo,cells,redo}){
      const top=undo[0];
      if(!top){
        return {};
      }
      return {
        cells: top,
        undo: undo.slice(1),
        redo: [cells].concat(redo)
      };
    });
  },
  redo: function(){
    this.setState(function({undo,cells,redo}){
      const top=redo[0];
      if(!top){
        return {};
      }
      return {
        cells: top,
        undo: [cells].concat(undo),
        redo: redo.slice(1)
      };
    });
  },
  componentDidMount:function(){
    request(location.origin+"/board.txt")
      .then(get("body"))
      .then(Board)
      .then(this.boardLoaded)
  },
  render:function(){
    const {cells} = this.state;
    return ( 
      cells
    ? <Grid 
        bbox={new Bbox(cells)} 
        livingCells={cells}
        onCellClicked={this.cellClicked}
      /> 
    : <div className="placeholder">No Data (yet)!</div>
    );

  }
    
});

module.exports = App;
