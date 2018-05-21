module.exports = (EvtEmit = require("events")) => {
  if ("prototype" in EvtEmit) EvtEmit = EvtEmit.prototype;
  Object.assign(EvtEmit, require("./bound"));
};
