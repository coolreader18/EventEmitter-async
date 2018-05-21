Object.assign(exports, {
  promise(event) {
    return new Promise(res => {
      this.once(event, res);
    });
  },
  async *asyncIterator(event) {
    while (true) {
      yield await promise.call(this, event);
    }
  }
});
