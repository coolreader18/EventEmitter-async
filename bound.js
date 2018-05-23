Object.assign(exports, {
  promise(event) {
    return new Promise(res => {
      this.once(event, (...data) => res(data));
    });
  },
  promiseErrorFirst(event) {
    return new Promise((res, rej) => {
      this.once(event, (err, ...data) => err ? rej(err) : res(data));
    });
  },
  asyncIterator(...args) {
    return {
      [Symbol.iterator]: exports[Symbol.iterator].bind(this, ...args)
    };
  },
  defaultEvent: "message",
  [Symbol.iterator](event = this.defaultEvent, count) {
    let res, rej, reps = 0;
    const events = [];
    this.on(event, (...data) => {
      events.push(data)
      update();
    })
    function update() {
      if (!events.length) return;
      res(events.shift());
    }
    return {
      next: () => {
        if (count != null) reps++;
        let ret = {
          value: new Promise((resolve, reject) => {
            res = resolve;
            rej = reject;
          }),
          done: count === reps - 1
        }
        update();
        return ret;
      }
    };
  }
});
