'use strict';

import AbstractView from './abstract-view';

class CollectionView extends AbstractView {

  constructor({el, collection, view}) {
    super();
    this._view = view;
    this.el = el;
    this.collection = collection;
    this.collection.on('reset', this._handleReset, this);
    this.collection.on('add', this._handleAdd, this);
  }

  render() {
    let fragment = document.createDocumentFragment();

    this.collection.forEach(model => {
      let view = new this._view({model});
      view.render();
      this.registerSubview(view);
      fragment.appendChild(view.el);
    });

    this.el.appendChild(fragment);

    return this;
  }

  _handleReset() {
    this._subviews.forEach(subview => subview.remove());
    this._subviews = [];
    this.render();
  }

  _handleAdd(model) {
    let view = new this._view({model});
    view.render();
    this.registerSubview(view);
    this.el.appendChild(view.el);
  }

}

export default CollectionView;
