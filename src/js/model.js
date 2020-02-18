/*
 * @Description: 常量数据模型
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 20:33:15
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-18 16:39:35
 */
import $ from "jquery";
import img1 from '../assets/image/peach/1.png';
import img2 from '../assets/image/peach/2.png';
import img3 from '../assets/image/peach/3.png';
import img4 from '../assets/image/peach/4.png';
import img5 from '../assets/image/peach/5.png';
import img6 from '../assets/image/peach/6.png';

let mainModel = {
  canvasNode: document.getElementById("mainCanvas"),
  ctx: document.getElementById("mainCanvas").getContext('2d'),
  clientWidth: document.documentElement.clientWidth,
  clientHeight: document.documentElement.clientHeight,
  game: {
    mode: 'snake',
    snake: {
      game: {
        rectWidth: 10,
        start: false
      },
      wall: {
        x: 4,
        y: 4,
        w: 80,
        h: 50,
        color: '#000'
      },
      player: {
        oriAxis: {
          x: 10,
          y: 10
        },
        oriLength: 20,
        oriSpeed: 10,
        color: '#ff0000',
        speedUpIntervalCount: 10
      },
      food: {
        count: 2
      }
    }
  },
  cursor: {
    axisX: null,
    axisY: null,
    isClicked: false,
    isMoving: false,
    rect: {
      offsetXScope: [20, -20],
      offsetYScope: [20, -20],
      widthScope: [20, 3],
      borderWidth: 1,
      speed: 1,
      showNumber: 20,
      mode: 'rect', // 'picture' 'rect'
      picArray: [img1, img2, img3, img4, img5, img6],
    }
  }
};

function linkInfo() {
  mainModel.game.snake.wall.x = mainModel.game.snake.wall.x * mainModel.game.snake.game.rectWidth;
  mainModel.game.snake.wall.y = mainModel.game.snake.wall.y * mainModel.game.snake.game.rectWidth;
  mainModel.game.snake.wall.w = mainModel.game.snake.wall.w * mainModel.game.snake.game.rectWidth;
  mainModel.game.snake.wall.h = mainModel.game.snake.wall.h * mainModel.game.snake.game.rectWidth;
  mainModel.game.snake.player.oriAxis.x = mainModel.game.snake.player.oriAxis.x * mainModel.game.snake.game.rectWidth;
  mainModel.game.snake.player.oriAxis.y = mainModel.game.snake.player.oriAxis.y * mainModel.game.snake.game.rectWidth;
}
linkInfo();

export default mainModel;