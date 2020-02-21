/*
 * @Description: 总控制器
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 16:56:12
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-21 16:31:12
 * TODO: 
 * 6.菜单
 * 6.1.星辰（完成）
 * 6.2.文字暗色
 * 6.2.鼠标指向，星辰移动聚焦文字，形成亮字
 * 6.3.点击跳转
 * 8.皮肤
 * 8.5.代码优化
 * 9.多人（暂不考虑）
 * 10.自食截断（暂不考虑）
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

    // 离屏渲染
    controllerFn.render();
    
    window.requestAnimationFrame(controllerFn.canvasControllerMainFn);
  },
  render() {
    let offscreenCanvas = document.createElement('canvas');
    canvasFn.setCanvasToFullScreen(offscreenCanvas);
    mainModel.ctx = offscreenCanvas.getContext("2d");

    // 界面渲染--放中间
    if (mainModel.interface === 'game') {
      controllerFn.game[mainModel.game.mode].drawGame();
    } else if (mainModel.interface === 'menu') {
      controllerFn.menu[mainModel.menu.mode].drawMenu();
    }
    // 鼠标特效渲染--放最后
    if (mainModel.cursor.axisX && mainModel.cursor.axisY && mainModel.cursor.isClicked) {
      controllerFn.cursor.drawAnimation();
    } else {
      controllerFn.cursor.resetInfo();
    }

    canvasFn.drawPic(mainModel.mainCtx, offscreenCanvas, 0, 0, mainModel.clientWidth, mainModel.clientHeight);
  },
  clearAll() {
    canvasFn.clearRect(mainModel.mainCtx, 0, 0, mainModel.clientWidth, mainModel.clientHeight);
  },
  menu: {
    star: {
      drawMenu() {
        this.initInfo();

        this.initTinyStarInfo();
        this.drawTinyStar();
        this.tinyStarMove();
        this.lineConnect();
      },
      initInfo() {
        const starModel = mainModel.menu.star;
        starModel.tiny.axis = starModel.tiny.axis || [];
      },
      initTinyStarInfo() {
        const tinyStarModel = mainModel.menu.star.tiny;

        if (tinyStarModel.axis.length === 0) {
          for (let i = 0; i < tinyStarModel.maxNumber; i++) {
            tinyStarModel.axis.push({
              x: utils.getSimpleRandomNumber(mainModel.clientWidth),
              y: utils.getSimpleRandomNumber(mainModel.clientHeight),
              velocityX: utils.getSimpleRandomNumber(tinyStarModel.speed, -tinyStarModel.speed, null, true, true),
              velocityY: utils.getSimpleRandomNumber(tinyStarModel.speed, -tinyStarModel.speed, null, true, true),
              color: tinyStarModel.color
            });
          }
        }
      },
      drawTinyStar() {
        const tinyStarModel = mainModel.menu.star.tiny;

        $.each(tinyStarModel.axis, (i, item) => {
          canvasFn.drawCircle(mainModel.ctx, tinyStarModel.radius, item.x, item.y, item.color, false);
        });
        mainModel.ctx.stroke();
      },
      tinyStarMove() {
        const tinyStarModel = mainModel.menu.star.tiny;

        $.each(tinyStarModel.axis, (i, item) => {
          item.x += item.velocityX;
          item.y += item.velocityY;
          if (item.x >= mainModel.clientWidth || item.x <= 0) {
            item.velocityX = -item.velocityX;
          }
          if (item.y >= mainModel.clientHeight || item.y <= 0) {
            item.velocityY = -item.velocityY;
          }
        });
      },
      lineConnect() {

      }
    }
  },
  game: {
    snake: {
      drawGame() {
        this.drawWall();
        this.drawPlayer();
        this.drawScore();
      },
      drawWall() {
        const gameModel = mainModel.game.snake.game;
        const wallModel = mainModel.game.snake.wall;
        const x = wallModel.x + gameModel.rectWidth / 2;
        const y = wallModel.y + gameModel.rectWidth / 2;
        wallModel.axis = [{
            x: x,
            y: y
          },
          {
            x: x + wallModel.w,
            y: y
          },
          {
            x: x + wallModel.w,
            y: y + wallModel.h
          },
          {
            x: x,
            y: y + wallModel.h
          },
        ];
        canvasFn.drawLine(mainModel.ctx, wallModel.axis, wallModel.color, gameModel.rectWidth);
        mainModel.ctx.stroke();
      },
      drawPlayer() {
        const gameModel = mainModel.game.snake.game;

        this.initPlayerInfo();
        this.drawPlayerByInfo();

        if (gameModel.start === true) {
          this.generateFoodInfo();
          this.drawFoodByInfo();

          this.playerMoveByPosition();

          this.eatFood();
          this.checkSpeedUp();
          this.checkCollision();
        }
      },
      initPlayerInfo() {
        const model = mainModel.game.snake;

        model.player.score = model.player.score || 0;
        model.player.speedCount = model.player.speedCount || 0;
        model.player.speed = model.player.speed || (60 - model.player.oriSpeed);
        model.player.count = model.player.count || 0;
        model.player.position = model.player.position || ['right', 'right'];

        model.food.axis = model.food.axis || [];

        if (model.game.start === false) {
          model.player.axis = [];
          for (let i = 0; i < model.player.oriLength; i++) {
            model.player.axis.push({
              x: model.player.oriAxis.x + i * model.game.rectWidth,
              y: model.player.oriAxis.y
            });
          }
        }
      },
      resetInfo() {
        const model = mainModel.game.snake;

        model.game.start = false;

        model.player.position = ['right', 'right'];
        model.player.count = 0;
        model.player.length = model.player.oriLength;
        model.player.speed = (60 - model.player.oriSpeed);
        model.player.score = 0;
        model.player.speedCount = 0;

        model.food.axis = [];
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

        playerModel.count++;
        if (playerModel.count === playerModel.speed) {

          if (playerModel.eating === true) {
            playerModel.eating = false;
          } else {
            playerModel.axis.shift(0);
          }

          const tempObj = JSON.parse(JSON.stringify(playerModel.axis[playerModel.axis.length - 1]));
          if (playerModel.position[1] === 'right') {
            tempObj.x = tempObj.x + gameModel.rectWidth;
          } else if (playerModel.position[1] === 'left') {
            tempObj.x = tempObj.x - gameModel.rectWidth;
          } else if (playerModel.position[1] === 'top') {
            tempObj.y = tempObj.y - gameModel.rectWidth;
          } else if (playerModel.position[1] === 'bottom') {
            tempObj.y = tempObj.y + gameModel.rectWidth;
          }
          playerModel.axis.push(tempObj);
          playerModel.count = 0;
          playerModel.position[0] = playerModel.position[1];
        }
      },
      checkCollision() {
        const gameModel = mainModel.game.snake.game;
        const wallModel = mainModel.game.snake.wall;
        const playerModel = mainModel.game.snake.player;
        const lastAxis = playerModel.axis[playerModel.axis.length - 1];
        $.each(playerModel.axis, (i, item) => {
          if (lastAxis.x === item.x && lastAxis.y === item.y && i !== playerModel.axis.length - 1) {
            this.resetInfo();
          }
        });
        if (lastAxis.x < wallModel.x + gameModel.rectWidth || lastAxis.x > wallModel.x + wallModel.w - gameModel.rectWidth || lastAxis.y < wallModel.y + gameModel.rectWidth || lastAxis.y > wallModel.y + wallModel.h - gameModel.rectWidth) {
          this.resetInfo();
        }
      },
      generateFoodInfo() {
        const foodModel = mainModel.game.snake.food;
        const gameModel = mainModel.game.snake.game;
        const wallModel = mainModel.game.snake.wall;

        if (foodModel.axis.length < foodModel.count) {
          for (let i = 0; i < foodModel.count; i++) {
            foodModel.axis.push({
              x: utils.getSimpleRandomNumber(wallModel.x + wallModel.w - gameModel.rectWidth, wallModel.x + gameModel.rectWidth, gameModel.rectWidth),
              y: utils.getSimpleRandomNumber(wallModel.y + wallModel.h - gameModel.rectWidth, wallModel.y + gameModel.rectWidth, gameModel.rectWidth),
              color: utils.getSimpleRandomColor()
            });
          }
        }
      },
      drawFoodByInfo() {
        const gameModel = mainModel.game.snake.game;
        const foodModel = mainModel.game.snake.food;
        $.each(foodModel.axis, (i, item) => {
          canvasFn.drawRect(mainModel.ctx, item.x, item.y, gameModel.rectWidth, gameModel.rectWidth, item.color);
        });
      },
      eatFood() {
        const foodModel = mainModel.game.snake.food;
        const playerModel = mainModel.game.snake.player;
        const wallModel = mainModel.game.snake.wall;
        const gameModel = mainModel.game.snake.game;

        const headAxis = playerModel.axis[playerModel.axis.length - 1];

        for (let i = 0; i < foodModel.count; i++) {
          if (foodModel.axis[i].x == headAxis.x && foodModel.axis[i].y == headAxis.y) {
            foodModel.axis[i].x = utils.getSimpleRandomNumber(wallModel.x + wallModel.w, wallModel.x, gameModel.rectWidth);
            foodModel.axis[i].y = utils.getSimpleRandomNumber(wallModel.y + wallModel.h, wallModel.y, gameModel.rectWidth);
            foodModel.axis[i].color = utils.getSimpleRandomColor();

            playerModel.eating = true;
            playerModel.score++;
            playerModel.speedCount++;
          }
        }
      },
      checkSpeedUp() {
        const playerModel = mainModel.game.snake.player;
        if (playerModel.speedCount !== 0 && playerModel.speedCount % playerModel.speedUpIntervalCount === 0 && playerModel.speed < 60) {
          playerModel.speedCount = 0;
          playerModel.speed++;
        }
      },
      drawScore() {
        const playerModel = mainModel.game.snake.player;
        canvasFn.drawText(mainModel.ctx, `${playerModel.scoreText}: ${playerModel.score}`, playerModel.scoreAxis.x, playerModel.scoreAxis.y, playerModel.scoreFont, playerModel.scoreColor);
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

      if (rectModel.count === (60 - rectModel.speed)) {
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