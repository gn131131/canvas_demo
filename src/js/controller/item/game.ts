/*
 * @Description: game controller
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-03-02 18:57:18
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-03-02 19:06:08
 */
import Snake from "./game/snake";
import gameModel from "../../model/item/game";

export default class Game {
  snake: any;
  
  constructor() {
    this.snake = new Snake()
  }

  init() {
    switch (gameModel.mode) {
      case 'snake': this.snake.init();break;
    }
  }

  render() {
    switch (gameModel.mode) {
      case 'snake': this.snake.render();break;
    }
  }
}