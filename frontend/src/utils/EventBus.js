// lowkey chatgpt made this but it is an event handler for when a new service goes down to update the map background to zoom in

// Lightweight global event emitter
const EventBus = {
  listeners: {},

  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  },

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => callback(data));
    }
  },
};

export default EventBus;
