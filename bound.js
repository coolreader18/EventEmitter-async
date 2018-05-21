Object.assign(exports, {
  promise(event) {
    return new Promise(res => {
      this.once(event, (...data) => res(data));
    });
  },
  promiseErrorFirst(event) {
    return new Promise((res, rej) => {
      this.once(event, (err, ...data) => err ? rej(err), res(data));
    });
  },
  async *asyncIterator(event) {
    while (true) {
      yield await promise.call(this, event);
    }
  }
});
