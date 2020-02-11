import eventListenerFn from "./eventListener";
import utils from "./utils";
import canvasFn from "./canvasFn";
import mainModel from "./model";

let controllerFn = {
  init() {
    eventListenerFn.init();
    window.requestAnimationFrame(this.canvasControllerMainFn);
  },
  canvasControllerMainFn() {
    if (mainModel.cursor.axisX && mainModel.cursor.axisY) {
      controllerFn.cursor.generateCursorAnimation(mainModel.cursor.axisX, mainModel.cursor.axisY);
    }
    window.requestAnimationFrame(controllerFn.canvasControllerMainFn);
  },
  cursor: {
    generateCursorAnimation(x, y) {
      const randomRectCount = utils.getSimpleRandomNumber(0, 5);
      for (let i = 0; i < randomRectCount; i++) {
        this.generateRectFromRandomPlace(x, y);
      }
    },
    generateRectFromRandomPlace(x, y) {
      const randomOffsetX = utils.getSimpleRandomNumber(-10, 10);
      const randomOffsetY = utils.getSimpleRandomNumber(-10, 10);
      const randomWidth = utils.getSimpleRandomNumber(20, 30);
      const randomHeight = utils.getSimpleRandomNumber(20, 30);
      const randomColor = utils.getSimpleRandomColor();
      canvasFn.drawRect(mainModel.ctx, x+randomOffsetX, y+randomOffsetY, randomWidth, randomHeight, null, true, randomColor);
    }
  }
};

export default controllerFn;