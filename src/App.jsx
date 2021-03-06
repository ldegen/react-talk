const Ui = require("./Ui.jsx");
const React = require("react");
const ReactDOM = require("react-dom");
const {Pattern, Board, Bbox} = require("tgol");
const Promise = require("bluebird");
const request = Promise.promisify(require("request"));
const identity = function(x){return x};
const constant = function(x){return function(){return x;};};
const get = function(prop){return function(obj){return obj[prop];};};

const stringify = function(cells){
  return Board(cells).asciiArt();
};

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
    ? [state.cells].concat(state.undo)
    : state.undo
    );
    return newState;
  };
};

const App = React.createClass({
  getInitialState:function(){
    return {
      cells:undefined,
      undo:[],
      redo:[],
      intervalId: undefined
    }
  },
  boardLoaded: function(board){
    this.setState(undoable({cells:board.livingCells()}));
  },
  play: function(){
    const id=setInterval(this.autoStep, 34);
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
      return {cells: Board(cells).next().livingCells()};
    });
  },
  step: function(){
    this.setState(undoable(function({cells}){
      return {cells: Board(cells).next().livingCells()};
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
  undoEnabled: function(){
    return this.state.undo.length > 0;
  },
  redoEnabled: function(){
    return this.state.redo.length > 0;
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
  createCommand: function(key){
    const enabledProp = key+"Enabled";
    const enabled = this.hasOwnProperty(enabledProp) ? this[enabledProp]() : true;
    return {
      key:key,
      action:this[key],
      icon: "/images/"+key+".svg",
      enabled: enabled
    };
  },
  createCommands: function(){
    return [
      (this.state.intervalId ? "stop" : "play"),
      "step", 
      "undo",
      "redo"
    ].map(this. createCommand);
  },
  render:function(){
    const {cells} = this.state;
    const onCellClicked = this.cellClicked;
    const commands = this.createCommands();

    return (<Ui {...{commands, cells, onCellClicked}} />);
   
    // bzw:
    // return <Ui commands={commands} cells={cells} ...usw... />
    // bzw:
    // return RcE(Ui, { commands, cells, onCellClicked });
  }
    
});

module.exports = App;
