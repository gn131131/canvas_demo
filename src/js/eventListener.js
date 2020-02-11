import $ from "jquery";

let eventListenerFn = {
  init() {
    this.mouseMove();
  },
  mouseMove() {
    $("#mainCanvas").off('mousemove').on('mousemove', () => {
      console.log('mouse move');
    });
  }
};

export default eventListenerFn;