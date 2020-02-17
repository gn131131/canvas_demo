/*
 * @Description: 总控制器
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 16:56:12
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-15 14:45:25
 */
import eventListenerFn from "./eventListener";
import utils from "./utils";
import canvasFn from "./canvasFn";
import mainModel from "./model";
import $ from "jquery";

let controllerFn = {
  init() {
    canvasFn.setCanvasToFullScreen(mainModel.canvasNode);
    eventListenerFn.init();
    window.requestAnimationFrame(this.canvasControllerMainFn);
  },
  canvasControllerMainFn() {
    // 界面清除--放最前
    controllerFn.clearAll();
    // 界面渲染--放中间
    controllerFn.game[mainModel.game.mode].drawGame();
    // 鼠标特效渲染--放最后
    if (mainModel.cursor.axisX && mainModel.cursor.axisY && mainModel.cursor.isClicked) {
      controllerFn.cursor.drawAnimation();
    } else {
      controllerFn.cursor.resetInfo();
    }
    window.requestAnimationFrame(controllerFn.canvasControllerMainFn);
  },
  clearAll() {
    canvasFn.clearRect(mainModel.ctx, 0, 0, mainModel.clientWidth, mainModel.clientHeight);
  },
  game: {
    snake: {
      drawGame() {
        this.drawWall();
        this.drawPlayer();
      },
      drawWall() {
        const wallModel = mainModel.game.snake.wall;
        wallModel.axis = [{
            x: wallModel.x,
            y: wallModel.y
          },
          {
            x: wallModel.x + wallModel.w,
            y: wallModel.y
          },
          {
            x: wallModel.x + wallModel.w,
            y: wallModel.y + wallModel.h
          },
          {
            x: wallModel.x,
            y: wallModel.y + wallModel.h
          },
        ];
        canvasFn.drawLine(mainModel.ctx, wallModel.axis, wallModel.color, wallModel.width);
      },
      drawPlayer() {
        this.generatePlayerInfo();
        this.drawPlayerByInfo();
        this.playerMoveByPosition();
        this.checkCollision();
      },
      generatePlayerInfo() {
        const model = mainModel.game.snake;
        if (model.game.reset === true) {
          model.player.axis = [];
          for (let i = 0; i < model.player.oriLength; i++) {
            model.player.axis.push({x: model.player.oriAxis.x + i * model.game.rectWidth, y: model.player.oriAxis.y});
          }
          model.game.reset = false;
        } else {

        }
      },
      resetInfo() {
        const model = mainModel.game.snake;
        model.game.reset = true;
        model.player.position = 'right';
        model.player.count = 0;
        model.player.length = model.player.oriLength;
      },
      drawPlayerByInfo() {
        const gameModel = mainModel.game.snake.game;
        const playerModel = mainModel.game.snake.player;
        $.each(playerModel.axis, (i, item) => {
          canvasFn.drawRect(mainModel.ctx, item.x, item.y, gameModel.rectWidth, gameModel.rectWidth, playerModel.color);
        });
      },
      playerMoveByPosition() {
        const gameModel = mainModel.game.snake.game;
        const playerModel = mainModel.game.snake.player;
        playerModel.count = playerModel.count || 0;
        playerModel.count++;
        if (playerModel.count === playerModel.countInterval) {
          playerModel.axis.shift(0);

          const tempObj = JSON.parse(JSON.stringify(playerModel.axis[playerModel.axis.length - 1]));
          if (playerModel.position === 'right') {
            tempObj.x = tempObj.x + gameModel.rectWidth;
          } else if (playerModel.position === 'left') {
            tempObj.x = tempObj.x - gameModel.rectWidth;
          } else if (playerModel.position === 'top') {
            tempObj.y = tempObj.y - gameModel.rectWidth;
          } else if (playerModel.position === 'bottom') {
            tempObj.y = tempObj.y + gameModel.rectWidth;
          }
          playerModel.axis.push(tempObj);
          playerModel.count = 0;
        }
      },
      checkCollision() {
        const wallModel = mainModel.game.snake.wall;
        const playerModel = mainModel.game.snake.player;
        const lastAxis = playerModel.axis[playerModel.axis.length - 1];
        if (lastAxis.x < wallModel.x || lastAxis.x > wallModel.x + wallModel.w || lastAxis.y < wallModel.y || lastAxis.y > wallModel.y + wallModel.h) {
          this.resetInfo();
        }
      }
    }
  },
  cursor: {
    drawAnimation() {
      const rectModel = mainModel.cursor.rect;

      rectModel.count = rectModel.count || 0;
      rectModel.count++;
      rectModel.randomInfoArray = rectModel.randomInfoArray || [];
      rectModel.imageArray = rectModel.imageArray || [];

      if (rectModel.mode === 'picture' && rectModel.imageArray.length === 0) {
        $.each(rectModel.picArray, (i, item) => {
          let image = new Image();
          image.src = item;
          rectModel.imageArray.push(image);
        });
      }

      if (rectModel.count === rectModel.countInterval) {
        if (rectModel.randomInfoArray.length === rectModel.showNumber) {
          rectModel.currentIndex = rectModel.currentIndex || 0;
          rectModel.randomInfoArray[rectModel.currentIndex] = controllerFn.cursor.generateInfo(mainModel.cursor);
          if (rectModel.currentIndex === rectModel.randomInfoArray.length - 1) {
            rectModel.currentIndex = 0;
          } else {
            rectModel.currentIndex++;
          }
        } else {
          rectModel.randomInfoArray.push(controllerFn.cursor.generateInfo(mainModel.cursor));
        }
        rectModel.count = 0;
      }
      $.each(rectModel.randomInfoArray, (i, item) => {
        if (rectModel.mode === 'rect') {
          this.drawRectByRandomInfo(item);
        } else if (rectModel.mode === 'picture') {
          this.drawPicByRandomInfo(item);
        }
      });
    },
    resetInfo() {
      const rectModel = mainModel.cursor.rect;
      rectModel.randomInfoArray = [];
      rectModel.count = 0;
      rectModel.currentIndex = 0;
    },
    generateInfo(cursor) {
      const rectModel = mainModel.cursor.rect;
      const randomRectInfo = {
        x: cursor.axisX,
        y: cursor.axisY,
        randomOffsetX: utils.getSimpleRandomNumber(rectModel.offsetXScope[0], rectModel.offsetXScope[1]),
        randomOffsetY: utils.getSimpleRandomNumber(rectModel.offsetYScope[0], rectModel.offsetYScope[1]),
        randomWidth: utils.getSimpleRandomNumber(rectModel.widthScope[0], rectModel.widthScope[1]),
        randomColor: utils.getSimpleRandomColor(),
        randomImage: utils.getRandomItemFromArray(rectModel.imageArray)
      }
      randomRectInfo.randomHeight = randomRectInfo.randomWidth;
      return randomRectInfo;
    },
    drawRectByRandomInfo(obj) {
      canvasFn.drawRect(mainModel.ctx, obj.x + obj.randomOffsetX - obj.randomWidth / 2, obj.y + obj.randomOffsetY - obj.randomHeight / 2, obj.randomWidth, obj.randomHeight, null, true, obj.randomColor, mainModel.cursor.rect.borderWidth);
    },
    drawPicByRandomInfo(obj) {
      canvasFn.drawPic(mainModel.ctx, obj.randomImage, obj.x + obj.randomOffsetX - obj.randomWidth / 2, obj.y + obj.randomOffsetY - obj.randomHeight / 2, obj.randomWidth, obj.randomHeight);
    }
  }
};

export default controllerFn;