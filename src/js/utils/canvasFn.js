/*
 * @Description: canvas api封装
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 16:13:25
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-28 19:45:39
 */
import $ from "jquery";
import mainModel from "../model/model";

export default class CanvasFn {
  constructor() {}
  /**
   * @description: 设置canvas为全屏
   * @param {object} node canvas节点
   * @return: void
   * @author: Pumpking
   */
  setCanvasToFullScreen(node) {
    node.width = mainModel.clientWidth;
    node.height = mainModel.clientHeight;
  }
  /**
   * @description: 为当前元素obj生成离屏canvas并渲染，渲染方法render()，离屏canvas属性offscreenCanvas，离屏ctx属性offscreenCtx
   * @param {object} obj 当前元素信息所在对象
   * @param {number} w 离屏canvas宽度
   * @param {number} h 离屏canvas高度
   * @return: void
   * @author: Pumpking
   */
  createAndRenderOffscreenCanvas(obj, w, h) {
    obj.offscreenCanvas = document.createElement('canvas');
    obj.offscreenCanvas.width = w;
    obj.offscreenCanvas.height = h;
    obj.offscreenCtx = obj.offscreenCanvas.getContext('2d');
    obj.render(obj.offscreenCtx);
  }
  /**
   * @description: 绘制线
   * @param {object} ctx canvas
   * @param {array} array 包含顺序路径点坐标的数组，eg.[{x: 0, y: 0}]
   * @param {string} 线条颜色，默认黑色，可选
   * @param {number} 线条宽度，默认1，可选
   * @return: void
   * @author: Pumpking
   */
  drawLine(ctx, array, color, width) {
    ctx.save();
    ctx.beginPath();

    color = color || '#000';
    width = width || 1;

    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    
    ctx.moveTo(array[0].x, array[0].y);
    $.each(array, (i, item) => {
      ctx.lineTo(item.x, item.y);
    });
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
  /**
   * @description: 绘制矩形
   * @param {object} ctx canvas
   * @param {number} x x坐标
   * @param {number} y y坐标
   * @param {number} w 宽度
   * @param {number} h 高度
   * @param {string} color 填充颜色
   * @param {boolean} isEmpty 是否空心，可填
   * @param {string} borderColor 边框颜色，可填
   * @param {number} borderWidth 边框宽度，可填
   * @return: void
   * @author: Pumpking
   */  
  drawRect(ctx, x, y, w, h, color, isEmpty, borderColor, borderWidth) {
    ctx.save();
    ctx.lineWidth = borderWidth || 0;

    if (isEmpty === true) {
      ctx.strokeStyle = borderColor;
      ctx.strokeRect(x, y, w, h);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
    }
    ctx.restore();
  }
  /**
   * @description: 清除矩形
   * @param {object} ctx canvas
   * @param {number} x x坐标
   * @param {number} y y坐标
   * @param {number} w 宽度
   * @param {number} h 高度
   * @return: void
   * @author: Pumpking
   */  
  clearRect(ctx, x, y, w, h) {
    ctx.clearRect(x, y, w, h);
  }
  /**
   * @description: 绘制图片
   * @param {object} ctx canvas
   * @param {object} image 图片节点
   * @param {number} x x坐标
   * @param {number} y y坐标
   * @param {number} w 宽度
   * @param {number} h 高度
   * @return: void
   * @author: Pumpking
   */  
  drawImage(ctx, image, x, y, w, h) {
    ctx.drawImage(image, Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));
  }
  /**
   * @description: 绘制文字
   * @param {object} ctx canvas
   * @param {string} text 文字
   * @param {number} x x坐标
   * @param {number} y y坐标
   * @param {string} font 文字信息
   * @param {string} color 颜色
   * @return: void
   * @author: Pumpking
   */
  drawText(ctx, text, x, y, font, color) {
    ctx.save();

    color = color || '#000';
    const newFont = font ? (typeof font === 'number' ? (font + 'px sans-serif') : font) : '10px sans-serif';

    ctx.font = newFont;
    ctx.fillStyle = color;
    ctx.textBaseline = 'hanging'; // 主要用于离屏canvas坐标和text坐标一致，文字显示完全
    ctx.fillText(text, x, y);
    ctx.restore();
  }
  /**
   * @description: 绘制圆形
   * @param {object} ctx canvas
   * @param {number} radius 半径
   * @param {number} x x坐标
   * @param {number} y y坐标
   * @param {string} color 填充颜色
   * @param {boolean} isEmpty 是否为圆环，可选
   * @param {string} borderColor 边框颜色，可选
   * @param {number} borderWidth 边框宽度，可选
   * @return: void
   * @author: Pumpking
   */
  drawCircle(ctx, radius, x, y, color, isEmpty, borderColor, borderWidth) {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = borderWidth || 0;
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    if (isEmpty === true) {
      ctx.strokeStyle = borderColor;
    } else {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.fill();
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}