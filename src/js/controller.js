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
    if (mainModel.cursor.axisX && mainModel.cursor.axisY && mainModel.cursor.isClicked) {
      controllerFn.cursor.generateCursorAnimation(mainModel.cursor.axisX, mainModel.cursor.axisY);
    }
    window.requestAnimationFrame(controllerFn.canvasControllerMainFn);
  },
  cursor: {
    generateCursorAnimation(x, y) {
      const randomRectCount = utils.getSimpleRandomNumber(5);
      for (let i = 0; i < randomRectCount; i++) {
        this.generateRectFromRandomPlace(x, y);
      }
    },
    generateRectFromRandomPlace(x, y) {
      const randomOffsetX = utils.getSimpleRandomNumber(10, -10);
      const randomOffsetY = utils.getSimpleRandomNumber(10, -10);
      const randomWidth = utils.getSimpleRandomNumber(30, 10);
      const randomHeight = randomWidth;
      const randomColor = utils.getSimpleRandomColor();
      canvasFn.drawRect(mainModel.ctx, x + randomOffsetX, y + randomOffsetY, randomWidth, randomHeight, null, true, randomColor);
      let timeout = setTimeout(() => {
        canvasFn.clearRect(mainModel.ctx, x + randomOffsetX - 1, y + randomOffsetY - 1, randomWidth + 2, randomHeight + 2);
        clearTimeout(timeout);
      }, 500);
    }
  }
};

export default controllerFn;