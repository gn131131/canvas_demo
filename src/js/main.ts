/*
 * @Description: 主函数
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 16:13:25
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-03-02 18:02:55
 */
import MainController from "./controller/controller";
import TestFn from "./test";
import MainService from "./service/service";
import mainModel from "./model/model";

export default class MainFn {
  mainController: any;
  mainService: any;
  testFn: any;

  constructor() {
    this.mainController = new MainController();
    this.mainService = new MainService();
    this.testFn = new TestFn();
  }
  init() {
    if (mainModel.mode === 'normal') {
      this.mainController.init();
      this.mainService.init();
    } else if (mainModel.mode === 'test') {
      this.testFn.init();
    }
  }
};