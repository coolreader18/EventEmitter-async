module.exports = Object.keys(require("./bound"))
  .map(cur => ((cur[1] = cur[1].call.bind(cur[1])), cur))
  .reduce((o, [k, v]) => ((o[k] = v), o), {});
