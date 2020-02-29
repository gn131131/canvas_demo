/*
 * @Description: 主函数
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 16:13:25
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-28 15:55:49
 */
import ControllerFn from "./controller/controller";
import TestFn from "./test";

const controllerFn = new ControllerFn();
const testFn = new TestFn();

export default class MainFn {
  init() {
    controllerFn.init();

    // testFn.init();
  }
};