/*
 * @Description: 主函数
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 16:13:25
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-28 15:55:49
 */
import controllerFn from "./controller/controller";
import testFn from "./test";

let mainObj = {
  init() {
    controllerFn.init();

    // testFn.init();
  }
};

export default mainObj;