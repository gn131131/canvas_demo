/*
 * @Description: screen service
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-03-02 15:47:44
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-03-02 15:47:45
 */
import $ from "jquery";
import mainModel from "../../model/model";

export default class ScreenService {
  init() {
    this.resize();
  }
  resize() {
    $(window).resize(() => {
      mainModel.clientWidth = document.documentElement.clientWidth;
      mainModel.clientHeight = document.documentElement.clientHeight;
    });
  }
}