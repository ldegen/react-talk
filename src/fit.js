const transform = require("./transform");
module.exports = function(ftr,vwp){
  const dx = ftr.right - ftr.left;
  const dy = ftr.bottom - ftr.top;
  const x = (ftr.left + ftr.right) / 2;
  const y = (ftr.top + ftr.bottom) / 2;
  const dv = vwp.right-vwp.left;
  const dw = vwp.bottom-vwp.top;
  const v = (vwp.left + vwp.right) / 2;
  const w = (vwp.top + vwp.bottom) / 2;

  const scale = 1 / Math.max(dx / dv, dy / dw);
  const translate = [v - scale * x, w - scale * y];
  return transform({scale,translate});
};

