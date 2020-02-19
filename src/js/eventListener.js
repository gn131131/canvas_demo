/*
 * @Description: 全局事件监听
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 17:04:42
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-19 15:14:44
 */
import $ from "jquery";
import mainModel from "./model";

let eventListenerFn = {
  init() {
    this.resize();
    this.mouseMove();
    this.mouseUp();
    this.mouseDown();
    this.mouseLeave();
    this.keyDown();
  },
  resize() {
    $(window).resize(() => {
      mainModel.clientWidth = document.documentElement.clientWidth;
      mainModel.clientHeight = document.documentElement.clientHeight;
    });
  },
  mouseMove() {
    $("#mainCanvas").off('mousemove').on('mousemove', (e) => {
      mainModel.cursor.isMoving = true;
      mainModel.cursor.axisX = e.offsetX;
      mainModel.cursor.axisY = e.offsetY;
    });
  },
  mouseDown() {
    $("#mainCanvas").off('mousedown').on('mousedown', (e) => {
      mainModel.cursor.isClicked = true;
    });
  },
  mouseUp() {
    $("#mainCanvas").off('mouseup').on('mouseup', (e) => {
      mainModel.cursor.isClicked = false;
    });
  },
  mouseLeave() {
    $("#mainCanvas").off('mouseleave').on('mouseleave', (e) => {
      mainModel.cursor.isClicked = false;
    });
  },
  keyDown() {
    $(window).off('keydown').on('keydown', (e) => {
      if (mainModel.game.mode === 'snake') {
        e.preventDefault();
        const playerModel = mainModel.game[mainModel.game.mode].player;
        const gameModel = mainModel.game[mainModel.game.mode].game;
        gameModel.start = true;
        
        switch (e.keyCode) {
          case 37:
            playerModel.position !== "right" && (playerModel.position = "left");
            break;
          case 38:
            playerModel.position !== "bottom" && (playerModel.position = "top");
            break;
          case 39:
            playerModel.position !== "left" && (playerModel.position = "right");
            break;
          case 40:
            playerModel.position !== "top" && (playerModel.position = "bottom");
            break;
        }
      }
    });
  }
};

export default eventListenerFn;