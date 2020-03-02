/*
 * @Description: 主函数
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 16:13:25
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-03-02 17:43:19
 */
import MainController from "./controller/controller";
import TestFn from "./test";
import MainService from "./service/service";
import mainModel from "./model/model";

const mainController = new MainController();
const mainService = new MainService();
const testFn = new TestFn();

export default class MainFn {
  init() {
    if (mainModel.mode === 'normal') {
      mainController.init();
      mainService.init();
    } else if (mainModel.mode === 'test') {
      testFn.init();
    }
  }
};