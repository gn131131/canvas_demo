import eventListenerFn from "./eventListener";
import utils from "./utils";
import canvasFn from "./canvasFn";
import mainModel from "./model";

let controllerFn = {
  init() {
    canvasFn.setCanvasToFullScreen(mainModel.canvasNode);
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
      const randomRectCount = utils.getSimpleRandomNumber(mainModel.cursor.rect.generateNumber);
      for (let i = 0; i < randomRectCount; i++) {
        this.generateRectFromRandomPlace(x, y);
      }
    },
    generateRectFromRandomPlace(x, y) {
      const rectModel = mainModel.cursor.rect;
      const randomOffsetX = utils.getSimpleRandomNumber(rectModel.offsetXScope[0], rectModel.offsetXScope[1]);
      const randomOffsetY = utils.getSimpleRandomNumber(rectModel.offsetYScope[0], rectModel.offsetYScope[1]);
      const randomWidth = utils.getSimpleRandomNumber(rectModel.widthScope[0], rectModel.widthScope[1]);
      const randomHeight = randomWidth;
      const randomColor = utils.getSimpleRandomColor();
      canvasFn.drawRect(mainModel.ctx, x + randomOffsetX - randomWidth / 2, y + randomOffsetY - randomHeight / 2, randomWidth, randomHeight, null, true, randomColor);
      let timeout = setTimeout(() => {
        canvasFn.clearRect(mainModel.ctx, x + randomOffsetX - 1 - randomWidth / 2, y + randomOffsetY - 1 - randomHeight / 2, randomWidth + 2, randomHeight + 2);
        clearTimeout(timeout);
      }, rectModel.clearTimes);
    }
  }
};

export default controllerFn;