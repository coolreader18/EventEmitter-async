Object.assign(exports, {
  defaultEvent: "message",
  defaultDoneEvent: "done",
  defaultErrorEvent: "error",
  then(cb) {
    return this.promise().then(cb);
  },
  asyncIterator(...args) {
    return {
      [Symbol.iterator]: exports[Symbol.iterator].bind(this, ...args)
    };
  },
  promise(event = this.defaultEvent, { errorFirst }) {
    return new Promise((res, rej) => {
      this.once(event, (...data) => {
        if (errorFirst) {
          const [err, ...rest] = data;
          if (err) rej(err);
          else res(rest);
        } else res(data);
      });
    });
  },
  [Symbol.iterator](
    event = this.defaultEvent,
    { count, doneEvent = this.defaultDoneEvent, doneTest }
  ) {
    let res, rej;
    let reps = 0;
    const events = [];
    this.on(event, (...data) => {
      events.push(data);
      update();
    });
    let done = false;
    if (
      typeof doneTest !== "undefined" &&
      (typeof doneTest === "boolean" ? doneTest : true)
    ) {
      let doneCb;
      switch (typeof doneTest) {
        case "boolean":
          doneCb = a => a;
          break;
        case "function":
          doneCb = doneTest;
          break;
        default:
          doneCb = a => a === doneTest;
      }
      this.on(doneEvent, (...args) => {
        done = !!doneCb(...args);
      });
    }
    function update() {
      if (!events.length) return;
      res(events.shift());
    }
    return {
      next: () => {
        if (count != null) reps++;
        if (done) return { done: true };
        let ret = {
          value: new Promise((resolve, reject) => {
            res = resolve;
            rej = reject;
          }),
          done: count === reps - 1
        };
        update();
        return ret;
      }
    };
  }
});
