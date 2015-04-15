'use strict';

import View from '../base/view';
import TaskTemplate from '../templates/task.jade';

class TaskView extends View {

  constructor({model}) {
    super({template: TaskTemplate, model});
    this.bind('click', '.task__delete-button', this._handleDelete);
    this.bind('change', '.task__checkbox', this._handleCheckbox);
  }

  _handleDelete() {
    this.model.delete();
    this.remove();
  }

  _handleCheckbox(e) {
    this.model.completed = e.target.checked;
    this.model.save();
    this.render();
  }

}

export default TaskView;
