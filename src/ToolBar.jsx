const React = require("react");

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

module.exports = ToolBar;
