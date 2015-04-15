'use strict';

import EventEmitter from '../utils/event-emitter';

@EventEmitter
class Collection {

  constructor(models = []) {
    this.models = [];
    this.reset(models);
  }

  forEach() {
    return this.models.forEach(...arguments);
  }

  add(model) {
    this.models.push(model);
    model.collection = this;
    this.trigger('add', model, this);
  }

  remove(model) {
    let index = this.models.indexOf(model);
    if (-1 !== index) {
      let model = this.models[index];
      this.models.splice(index, 1);
      model.collection = null;
      this.trigger('remove', model, this);
    }
  }

  reset(models) {
    this.models.forEach(model => model.collection = null);
    this.models = [...models];
    this.models.forEach(model => model.collection = this);
    this.trigger('reset', models, this);
  }

}

export default Collection;
