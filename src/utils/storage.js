'use strict';

class Storage {

  constructor(name) {
    this._name = name;
    this._data = {};
    this._read();
  }

  put(id, item) {
    this._data[id] = item;
    this._write();
  }

  delete(id) {
    delete this._data[id];
    this._write();
  }

  list() {
    return Object.keys(this._data).map(key => this._data[key]);
  }

  save(item) {
    this._data.push(item);
    this._write();
  }

  _read() {
    let serialized = window.localStorage.getItem(this._name);
    if (serialized) {
      this._data = JSON.parse(serialized);
    }
  }

  _write() {
    let serialized = JSON.stringify(this._data);
    window.localStorage.setItem(this._name, serialized);
  }

}

export default Storage;
