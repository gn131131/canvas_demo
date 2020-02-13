import eventListenerFn from "./eventListener";
import utils from "./utils";
import canvasFn from "./canvasFn";
import mainModel from "./model";
import $ from "jquery";

let controllerFn = {
  init() {
    canvasFn.setCanvasToFullScreen(mainModel.canvasNode);
    eventListenerFn.init();
    window.requestAnimationFrame(this.canvasControllerMainFn);
  },
  canvasControllerMainFn() {
    // 界面渲染
    // 鼠标渲染--放最后
    if (mainModel.cursor.axisX && mainModel.cursor.axisY && mainModel.cursor.isClicked) {
      controllerFn.cursor.drawCursorRect();
    } else {
      $.each(mainModel.cursor.rect.randomInfoArray, (i, item) => {
        controllerFn.cursor.clearRectByRandomInfo(item);
      });
      mainModel.cursor.rect.randomInfoArray = [];
      mainModel.cursor.rect.count = 0;
    }
    window.requestAnimationFrame(controllerFn.canvasControllerMainFn);
  },
  cursor: {
    drawCursorRect() {
      $.each(mainModel.cursor.rect.randomInfoArray, (i, item) => {
        this.clearRectByRandomInfo(item);
      });
      mainModel.cursor.rect.count++;
      if (mainModel.cursor.rect.count === mainModel.cursor.rect.intervalCountTimes) {
        if (mainModel.cursor.rect.randomInfoArray.length === mainModel.cursor.rect.showNumber) {
          
          mainModel.cursor.rect.randomInfoArray[mainModel.cursor.rect.currentIndex] = controllerFn.cursor.generateCursorRectInfo(mainModel.cursor);
          if (mainModel.cursor.rect.currentIndex === mainModel.cursor.rect.randomInfoArray.length - 1) {
            mainModel.cursor.rect.currentIndex = 0;
          } else {
            mainModel.cursor.rect.currentIndex++;
          }
        } else {
          mainModel.cursor.rect.randomInfoArray.push(controllerFn.cursor.generateCursorRectInfo(mainModel.cursor));
        }
        mainModel.cursor.rect.count = 0;
      }
      
      $.each(mainModel.cursor.rect.randomInfoArray, (i, item) => {
        this.drawRectByRandomInfo(item);
      });
    },
    generateCursorRectInfo(cursor) {
      const rectModel = mainModel.cursor.rect;
      const randomRectInfo = {
        x: cursor.axisX,
        y: cursor.axisY,
        randomOffsetX: utils.getSimpleRandomNumber(rectModel.offsetXScope[0], rectModel.offsetXScope[1]),
        randomOffsetY: utils.getSimpleRandomNumber(rectModel.offsetYScope[0], rectModel.offsetYScope[1]),
        randomWidth: utils.getSimpleRandomNumber(rectModel.widthScope[0], rectModel.widthScope[1]),
        randomColor: utils.getSimpleRandomColor()
      }
      randomRectInfo.randomHeight = randomRectInfo.randomWidth;
      return randomRectInfo;
    },
    drawRectByRandomInfo(obj) {
      canvasFn.drawRect(mainModel.ctx, obj.x + obj.randomOffsetX - obj.randomWidth / 2, obj.y + obj.randomOffsetY - obj.randomHeight / 2, obj.randomWidth, obj.randomHeight, null, true, obj.randomColor);
    },
    clearRectByRandomInfo(obj) {
      canvasFn.clearRect(mainModel.ctx, obj.x + obj.randomOffsetX - 1 - obj.randomWidth / 2, obj.y + obj.randomOffsetY - 1 - obj.randomHeight / 2, obj.randomWidth + 2, obj.randomHeight + 2);
    }
  }
};

export default controllerFn;