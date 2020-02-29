/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-29 15:24:02
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-29 16:14:23
 */
import $ from "jquery";
import UtilsFn from "../../utils/utils";
import CanvasFn from "../../utils/canvasFn";
import mainModel from "../../model/model";

const utilsFn = new UtilsFn();
const canvasFn = new CanvasFn();

export default class Star {
  initRenderInfo() {
    this.initTinyStarInfo();
    this.initMenuTextInfo();
    this.initTextInfo();
  }
  render() {
    this.drawTinyStar();

    this.drawMenuText();

    if (mainModel.menu.star.text.focusIndex !== null) {
      this.drawText(mainModel.menu.star.text.focusIndex);
    }
  }
  initTinyStarInfo() {
    const tinyStarModel = mainModel.menu.star.tiny;

    tinyStarModel.axis = tinyStarModel.axis || [];

    if (tinyStarModel.axis.length === 0) {
      for (let i = 0; i < tinyStarModel.maxNumber; i++) {
        let obj = {
          x: utilsFn.getSimpleRandomNumber(mainModel.clientWidth),
          y: utilsFn.getSimpleRandomNumber(mainModel.clientHeight),
          velocityX: utilsFn.getSimpleRandomNumber(tinyStarModel.speed, -tinyStarModel.speed, null, true, true),
          velocityY: utilsFn.getSimpleRandomNumber(tinyStarModel.speed, -tinyStarModel.speed, null, true, true),
          color: utilsFn.getSimpleRandomColor(),
          render() {
            if (tinyStarModel.radius <= 10) {
              canvasFn.drawRect(this.offscreenCtx, 0, 0, tinyStarModel.radius, tinyStarModel.radius, this.color);
            } else {
              canvasFn.drawCircle(this.offscreenCtx, tinyStarModel.radius, tinyStarModel.radius, tinyStarModel.radius, this.color, false);
            }
          },
          move() {
            this.x += this.velocityX;
            this.y += this.velocityY;
            if (this.x >= mainModel.clientWidth || this.x <= 0) {
              this.velocityX = -this.velocityX;
            }
            if (this.y >= mainModel.clientHeight || this.y <= 0) {
              this.velocityY = -this.velocityY;
            }
          }
        };
        tinyStarModel.axis.push(obj);
      }
    }
    $.each(tinyStarModel.axis, (i, item) => {
      canvasFn.createAndRenderOffscreenCanvas(item, tinyStarModel.radius * 2, tinyStarModel.radius * 2);
    });
  }
  drawTinyStar() {
    const tinyStarModel = mainModel.menu.star.tiny;
    $.each(tinyStarModel.axis, (i, item) => {
      canvasFn.drawImage(mainModel.ctx, item.offscreenCanvas, item.x, item.y, tinyStarModel.radius * 2, tinyStarModel.radius * 2);
      item.move();
    });
  }
  initMenuTextInfo() {
    const textModel = mainModel.menu.star.text;

    $.each(textModel.content, (i, item) => {
      item.render = () => {
        canvasFn.drawText(item.offscreenCtx, item.name, 0, 0, item.font, item.color);
      };
      canvasFn.createAndRenderOffscreenCanvas(item, item.w, item.h);
    });
  }
  drawMenuText() {
    const textModel = mainModel.menu.star.text;

    $.each(textModel.content, (i, item) => {
      if (textModel.focusIndex !== i) {
        canvasFn.drawImage(mainModel.ctx, item.offscreenCanvas, item.x, item.y, item.w, item.h);
      }
    });
  }
  initTextInfo() {
    const textModel = mainModel.menu.star.text;

    let vm = this;
    $.each(textModel.content, (i, item) => {
      item.innerTextObject = {
        name: item.name,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        font: item.font,
        render() {
          vm.createText(this.offscreenCtx, item);
          vm.findText(this.offscreenCtx, item);
        }
      };
      canvasFn.createAndRenderOffscreenCanvas(item.innerTextObject, item.innerTextObject.w, item.innerTextObject.h);
    });
  }
  drawText(index: number) {
    const textModel = mainModel.menu.star.text;

    $.each(textModel.content, (i, item) => {
      const obj = item.innerTextObject;

      if (i === index) {
        canvasFn.drawImage(mainModel.ctx, obj.offscreenCanvas, obj.x, obj.y, obj.w, obj.h);
      }
    });
  }
  //生成文字
  createText(ctx: any, obj: any) {
    canvasFn.drawText(ctx, obj.name, 0, 0, obj.font, 'red');
  }
  //查找不同颜色的值和位置
  findText(ctx: any, obj: any) {
    let imageData = ctx.getImageData(0, 0, obj.w, obj.h);
    let data = imageData.data;
    let pos = [];
    for (let i = 0; i < obj.w; i += mainModel.menu.star.text.gap) {
      for (let j = 0; j < obj.h; j += mainModel.menu.star.text.gap) {
        let index = (j * obj.w + i) * 4;
        if (data[index] > 128) {
          pos.push({
            x: i,
            y: j
          });
        }
      }
    }
    this.createRadius(ctx, pos, obj);
  }
  createRadius(ctx: any, data: Array<any>, obj: any) {
    ctx.clearRect(0, 0, obj.w, obj.h);
    for (let i = 0; i < data.length; i++) {
      ctx.beginPath();

      ctx.arc(data[i].x, data[i].y, Math.random() * mainModel.menu.star.text.defR, 0, Math.PI * 2);
      ctx.fillStyle = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
      ctx.closePath();
      ctx.fill();
    }
  }
}