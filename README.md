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
Note that all methods return an array, to account for the fact that event emitters can pass multiple arguments to listeners.

# Installation

```shell
yarn add eventemitter-async
# or
npm install --save eventemitter-async
```

# License
This project is licensed under the MIT license. Please see the [LICENSE](LICENSE) file for more details.
