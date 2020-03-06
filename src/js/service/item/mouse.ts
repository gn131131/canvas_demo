/*
 * @Description: mouse service
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-03-02 15:08:03
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-03-06 16:16:09
 */
import $ from "jquery";
import mainModel from "../../model/model";
import cursorModel from "../../model/item/cursor";
import menuModel from "../../model/item/menu";

export default class MouseService {
  init() {
    this.click();
    this.mouseMove();
    this.mouseUp();
    this.mouseDown();
    this.mouseLeave();
  }
  click() {
    $("#mainCanvas").off('click').on('click', (e) => {
      const menuText = menuModel[menuModel.mode].text;

      this.withinRect(menuText.content).then((index: number) => {
        window.open(menuText.content[index].url);
      });
    });
  }
  mouseMove() {
    $("#mainCanvas").off('mousemove').on('mousemove', (e) => {
      cursorModel.isMoving = true;
      cursorModel.axisX = e.offsetX;
      cursorModel.axisY = e.offsetY;

      const menuText = menuModel[menuModel.mode].text;

      this.withinRect(menuText.content).then((index) => {
        menuText.focusIndex = index;
        mainModel.canvasNode.style.cursor = 'pointer';
      }, () => {
        menuText.focusIndex = null;
        mainModel.canvasNode.style.cursor = 'default';
      });
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

  withinRect(textArray: Array<any>) {
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
}