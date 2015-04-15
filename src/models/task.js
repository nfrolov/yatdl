'use strict';

import Storage from '../utils/storage';

class Task {

  constructor({id = null, completed = false, name} = {}) {
    this.collection = null;
    this.id = id;
    this.completed = !!completed;
    this.name = name;
  }

  save() {
    if (null === this.id) {
      this.id = String(Date.now());
    }
    Task.storage.put(this.id, this);
  }

  delete() {
    Task.storage.delete(this.id);
    if (this.collection) {
      this.collection.remove(this);
    }
    this.id = null;
  }

  toJSON() {
    return {
      id: this.id,
      completed: this.completed,
      name: this.name
    };
  }

  static findAll() {
    return Task.find();
  }

  static findOpen() {
    return Task.find(item => !item.completed);
  }

  static find(filter) {
    let items = Task.storage.list();
    if (filter) {
      items = items.filter(filter);
    }
    return items.map(props => new Task(props));
  }

}

Task.storage = new Storage('tasks');

export default Task;
