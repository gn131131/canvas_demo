/*
 * @Description: 常量数据模型，设置项
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 20:33:15
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-25 14:32:55
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
  ctx: document.getElementById("mainCanvas").getContext("2d"),
  clientWidth: document.documentElement.clientWidth,
  clientHeight: document.documentElement.clientHeight,
  interface: 'menu', // 'menu'、'game'
  menu: {
    mode: 'star',
    star: {
      tiny: {
        maxNumber: 200,
        color: '#fff',
        radius: 1,
        speed: 2
      },
      big: {

      },
      text: {
        content: [{
          name: '测试',
          x: 200,
          y: 150,
          w: 400,
          h: 200,
          color: '#fff',
          font: 200
        }],
        font: 200,
        focus: false,
        defR: 6,
        gap: 10,
        textCount: 0
      }
    }
  },
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
        oriLength: 5,
        oriSpeed: 50, // 最大59
        color: '#ff0000',
        speedUpIntervalCount: 5,
        scoreAxis: {
          x: 900,
          y: 40
        },
        scoreColor: '#fff',
        scoreText: '分数',
        scoreFont: 20
      },
      food: {
        count: 10
      }
    }
  },
  cursor: {
    axisX: null,
    axisY: null,
    isClicked: false,
    isMoving: false,
    rect: {
      offsetXScope: [30, -30],
      offsetYScope: [30, -30],
      widthScope: [20, 3],
      borderWidth: 1,
      speed: 59, // 最大59
      showNumber: 10,
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