module.exports = function(obj){
  return Object
    .keys(obj)
    .reduce(function(copy,key){
       copy[key]=obj[key];
       return copy;
     }, {});
};

