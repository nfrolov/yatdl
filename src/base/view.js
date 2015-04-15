'use strict';

import AbstractView from './abstract-view';
import CollectionView from './collection-view';

class View extends AbstractView {

  constructor({template = null, model = null} = {}) {
    super();
    this._template = template;
    this.model = model;
  }

  render() {
    this.renderTemplate();
    return this;
  }

  renderCollection(collection, view, container) {
    let subview = new CollectionView({
      el: this.query(container),
      collection: collection,
      view: view
    });
    this.registerSubview(subview);
    subview.render();
  }

  renderSubview(view, container) {
    this.registerSubview(view);
    view.render();
    this.query(container).appendChild(view.el);
  }

  renderTemplate() {
    let context = this.model && {model: this.model} || {};
    let html = this._template(context);

    // domify
    let wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    let el = wrapper.firstChild;

    // replace current element if any
    if (this.el && this.el.parentNode) {
      this.el.parentNode.replaceChild(el, this.el);
    }

    this.el = el;
  }

  remove() {
    super.remove();
    if (this.el && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
  }

}

export default View;
