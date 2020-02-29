/*
 * @Description: snake
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-29 15:18:26
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-29 15:18:27
 */
import $ from "jquery";
import UtilsFn from "../utils/utils";
import CanvasFn from "../utils/canvasFn";
import mainModel from "../model/model";

const utilsFn = new UtilsFn();
const canvasFn = new CanvasFn();

export default class Snake {
  initRenderInfo() {
    this.initPlayerInfo();
    this.initWallInfo();
    this.initFoodInfo();
    this.initScoreInfo();
  }
  render() {
    this.drawPlayer();
    this.drawWall();
    this.drawFood();
    this.drawScore();
  }
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
  }
  drawPlayer() {
    const gameModel = mainModel.game.snake.game;

    this.drawPlayerByInfo();

    if (gameModel.start === true) {
      this.playerMoveByPosition();

      this.eatFood();
      this.checkSpeedUp();
      this.checkCollision();
    }
  }
  initWallInfo() {
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
    wallModel.render = () => {
      canvasFn.drawLine(wallModel.offscreenCtx, wallModel.axis, wallModel.color, gameModel.rectWidth);
    };
    canvasFn.createAndRenderOffscreenCanvas(wallModel, mainModel.clientWidth, mainModel.clientHeight);
  }
  drawWall() {
    const wallModel = mainModel.game.snake.wall;

    canvasFn.drawImage(mainModel.ctx, wallModel.offscreenCanvas, 0, 0, mainModel.clientWidth, mainModel.clientHeight);
  }
  initFoodInfo() {
    const foodModel = mainModel.game.snake.food;
    const gameModel = mainModel.game.snake.game;
    const wallModel = mainModel.game.snake.wall;

    if (foodModel.axis.length < foodModel.count) {
      for (let i = 0; i < foodModel.count; i++) {
        foodModel.axis.push({
          x: utilsFn.getSimpleRandomNumber(wallModel.x + wallModel.w - gameModel.rectWidth, wallModel.x + gameModel.rectWidth, gameModel.rectWidth),
          y: utilsFn.getSimpleRandomNumber(wallModel.y + wallModel.h - gameModel.rectWidth, wallModel.y + gameModel.rectWidth, gameModel.rectWidth),
          color: utilsFn.getSimpleRandomColor()
        });
      }
    }
  }
  drawFood() {
    const gameModel = mainModel.game.snake.game;
    const foodModel = mainModel.game.snake.food;
    $.each(foodModel.axis, (i, item) => {
      canvasFn.drawRect(mainModel.ctx, item.x, item.y, gameModel.rectWidth, gameModel.rectWidth, item.color);
    });
  }
  initScoreInfo() {

  }
  drawScore() {
    const playerModel = mainModel.game.snake.player;
    canvasFn.drawText(mainModel.ctx, `${playerModel.scoreText}: ${playerModel.score}`, playerModel.scoreAxis.x, playerModel.scoreAxis.y, playerModel.scoreFont, playerModel.scoreColor);
  }
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

    this.initRenderInfo();
  }
  drawPlayerByInfo() {
    const gameModel = mainModel.game.snake.game;
    const playerModel = mainModel.game.snake.player;
    $.each(playerModel.axis, (i, item) => {
      canvasFn.drawRect(mainModel.ctx, item.x, item.y, gameModel.rectWidth, gameModel.rectWidth, playerModel.color);
    });
  }
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

      const tempObj = utilsFn.deepClone(playerModel.axis[playerModel.axis.length - 1]);
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
  }
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
  }
  eatFood() {
    const foodModel = mainModel.game.snake.food;
    const playerModel = mainModel.game.snake.player;
    const wallModel = mainModel.game.snake.wall;
    const gameModel = mainModel.game.snake.game;

    const headAxis = playerModel.axis[playerModel.axis.length - 1];

    for (let i = 0; i < foodModel.count; i++) {
      if (foodModel.axis[i].x == headAxis.x && foodModel.axis[i].y == headAxis.y) {
        foodModel.axis[i].x = utilsFn.getSimpleRandomNumber(wallModel.x + wallModel.w, wallModel.x, gameModel.rectWidth);
        foodModel.axis[i].y = utilsFn.getSimpleRandomNumber(wallModel.y + wallModel.h, wallModel.y, gameModel.rectWidth);
        foodModel.axis[i].color = utilsFn.getSimpleRandomColor();

        playerModel.eating = true;
        playerModel.score++;
        playerModel.speedCount++;
      }
    }
  }
  checkSpeedUp() {
    const playerModel = mainModel.game.snake.player;
    if (playerModel.speedCount !== 0 && playerModel.speedCount % playerModel.speedUpIntervalCount === 0 && playerModel.speed > 1) {
      playerModel.speedCount = 0;
      playerModel.speed--;
    }
  }
}