/*
 * @Description: 总控制器
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 16:56:12
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-29 15:25:29
 * TODO: 
 * Critical.解耦，使用prototype+Class重构所有元素
 * 6.菜单
 * 6.1.鼠标指向，星辰移动聚焦
 * 6.2.文字暗色
 * 6.3.星辰形成亮字
 * 6.3.点击跳转
 * 8.皮肤
 * 8.5.代码优化
 * 9.多人（暂不考虑）
 * 10.自食截断（暂不考虑）
 */
import EventListenerFn from "./eventListener";
import CanvasFn from "../utils/canvasFn";
import mainModel from "../model/model";
import Stats from "stats.js";

import Cursor from "./cursor";
import Snake from "./snake";
import Star from "./star";

const eventListenerFn = new EventListenerFn();
const canvasFn = new CanvasFn();

const cursor = new Cursor();
const snake = new Snake();
const star = new Star();

export default class ControllerFn {
  stats: any;

  game: any = {
    snake: snake
  };

  menu: any ={
    star: star
  };

  init() {

    this.initStats(); // 初始化stats.js

    canvasFn.setCanvasToFullScreen(mainModel.canvasNode); // 设置主canvas为全屏

    eventListenerFn.init(); // 监听初始化

    this.initRenderInfo(); // 初始化所有渲染相关信息

    this.canvasControllerMainFn(); // 开始主函数
  }
  
  canvasControllerMainFn = () => {

    this.stats.begin(); // stats.js开始

    this.clearAll(); // 界面清除--放最前

    this.render(); // 渲染

    this.stats.end(); // stats.js结束

    window.requestAnimationFrame(this.canvasControllerMainFn); // RAF执行
  }
  initStats() {
    this.stats = new Stats();
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);
  }
  initRenderInfo() {
    if (mainModel.interface === 'game') {
      this.game[mainModel.game.mode].initRenderInfo();
    } else if (mainModel.interface === 'menu') {
      this.menu[mainModel.menu.mode].initRenderInfo();
    }

    cursor.initRenderInfo();
  }
  render() {
    if (mainModel.interface === 'game') {
      this.game[mainModel.game.mode].render();
    } else if (mainModel.interface === 'menu') {
      this.menu[mainModel.menu.mode].render();
    }
    
    if (mainModel.cursor.axisX && mainModel.cursor.axisY && mainModel.cursor.isClicked) {
      cursor.render();
    } else {
      cursor.resetRenderInfo();
    }
  }
  clearAll() {
    canvasFn.clearRect(mainModel.ctx, 0, 0, mainModel.clientWidth, mainModel.clientHeight);
  }
}