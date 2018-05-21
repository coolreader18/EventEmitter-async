# EventEmitter Async
EventEmitter methods that make them easier to use in async code.

# Usage
```js
const evtAsync = require("eventemitter-async"); // all lowercase
const child_process = require("child_process");

(async () => {
  const fork = child_process.fork("./forked.js");
  const [forkMessage] = await evtAsync.promise(fork, "message");
  for await (let [req, res] of http.createServer().listen(3000)) {
    res.end(req.pathname.split("").reverse("").join(""));
  }
})();
```

# Installation

