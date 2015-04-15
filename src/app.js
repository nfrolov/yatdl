'use strict';

import vent from './vent';

import Collection from './base/collection';
import Task from './models/task';
import MainView from './views/main';

class Application {

  constructor() {
    this._tasks = new Collection(Task.findAll());

    vent.on('tasks:filter', this._handleFilter, this);
    vent.on('tasks:new', this._handleNew, this);

    let view = new MainView({tasks: this._tasks});
    let el = view.render().el;
    let body = document.body;
    body.insertBefore(el, body.firstChild);
  }


  _handleNew(task) {
    // new tasks are always visible
    this._tasks.add(task);
  }

  _handleFilter(filter) {
    let tasks;
    if ('open' === filter) {
      tasks = Task.findOpen();
    } else {
      tasks = Task.findAll();
    }
    this._tasks.reset(tasks);
  }

}

export default new Application();
