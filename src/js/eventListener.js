import $ from "jquery";
import mainModel from "./model";

let eventListenerFn = {
  init() {
    this.mouseMove();
    this.mouseUp();
    this.mouseDown();
  },
  mouseMove() {
    $("#mainCanvas").off('mousemove').on('mousemove', (e) => {
      if (mainModel.cursor.axisX === e.offsetX && mainModel.cursor.axisY === e.offsetY) {
        mainModel.cursor.isMoving = false;
      } else {
        mainModel.cursor.isMoving = true;
        mainModel.cursor.axisX = e.offsetX;
        mainModel.cursor.axisY = e.offsetY;
      }
    });
  },
  mouseDown() {
    $("#mainCanvas").off('mousedown').on('mousedown', (e) => {
      mainModel.cursor.isClicked = true;
    });
  },
  mouseUp() {
    $("#mainCanvas").off('mouseup').on('mouseup', (e) => {
      mainModel.cursor.isClicked = false;
    });
  }
};

export default eventListenerFn;