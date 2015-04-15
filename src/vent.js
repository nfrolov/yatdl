'use strict';

import EventEmitter from './utils/event-emitter';

@EventEmitter
class EventAggregator {}

export default new EventAggregator();
