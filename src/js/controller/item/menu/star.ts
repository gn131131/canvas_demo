/*
 * @Description:
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-29 15:24:02
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-03-02 19:19:26
 */
import $ from "jquery";
import UtilsFn from "../../../utils/utils";
import CanvasFn from "../../../utils/canvasFn";
import mainModel from "../../../model/model";
import menuModel from "../../../model/item/menu";

export default class Star {
  utilsFn: any;
  canvasFn: any;

  constructor() {
    this.utilsFn = new UtilsFn();
    this.canvasFn = new CanvasFn();
  }

  init() {
    this.initTinyStarInfo();
    this.initMenuTextInfo();
    this.initTextInfo();
  }
  render() {
    this.drawTinyStar();

    this.drawMenuText();

    if (menuModel.star.text.focusIndex !== null) {
      this.drawText(menuModel.star.text.focusIndex);
    }
  }
  initTinyStarInfo() {
    const tinyStarModel = menuModel.star.tiny;

    tinyStarModel.axis = tinyStarModel.axis || [];

    let vm: any = this;
    if (tinyStarModel.axis.length === 0) {
      for (let i = 0; i < tinyStarModel.maxNumber; i++) {
        let obj = {
          x: vm.utilsFn.getSimpleRandomNumber(mainModel.clientWidth),
          y: vm.utilsFn.getSimpleRandomNumber(mainModel.clientHeight),
          velocityX: vm.utilsFn.getSimpleRandomNumber(
            tinyStarModel.speed,
            -tinyStarModel.speed,
            null,
            true,
            true
          ),
          velocityY: vm.utilsFn.getSimpleRandomNumber(
            tinyStarModel.speed,
            -tinyStarModel.speed,
            null,
            true,
            true
          ),
          color: vm.utilsFn.getSimpleRandomColor(),
          zoom: 'out',
          render() {
            if (tinyStarModel.radius <= 10) {
              vm.canvasFn.drawRect(
                this.offscreenCtx,
                0,
                0,
                tinyStarModel.radius,
                tinyStarModel.radius,
                this.color
              );
            } else {
              vm.canvasFn.drawCircle(
                this.offscreenCtx,
                tinyStarModel.radius,
                tinyStarModel.radius,
                tinyStarModel.radius,
                this.color,
                false
              );
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
          },
          shine() {
            if (this.zoom === 'out') {
              if (tinyStarModel.radius <= 40) {
                tinyStarModel.radius = tinyStarModel.radius + 0.0000000000001;
              } else {
                this.zoom = 'in';
              }
            } else if (this.zoom === 'in') {
              if (tinyStarModel.radius >= 0) {
                tinyStarModel.radius = tinyStarModel.radius - 0.0000000000001;
              } else {
                this.zoom = 'out';
              }
            }
          },
        };
        tinyStarModel.axis.push(obj);
      }
    }
    $.each(tinyStarModel.axis, (i, item) => {
      this.canvasFn.createAndRenderOffscreenCanvas(
        item,
        tinyStarModel.radius * 2,
        tinyStarModel.radius * 2
      );
    });
  }
  drawTinyStar() {
    const tinyStarModel = menuModel.star.tiny;
    $.each(tinyStarModel.axis, (i, item) => {
      this.canvasFn.drawImage(
        mainModel.ctx,
        item.offscreenCanvas,
        item.x,
        item.y,
        tinyStarModel.radius * 2,
        tinyStarModel.radius * 2
      );
      item.move();
      // item.shine();
    });
  }
  initMenuTextInfo() {
    const textModel = menuModel.star.text;

    $.each(textModel.content, (i, item) => {
      item.render = () => {
        this.canvasFn.drawText(
          item.offscreenCtx,
          item.name,
          0,
          0,
          item.font,
          item.color
        );
      };
      this.canvasFn.createAndRenderOffscreenCanvas(item, item.w, item.h);
    });
  }
  drawMenuText() {
    const textModel = menuModel.star.text;

    $.each(textModel.content, (i, item) => {
      if (textModel.focusIndex !== i) {
        this.canvasFn.drawImage(
          mainModel.ctx,
          item.offscreenCanvas,
          item.x,
          item.y,
          item.w,
          item.h
        );
      }
    });
  }
  initTextInfo() {
    const textModel = menuModel.star.text;

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
        },
      };
      this.canvasFn.createAndRenderOffscreenCanvas(
        item.innerTextObject,
        item.innerTextObject.w,
        item.innerTextObject.h
      );
    });
  }
  drawText(index: number) {
    const textModel = menuModel.star.text;

    $.each(textModel.content, (i, item) => {
      const obj = item.innerTextObject;

      if (i === index) {
        this.canvasFn.drawImage(
          mainModel.ctx,
          obj.offscreenCanvas,
          obj.x,
          obj.y,
          obj.w,
          obj.h
        );
      }
    });
  }
  //生成文字
  createText(ctx: any, obj: any) {
    this.canvasFn.drawText(ctx, obj.name, 0, 0, obj.font, "red");
  }
  //查找不同颜色的值和位置
  findText(ctx: any, obj: any) {
    let imageData = ctx.getImageData(0, 0, obj.w, obj.h);
    let data = imageData.data;
    let pos = [];
    for (let i = 0; i < obj.w; i += menuModel.star.text.gap) {
      for (let j = 0; j < obj.h; j += menuModel.star.text.gap) {
        let index = (j * obj.w + i) * 4;
        if (data[index] > 128) {
          pos.push({
            x: i,
            y: j,
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

      ctx.arc(
        data[i].x,
        data[i].y,
        Math.random() * menuModel.star.text.defR,
        0,
        Math.PI * 2
      );
      ctx.fillStyle =
        "rgb(" +
        Math.random() * 255 +
        "," +
        Math.random() * 255 +
        "," +
        Math.random() * 255 +
        ")";
      ctx.closePath();
      ctx.fill();
    }
  }
}
