/*
 * @Description: canvas api封装
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 16:13:25
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-20 16:15:11
 */
import $ from "jquery";
import mainModel from "./model";

let canvasFn = {
  /**
   * @description: 设置canvas为全屏
   * @param {object} node canvas节点
   * @return: void
   * @author: Pumpking
   */
  setCanvasToFullScreen(node) {
    node.width = mainModel.clientWidth;
    node.height = mainModel.clientHeight;
  },
  /**
   * @description: 绘制线
   * @param {object} ctx canvas
   * @param {array} array 包含顺序路径点坐标的数组，eg.[{x: 0, y: 0}]
   * @param {string} 线条颜色，不填默认黑色
   * @param {number} 线条宽度，不填默认1
   * @return: void
   * @author: Pumpking
   */
  drawLine(ctx, array, color, width) {
    color = color || '#000';
    width = width || 1;
    
    ctx.beginPath();
    ctx.moveTo(array[0].x, array[0].y);
    $.each(array, (i, item) => {
      ctx.lineTo(item.x, item.y);
    });
    ctx.closePath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.stroke();
  },
  /**
   * @description: 绘制矩形
   * @param {object} ctx canvas
   * @param {number} x x坐标
   * @param {number} y y坐标
   * @param {number} w 宽度
   * @param {number} h 高度
   * @param {string} color 填充颜色
   * @param {boolean} isEmpty 是否空心
   * @param {string} borderColor 边框颜色
   * @return: void
   * @author: Pumpking
   */  
  drawRect(ctx, x, y, w, h, color, isEmpty, borderColor, borderWidth) {
    ctx.lineWidth = borderWidth || 1;
    if (isEmpty === true) {
      ctx.strokeStyle = borderColor;
      ctx.strokeRect(x, y, w, h);
    } else {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
    }
  },
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
  },
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
  drawPic(ctx, image, x, y, w, h) {
    ctx.drawImage(image, x, y, w, h);
  },
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
    color = color || '#000';
    font = font || '10px sans-serif';

    ctx.font = font;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  },
  drawCircle(ctx, radius, x, y, color, isEmpty, borderColor, borderWidth) {
    ctx.lineWidth = borderWidth || 1;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    if (isEmpty === true) {
      ctx.strokeStyle = borderColor;
    } else {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.fill();
    }
    ctx.stroke();
  }
};

export default canvasFn;