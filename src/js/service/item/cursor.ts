/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-03-02 15:08:03
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-03-02 15:27:17
 */
import $ from "jquery";
import mainModel from "../../model/model";
import cursorModel from "../../model/item/cursor";

export default class CursorService {
  init() {
    this.mouseMove();
    this.mouseUp();
    this.mouseDown();
    this.mouseLeave();
  }
  mouseMove() {
    $("#mainCanvas").off('mousemove').on('mousemove', (e) => {
      cursorModel.isMoving = true;
      cursorModel.axisX = e.offsetX;
      cursorModel.axisY = e.offsetY;

      const menuText = mainModel.menu[mainModel.menu.mode].text;

      withinRect(menuText.content).then((index) => {
        menuText.focusIndex = index;
        mainModel.canvasNode.style.cursor = 'pointer';
      }, () => {
        menuText.focusIndex = null;
        mainModel.canvasNode.style.cursor = 'default';
      });

      function withinRect(textArray: Array<any>) {
        return new Promise((resolve, reject) => {
          let index = null;
          $.each(textArray, (i, item) => {
            if (cursorModel.axisX <= item.x + item.w && cursorModel.axisX >= item.x && cursorModel.axisY <= item.y + item.h && cursorModel.axisY >= item.y) {
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
  }
  mouseDown() {
    $("#mainCanvas").off('mousedown').on('mousedown', (e) => {
      cursorModel.isClicked = true;
    });
  }
  mouseUp() {
    $("#mainCanvas").off('mouseup').on('mouseup', (e) => {
      cursorModel.isClicked = false;
    });
  }
  mouseLeave() {
    $("#mainCanvas").off('mouseleave').on('mouseleave', (e) => {
      cursorModel.isClicked = false;
    });
  }
}