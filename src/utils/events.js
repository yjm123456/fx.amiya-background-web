class Event {
  constructor() {}
  handlers = {};

  addEventListener(type, handler) {
    if (!(type in this.handlers)) {
      this.handlers[type] = [];
    }
    this.handlers[type].push(handler);
  }

  dispatchEvent(type, ...params) {
    if (!(type in this.handlers)) {
      return new Error("未注册该事件");
    }
    this.handlers[type].forEach((handler) => {
      handler(...params);
    });
  }
}

module.exports = Event;