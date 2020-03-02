/*
 * @Description: menu controller
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-03-02 18:57:25
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-03-02 18:57:27
 */
import Star from "./menu/star";
import menuModel from "../../model/item/menu";

export default class Menu {
  star: any;
  
  constructor() {
    this.star = new Star()
  }

  init() {
    switch (menuModel.mode) {
      case 'snake': this.star.init();break;
    }
  }

  render() {
    switch (menuModel.mode) {
      case 'snake': this.star.render();break;
    }
  }
}