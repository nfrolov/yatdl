'use strict';

import vent from '../vent';

import View from '../base/view';
import FilterTemplate from '../templates/filter.jade';

class FilterView extends View {

  constructor() {
    super({template: FilterTemplate});
    this._currentVariant = 'all';
    this.bind('click', '.radiogroup__radio', this._handleChange);
  }

  _handleChange(e) {
    let target = e.target;

    let radios = this.queryAll('.radiogroup__radio');
    radios.forEach(radio => {
      radio.classList.toggle('radiogroup__radio_checked', radio === target);
    });

    let variant = target.dataset.variant;
    if (this._currentVariant !== variant) {
      this._currentVariant = variant;
      vent.trigger('tasks:filter', variant);
    }
  }

}

export default FilterView;
