'use strict';

import vent from '../vent';

import View from '../base/view';
import Task from '../models/task';
import TaskFormTemplate from '../templates/task-form.jade';

class TaskFormView extends View {

  constructor() {
    super({template: TaskFormTemplate});
    this.bind('submit', '.task-form', this._handleSubmit);
  }

  _handleSubmit(e) {
    e.preventDefault();

    let input = this.query('.task-form__name');
    if (0 === input.value.length) {
      return;
    }

    let task = new Task({name: input.value});
    task.save();

    vent.trigger('tasks:new', task);

    input.value = '';
  }

}

export default TaskFormView;
