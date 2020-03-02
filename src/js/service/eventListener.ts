/*
 * @Description: 全局事件监听
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 17:04:42
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-03-02 15:15:01
 */
import $ from "jquery";
import mainModel from "../model/model";
import CursorService from "./item/cursor";

const cursorService = new CursorService();

export default class EventListenerFn {
  init() {
    cursorService.init();
    this.resize();
    this.keyDown();
  }
  resize() {
    $(window).resize(() => {
      mainModel.clientWidth = document.documentElement.clientWidth;
      mainModel.clientHeight = document.documentElement.clientHeight;
    });
  }
  keyDown() {
    $(window).off('keydown').on('keydown', (e) => {
      if (mainModel.game.mode === 'snake') {
        e.preventDefault();
        const playerModel = mainModel.game[mainModel.game.mode].player;
        const gameModel = mainModel.game[mainModel.game.mode].game;
        gameModel.start = true;
        
        switch (e.keyCode) {
          case 37:
            playerModel.position[0] !== 'right' && this.refreshPosition("left");
            break;
          case 38:
            playerModel.position[0] !== 'bottom' && this.refreshPosition("top");
            break;
          case 39:
            playerModel.position[0] !== 'left' && this.refreshPosition("right");
            break;
          case 40:
            playerModel.position[0] !== 'top' && this.refreshPosition("bottom");
            break;
        }
      }
    });
  }

  refreshPosition(pos: string) {
    const playerModel = mainModel.game[mainModel.game.mode].player;
    
    playerModel.position.shift(0);
    playerModel.position.push(pos);
  }
}