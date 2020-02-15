/*
 * @Description: 总控制器
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 16:56:12
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-15 14:45:25
 */
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
    // 清除鼠标特效--放最前
    if (!(mainModel.cursor.axisX && mainModel.cursor.axisY && mainModel.cursor.isClicked)) {
      controllerFn.cursor.clearCursorAnimation();
    }
    // 界面渲染--放中间
    // 鼠标特效渲染--放最后
    if (mainModel.cursor.axisX && mainModel.cursor.axisY && mainModel.cursor.isClicked) {
      controllerFn.cursor.drawCursorAnimation();
    }
    window.requestAnimationFrame(controllerFn.canvasControllerMainFn);
  },
  cursor: {
    drawCursorAnimation() {
      const rectModel = mainModel.cursor.rect;

      if (rectModel.mode === 'picture') {
        $.each(rectModel.picArray, (i, item) => {
          let image = new Image();
          image.src = item;
          rectModel.imageArray.push(image);
        });
      }

      $.each(rectModel.randomInfoArray, (i, item) => {
        this.clearRectByRandomInfo(item);
      });
      rectModel.count++;
      if (rectModel.count === rectModel.countInterval) {
        if (rectModel.randomInfoArray.length === rectModel.showNumber) {
          
          rectModel.randomInfoArray[rectModel.currentIndex] = controllerFn.cursor.generateCursorInfo(mainModel.cursor);
          if (rectModel.currentIndex === rectModel.randomInfoArray.length - 1) {
            rectModel.currentIndex = 0;
          } else {
            rectModel.currentIndex++;
          }
        } else {
          rectModel.randomInfoArray.push(controllerFn.cursor.generateCursorInfo(mainModel.cursor));
        }
        rectModel.count = 0;
      }
      $.each(rectModel.randomInfoArray, (i, item) => {
        if (rectModel.mode === 'rect') {
          this.drawRectByRandomInfo(item);
        } else if (rectModel.mode === 'picture') {
          this.drawPicByRandomInfo(item);
        }
      });
    },
    clearCursorAnimation() {
      const rectModel = mainModel.cursor.rect;
      $.each(rectModel.randomInfoArray, (i, item) => {
        controllerFn.cursor.clearRectByRandomInfo(item);
      });
      rectModel.randomInfoArray = [];
      rectModel.count = 0;
      rectModel.currentIndex = 0;
    },    
    generateCursorInfo(cursor) {
      const rectModel = mainModel.cursor.rect;
      const randomRectInfo = {
        x: cursor.axisX,
        y: cursor.axisY,
        randomOffsetX: utils.getSimpleRandomNumber(rectModel.offsetXScope[0], rectModel.offsetXScope[1]),
        randomOffsetY: utils.getSimpleRandomNumber(rectModel.offsetYScope[0], rectModel.offsetYScope[1]),
        randomWidth: utils.getSimpleRandomNumber(rectModel.widthScope[0], rectModel.widthScope[1]),
        randomColor: utils.getSimpleRandomColor(),
        randomImage: utils.getRandomItemFromArray(rectModel.imageArray)
      }
      randomRectInfo.randomHeight = randomRectInfo.randomWidth;
      return randomRectInfo;
    },   
    drawRectByRandomInfo(obj) {
      canvasFn.drawRect(mainModel.ctx, obj.x + obj.randomOffsetX - obj.randomWidth / 2, obj.y + obj.randomOffsetY - obj.randomHeight / 2, obj.randomWidth, obj.randomHeight, null, true, obj.randomColor);
    },
    clearRectByRandomInfo(obj) {
      canvasFn.clearRect(mainModel.ctx, obj.x + obj.randomOffsetX - 1 - obj.randomWidth / 2, obj.y + obj.randomOffsetY - 1 - obj.randomHeight / 2, obj.randomWidth + 2, obj.randomHeight + 2);
    },
    drawPicByRandomInfo(obj) {
      canvasFn.drawPic(mainModel.ctx, obj.randomImage, obj.x + obj.randomOffsetX - obj.randomWidth / 2, obj.y + obj.randomOffsetY - obj.randomHeight / 2, obj.randomWidth, obj.randomHeight);
    }
  }
};

export default controllerFn;