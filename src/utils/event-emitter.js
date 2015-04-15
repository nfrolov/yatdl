'use strict';

const events = Symbol('events');

function on(event, handler, context = this) {
  let handlers = getEventHandlers(this, event);
  handlers.push({handler, context});
}

function off(event, handler) {
  let handlers = getEventHandlers(this, event);
  if (undefined === handler) {
    handlers.splice(0, handlers.length);
  } else {
    let index;
    for (let i in handlers) {
      if (handler === handlers[i].handler) {
        index = i;
        break;
      }
    }
    handlers.splice(index, 1);
  }
}

function trigger(event, ...args) {
  let handlers = getEventHandlers(this, event);
  handlers.forEach(({handler, context}) => handler.apply(context, args));
}

function getEventHandlers(el, event) {
  if (undefined === el[events]) {
    el[events] = {};
  }
  if (undefined === el[events][event]) {
    el[events][event] = [];
  }
  return el[events][event];
}

function EventsDecorator(target) {
  Object.defineProperties(target.prototype, {
    on: {
      writable: true,
      configurable: true,
      value: on
    },
    off: {
      writable: true,
      configurable: true,
      value: off
    },
    trigger: {
      writable: true,
      configurable: true,
      value: trigger
    }
  });
}

export default EventsDecorator;
