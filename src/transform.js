module.exports = function({scale=1,translate=[0,0]}={}){
  const invert = function([x,y]){
    return [(x-translate[0])/scale, (y-translate[1])/scale];
  };

  return {
    invert:invert,
    scale:scale, 
    translate:translate, 
    transform:"translate("+translate+") scale("+scale+")"
  };

};
