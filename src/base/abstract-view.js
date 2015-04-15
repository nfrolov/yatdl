'use strict';

import DomEvents from '../utils/dom-events';

class AbstractView {

  constructor() {
    this._subviews = [];
    this._el = null;
    this._events = new DomEvents(this._el);
  }

  get el() {
    return this._el;
  }

  set el(el) {
    this._events.unbind();
    this._el = el;
    this._events.rebind(el);
  }

  bind(event, selector, handler) {
    this._events.bind(event, selector, handler, this);
  }

  query(selector) {
    return this.el.querySelector(selector);
  }

  queryAll(selector) {
    return Array.prototype.slice.call(this.el.querySelectorAll(selector));
  }

  registerSubview(subview) {
    this._subviews.push(subview);
  }

  remove() {
    this._events.unbind();
    this._subviews.forEach(subview => subview.remove());
  }

}

export default AbstractView;
