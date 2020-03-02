/*
 * @Description: keyboard service
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-03-02 15:47:32
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-03-02 17:58:45
 */
import $ from "jquery";
import gameModel from "../../model/item/game";

export default class KeyboardService {
  init() {
    this.keyDown();
  }
  keyDown() {
    $(window).off('keydown').on('keydown', (e) => {
      if (gameModel.mode === 'snake') {
        e.preventDefault();
        const playerModel = gameModel[gameModel.mode].player;
        gameModel[gameModel.mode].game.start = true;
        
        switch (e.keyCode) {
          case 37:
            playerModel.position[0] !== 'right' && this.refreshPosition("left");
            break;
          case 38:
            playerModel.position[0] !== 'bottom' && this.refreshPosition("top");
            break;
          case 39:
            playerModel.position[0] !== 'left' && this.refreshPosition("right");
            break;
          case 40:
            playerModel.position[0] !== 'top' && this.refreshPosition("bottom");
            break;
        }
      }
    });
  }

  refreshPosition(pos: string) {
    const playerModel = gameModel[gameModel.mode].player;
    
    playerModel.position.shift(0);
    playerModel.position.push(pos);
  }
}