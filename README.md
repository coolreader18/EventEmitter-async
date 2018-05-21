# events-async-methods
EventEmitter methods that make them easier to use in async code.

## Usage
```js
const evtAsync = require("events-async-methods");
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

### Different versions
There are 3 different versions of this module.
* Default - `require("events-async-methods")`: this accepts an EventEmitter as the first argument,
  and other arguments relevant to the function after it
* Bound - `require("events-async-methods/bound")`: the `this` argument for the function is an EventEmitter,
  and you pass relevant arguments to the function.
* Prototype - `require("events-async-methods/proto")`: modifies the prototype of EventEmitter to have the bound methods.
  Not reccomended for a project where other modules are using EventEmitters. This only returns a function,
  which you call to modify the prototype. If you pass an argument, it modifies that class/prototype
  instead of the `require("events")` one, for if you'd like to use it on another implemenation of EventEmitters.

## Installation

```shell
yarn add events-async-methods
# or
npm install --save events-async-methods
```

## License
This project is licensed under the MIT license. Please see the [LICENSE](LICENSE) file for more details.
