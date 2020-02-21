/*
 * @Description: 主函数
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 16:13:25
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-20 18:15:26
 */
import controllerFn from "./controller";
import testFn from "./test";

let mainObj = {
  init() {
    // controllerFn.init();

    testFn.init();
  }
};

export default mainObj;