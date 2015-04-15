'use strict';

import View from '../base/view';
import TaskView from '../views/task';
import TaskFormView from '../views/task-form';
import FilterView from '../views/filter';
import MainTemplate from '../templates/main.jade';

class MainView extends View {

  constructor({tasks}) {
    super({template: MainTemplate});
    this._tasks = tasks;
    console.log('hello world');
  }

  render() {
    this.renderTemplate();
    this.renderCollection(this._tasks, TaskView, '.app__task-list');
    this.renderSubview(new TaskFormView(), '.app__task-form');
    this.renderSubview(new FilterView(), '.app__footer');
    return this;
  }

}

export default MainView;
