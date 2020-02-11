import $ from "jquery";
import mainModel from "./model";

let eventListenerFn = {
  init() {
    this.mouseMove();
  },
  mouseMove() {
    $("#mainCanvas").off('mousemove').on('mousemove', (e) => {
      // console.log("TCL: mouseMove -> e", e.offsetX, e.offsetY);
      mainModel.cursor.axisX = e.offsetX;
      mainModel.cursor.axisY = e.offsetY;
    });
  }
};

export default eventListenerFn;