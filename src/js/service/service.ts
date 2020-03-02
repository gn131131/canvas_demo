/*
 * @Description: main service
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 17:04:42
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-03-02 15:50:54
 */
import MouseService from "./item/mouse";
import KeyboardService from "./item/keyboard";
import ScreenService from "./item/screen";

const mouseService = new MouseService();
const keyboardService = new KeyboardService();
const screenService = new ScreenService();

export default class MainService {
  init() {
    mouseService.init();
    keyboardService.init();
    screenService.init();
  }
}