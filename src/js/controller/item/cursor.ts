/*
 * @Description: 指针
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-29 15:13:28
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-29 15:18:18
 */
import $ from "jquery";
import UtilsFn from "../../utils/utils";
import CanvasFn from "../../utils/canvasFn";
import mainModel from "../../model/model";

const utilsFn = new UtilsFn();
const canvasFn = new CanvasFn();

export default class Cursor {
  initRenderInfo() {
    const rectModel = mainModel.cursor.rect;

    rectModel.count = rectModel.count || 0;
    rectModel.randomInfoArray = rectModel.randomInfoArray || [];
    rectModel.imageArray = rectModel.imageArray || [];
  }
  render() {
    const rectModel = mainModel.cursor.rect;

    if (rectModel.mode === 'picture' && rectModel.imageArray.length === 0) {
      $.each(rectModel.picArray, (i, item) => {
        let image = new Image();
        image.src = item;
        rectModel.imageArray.push(image);
      });
    }

    rectModel.count++;
    if (rectModel.count === (60 - rectModel.speed)) {
      if (rectModel.randomInfoArray.length === rectModel.showNumber) {
        rectModel.currentIndex = rectModel.currentIndex || 0;
        rectModel.randomInfoArray[rectModel.currentIndex] = this.generateInfo(mainModel.cursor);
        if (rectModel.currentIndex === rectModel.randomInfoArray.length - 1) {
          rectModel.currentIndex = 0;
        } else {
          rectModel.currentIndex++;
        }
      } else {
        rectModel.randomInfoArray.push(this.generateInfo(mainModel.cursor));
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
  }
  resetRenderInfo() {
    const rectModel = mainModel.cursor.rect;
    rectModel.randomInfoArray = [];
    rectModel.count = 0;
    rectModel.currentIndex = 0;
  }
  generateInfo(cursor: any) {
    const rectModel = mainModel.cursor.rect;
    const randomRectInfo: any = {
      x: cursor.axisX,
      y: cursor.axisY,
      randomOffsetX: utilsFn.getSimpleRandomNumber(rectModel.offsetXScope[0], rectModel.offsetXScope[1]),
      randomOffsetY: utilsFn.getSimpleRandomNumber(rectModel.offsetYScope[0], rectModel.offsetYScope[1]),
      randomWidth: utilsFn.getSimpleRandomNumber(rectModel.widthScope[0], rectModel.widthScope[1]),
      randomHeight: null,
      randomColor: utilsFn.getSimpleRandomColor(),
      randomImage: utilsFn.getRandomItemFromArray(rectModel.imageArray)
    }
    randomRectInfo.randomHeight = randomRectInfo.randomWidth;
    return randomRectInfo;
  }
  drawRectByRandomInfo(obj: any) {
    canvasFn.drawRect(mainModel.ctx, obj.x + obj.randomOffsetX - obj.randomWidth / 2, obj.y + obj.randomOffsetY - obj.randomHeight / 2, obj.randomWidth, obj.randomHeight, null, true, obj.randomColor, mainModel.cursor.rect.borderWidth);
  }
  drawPicByRandomInfo(obj: any) {
    canvasFn.drawImage(mainModel.ctx, obj.randomImage, obj.x + obj.randomOffsetX - obj.randomWidth / 2, obj.y + obj.randomOffsetY - obj.randomHeight / 2, obj.randomWidth, obj.randomHeight);
  }
}