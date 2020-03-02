/*
 * @Description: 总控制器
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 16:56:12
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-03-02 18:27:24
 * TODO: 
 * 6.菜单
 * 6.1.鼠标指向，星辰移动聚焦
 * 6.3.点击跳转
 * 8.皮肤
 * 8.5.代码优化
 * 9.多人（暂不考虑）
 * 10.自食截断（暂不考虑）
 */
import Stats from "stats.js";

import CanvasFn from "../utils/canvasFn";
import mainModel from "../model/model";
import cursorModel from "../model/item/cursor";
import gameModel from "../model/item/game";
import menuModel from "../model/item/menu";

import Cursor from "./item/cursor";
import Snake from "./item/game/snake";
import Star from "./item/menu/star";


export default class MainController {
  stats: any;
  canvasFn: any;
  cursor: any;
  game: any;
  menu: any;

  constructor () {
    this.canvasFn = new CanvasFn();

    this.cursor = new Cursor();

    this.game = {
      snake: new Snake()
    };
    this.menu = {
      star: new Star()
    }
  }

  init() {

    this.initStats(); // 初始化stats.js

    this.canvasFn.setCanvasToFullScreen(mainModel.canvasNode); // 设置主canvas为全屏

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
      this.game[gameModel.mode].initRenderInfo();
    } else if (mainModel.interface === 'menu') {
      this.menu[menuModel.mode].initRenderInfo();
    }

    this.cursor.initRenderInfo();
  }
  render() {
    if (mainModel.interface === 'game') {
      this.game[gameModel.mode].render();
    } else if (mainModel.interface === 'menu') {
      this.menu[menuModel.mode].render();
    }
    
    if (cursorModel.axisX && cursorModel.axisY && cursorModel.isClicked) {
      this.cursor.render();
    } else {
      this.cursor.resetRenderInfo();
    }
  }
  clearAll() {
    this.canvasFn.clearRect(mainModel.ctx, 0, 0, mainModel.clientWidth, mainModel.clientHeight);
  }
}