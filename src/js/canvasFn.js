/*
 * @Description: canvas api封装
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 16:13:25
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-15 14:43:21
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
    node.width =  mainModel.clientWidth;
    node.height =  mainModel.clientHeight;
  },
  /**
   * @description: 绘制线
   * @param {type} 
   * @return: 
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
  }
};

export default canvasFn;