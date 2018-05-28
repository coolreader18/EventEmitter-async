module.exports = Object.entries(require("./bound"))
  .map(([key, val]) => {
    if (typeof val === "function") {
      val = val.call.bind(val);
    }
    return [key, val];
  })
  .reduce((o, [k, v]) => ((o[k] = v), o), {});
