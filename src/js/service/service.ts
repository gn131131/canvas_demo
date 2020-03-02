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

export default class MainService {
  mouseService: any;
  keyboardService: any;
  screenService: any;

  constructor() {
    this.mouseService = new MouseService();
    this.keyboardService = new KeyboardService();
    this.screenService = new ScreenService();
  }
  
  init() {
    this.mouseService.init();
    this.keyboardService.init();
    this.screenService.init();
  }
}