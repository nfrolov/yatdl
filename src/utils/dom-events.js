'use strict';

class DomEvents {

  constructor(el) {
    this._el = el;
    this._bindings = [];
  }

  bind(event, selector, handler, context) {
    let listener = function (e) {
      // check for selector match
      if (e.target.closest(selector)) {
        handler.call(context || this, e);
      }
    };
    let binding = {event, listener};
    this._bindings.push(binding);
    this._addEventListener(binding);
  }

  unbind() {
    this._bindings.forEach(this._removeEventListener, this);
    this._el = null;
  }

  rebind(el) {
    this._el = el;
    this._bindings.forEach(this._addEventListener, this);
  }

  _addEventListener({event, listener}) {
    if (this._el) {
      this._el.addEventListener(event, listener, false);
    }
  }

  _removeEventListener({event, listener}) {
    if (this._el) {
      this._el.removeEventListener(event, listener, false);
    }
  }

}

export default DomEvents;
