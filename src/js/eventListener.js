/*
 * @Description: 全局事件监听
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 17:04:42
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-15 14:45:16
 */
import $ from "jquery";
import mainModel from "./model";

let eventListenerFn = {
  init() {
    this.mouseMove();
    this.mouseUp();
    this.mouseDown();
    this.mouseLeave();
    this.keyDown();
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
      // e.preventDefault();
      // const playerModel = mainModel.game.adventure.player;
      // switch (e.keyCode) {
      //   case 37: playerModel.x = playerModel.oldX - playerModel.speed;break;
      //   // case 38: playerModel.y = playerModel.oldY - playerModel.speed;break;
      //   case 39: playerModel.x = playerModel.oldX + playerModel.speed;break;
      //   // case 40: playerModel.y = playerModel.oldY + playerModel.speed;break;
      // }
    });
  }
};

export default eventListenerFn;