/*
 * @Description: 指针
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-29 15:13:28
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-03-02 15:29:50
 */
import $ from "jquery";
import UtilsFn from "../../utils/utils";
import CanvasFn from "../../utils/canvasFn";
import mainModel from "../../model/model";
import cursorModel from "../../model/item/cursor";


export default class Cursor {
  utilsFn: any;
  canvasFn: any;

  constructor () {
    this.utilsFn = new UtilsFn();
    this.canvasFn = new CanvasFn();
  }

  initRenderInfo() {
    cursorModel.animation.count = cursorModel.animation.count || 0;
    cursorModel.animation.randomInfoArray = cursorModel.animation.randomInfoArray || [];
    cursorModel.animation.imageArray = cursorModel.animation.imageArray || [];
  }
  render() {
    if (cursorModel.animation.mode === 'picture' && cursorModel.animation.imageArray.length === 0) {
      $.each(cursorModel.animation.picArray, (i, item) => {
        let image = new Image();
        image.src = item;
        cursorModel.animation.imageArray.push(image);
      });
    }

    cursorModel.animation.count++;
    if (cursorModel.animation.count === (60 - cursorModel.animation.speed)) {
      if (cursorModel.animation.randomInfoArray.length === cursorModel.animation.showNumber) {
        cursorModel.animation.currentIndex = cursorModel.animation.currentIndex || 0;
        cursorModel.animation.randomInfoArray[cursorModel.animation.currentIndex] = this.generateInfo(cursorModel);
        if (cursorModel.animation.currentIndex === cursorModel.animation.randomInfoArray.length - 1) {
          cursorModel.animation.currentIndex = 0;
        } else {
          cursorModel.animation.currentIndex++;
        }
      } else {
        cursorModel.animation.randomInfoArray.push(this.generateInfo(cursorModel));
      }
      cursorModel.animation.count = 0;
    }
    
    $.each(cursorModel.animation.randomInfoArray, (i, item) => {
      if (cursorModel.animation.mode === 'rect') {
        this.drawRectByRandomInfo(item);
      } else if (cursorModel.animation.mode === 'picture') {
        this.drawPicByRandomInfo(item);
      }
    });
  }
  resetRenderInfo() {
    cursorModel.animation.randomInfoArray = [];
    cursorModel.animation.count = 0;
    cursorModel.animation.currentIndex = 0;
  }
  generateInfo(cursor: any) {
    const randomRectInfo: any = {
      x: cursor.axisX,
      y: cursor.axisY,
      randomOffsetX: this.utilsFn.getSimpleRandomNumber(cursorModel.animation.offsetXScope[0], cursorModel.animation.offsetXScope[1]),
      randomOffsetY: this.utilsFn.getSimpleRandomNumber(cursorModel.animation.offsetYScope[0], cursorModel.animation.offsetYScope[1]),
      randomWidth: this.utilsFn.getSimpleRandomNumber(cursorModel.animation.widthScope[0], cursorModel.animation.widthScope[1]),
      randomHeight: null,
      randomColor: this.utilsFn.getSimpleRandomColor(),
      randomImage: this.utilsFn.getRandomItemFromArray(cursorModel.animation.imageArray)
    }
    randomRectInfo.randomHeight = randomRectInfo.randomWidth;
    return randomRectInfo;
  }
  drawRectByRandomInfo(obj: any) {
    this.canvasFn.drawRect(mainModel.ctx, obj.x + obj.randomOffsetX - obj.randomWidth / 2, obj.y + obj.randomOffsetY - obj.randomHeight / 2, obj.randomWidth, obj.randomHeight, null, true, obj.randomColor, cursorModel.animation.borderWidth);
  }
  drawPicByRandomInfo(obj: any) {
    this.canvasFn.drawImage(mainModel.ctx, obj.randomImage, obj.x + obj.randomOffsetX - obj.randomWidth / 2, obj.y + obj.randomOffsetY - obj.randomHeight / 2, obj.randomWidth, obj.randomHeight);
  }
}