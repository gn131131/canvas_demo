/*
 * @Description: 全局事件监听
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 17:04:42
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-26 17:34:14
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

      const menuText = mainModel.menu[mainModel.menu.mode].text;

      withinRect(menuText.content).then((index) => {
        menuText.focusIndex = index;
        mainModel.canvasNode.style.cursor = 'pointer';
      }, () => {
        menuText.focusIndex = null;
        mainModel.canvasNode.style.cursor = 'default';
      });

      function withinRect(textArray) {
        return new Promise((resolve, reject) => {
          let index = null;
          $.each(textArray, (i, item) => {
            if (mainModel.cursor.axisX <= item.x + item.w && mainModel.cursor.axisX >= item.x && mainModel.cursor.axisY <= item.y + item.h && mainModel.cursor.axisY >= item.y) {
              index = i;
            }
          });
          if (index !== null) {
            resolve(index);
          } else {
            reject();
          }
        });
      }
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
            playerModel.position[0] !== 'right' && refreshPosition("left");
            break;
          case 38:
            playerModel.position[0] !== 'bottom' && refreshPosition("top");
            break;
          case 39:
            playerModel.position[0] !== 'left' && refreshPosition("right");
            break;
          case 40:
            playerModel.position[0] !== 'top' && refreshPosition("bottom");
            break;
        }

        function refreshPosition(pos) {
          playerModel.position.shift(0);
          playerModel.position.push(pos);
        }
      }
    });
  }
};

export default eventListenerFn;