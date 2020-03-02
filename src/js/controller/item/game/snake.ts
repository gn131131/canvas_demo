/*
 * @Description: snake
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-29 15:18:26
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-03-02 16:17:06
 */
import $ from "jquery";
import UtilsFn from "../../../utils/utils";
import CanvasFn from "../../../utils/canvasFn";
import mainModel from "../../../model/model";
import gameModel from "../../../model/item/game";

const utilsFn = new UtilsFn();
const canvasFn = new CanvasFn();

export default class Snake {
  rectWidth: number;

  constructor() {
    this.rectWidth = gameModel.snake.game.rectWidth;
  }

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
    const playerModel = gameModel.snake.player;

    playerModel.score = playerModel.score || 0;
    playerModel.speedCount = playerModel.speedCount || 0;
    playerModel.speed = playerModel.speed || (60 - playerModel.oriSpeed);
    playerModel.count = playerModel.count || 0;
    playerModel.position = playerModel.position || ['right', 'right'];
    gameModel.snake.food.axis = gameModel.snake.food.axis || [];

    if (gameModel.snake.game.start === false) {
      playerModel.axis = [];
      for (let i = 0; i < playerModel.oriLength; i++) {
        playerModel.axis.push({
          x: playerModel.oriAxis.x + i * this.rectWidth,
          y: playerModel.oriAxis.y
        });
      }
    }
  }
  drawPlayer() {
    this.drawPlayerByInfo();

    if (gameModel.snake.game.start === true) {
      this.playerMoveByPosition();

      this.eatFood();
      this.checkSpeedUp();
      this.checkCollision();
    }
  }
  initWallInfo() {
    const wallModel = gameModel.snake.wall;
    
    const x = wallModel.x + this.rectWidth / 2;
    const y = wallModel.y + this.rectWidth / 2;
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
      canvasFn.drawLine(wallModel.offscreenCtx, wallModel.axis, wallModel.color, this.rectWidth);
    };
    canvasFn.createAndRenderOffscreenCanvas(wallModel, mainModel.clientWidth, mainModel.clientHeight);
  }
  drawWall() {
    const wallModel = gameModel.snake.wall;

    canvasFn.drawImage(mainModel.ctx, wallModel.offscreenCanvas, 0, 0, mainModel.clientWidth, mainModel.clientHeight);
  }
  initFoodInfo() {
    const foodModel = gameModel.snake.food;
    const wallModel = gameModel.snake.wall;

    if (foodModel.axis.length < foodModel.count) {
      for (let i = 0; i < foodModel.count; i++) {
        foodModel.axis.push({
          x: utilsFn.getSimpleRandomNumber(wallModel.x + wallModel.w - this.rectWidth, wallModel.x + this.rectWidth, this.rectWidth),
          y: utilsFn.getSimpleRandomNumber(wallModel.y + wallModel.h - this.rectWidth, wallModel.y + this.rectWidth, this.rectWidth),
          color: utilsFn.getSimpleRandomColor()
        });
      }
    }
  }
  drawFood() {
    const foodModel = gameModel.snake.food;
    $.each(foodModel.axis, (i, item) => {
      canvasFn.drawRect(mainModel.ctx, item.x, item.y, this.rectWidth, this.rectWidth, item.color);
    });
  }
  initScoreInfo() {

  }
  drawScore() {
    const playerModel = gameModel.snake.player;
    canvasFn.drawText(mainModel.ctx, `${playerModel.scoreText}: ${playerModel.score}`, playerModel.scoreAxis.x, playerModel.scoreAxis.y, playerModel.scoreFont, playerModel.scoreColor);
  }
  resetInfo() {
    const model = gameModel.snake;

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
    const playerModel = gameModel.snake.player;
    $.each(playerModel.axis, (i, item) => {
      canvasFn.drawRect(mainModel.ctx, item.x, item.y, this.rectWidth, this.rectWidth, playerModel.color);
    });
  }
  playerMoveByPosition() {
    const playerModel = gameModel.snake.player;

    playerModel.count++;
    if (playerModel.count === playerModel.speed) {

      if (playerModel.eating === true) {
        playerModel.eating = false;
      } else {
        playerModel.axis.shift(0);
      }

      const tempObj = utilsFn.deepClone(playerModel.axis[playerModel.axis.length - 1]);
      if (playerModel.position[1] === 'right') {
        tempObj.x = tempObj.x + this.rectWidth;
      } else if (playerModel.position[1] === 'left') {
        tempObj.x = tempObj.x - this.rectWidth;
      } else if (playerModel.position[1] === 'top') {
        tempObj.y = tempObj.y - this.rectWidth;
      } else if (playerModel.position[1] === 'bottom') {
        tempObj.y = tempObj.y + this.rectWidth;
      }
      playerModel.axis.push(tempObj);
      playerModel.count = 0;
      playerModel.position[0] = playerModel.position[1];
    }
  }
  checkCollision() {
    const wallModel = gameModel.snake.wall;
    const playerModel = gameModel.snake.player;
    const lastAxis = playerModel.axis[playerModel.axis.length - 1];
    $.each(playerModel.axis, (i, item) => {
      if (lastAxis.x === item.x && lastAxis.y === item.y && i !== playerModel.axis.length - 1) {
        this.resetInfo();
      }
    });
    if (lastAxis.x < wallModel.x + this.rectWidth || lastAxis.x > wallModel.x + wallModel.w - this.rectWidth || lastAxis.y < wallModel.y + this.rectWidth || lastAxis.y > wallModel.y + wallModel.h - this.rectWidth) {
      this.resetInfo();
    }
  }
  eatFood() {
    const foodModel = gameModel.snake.food;
    const playerModel = gameModel.snake.player;
    const wallModel = gameModel.snake.wall;

    const headAxis = playerModel.axis[playerModel.axis.length - 1];

    for (let i = 0; i < foodModel.count; i++) {
      if (foodModel.axis[i].x == headAxis.x && foodModel.axis[i].y == headAxis.y) {
        foodModel.axis[i].x = utilsFn.getSimpleRandomNumber(wallModel.x + wallModel.w, wallModel.x, this.rectWidth);
        foodModel.axis[i].y = utilsFn.getSimpleRandomNumber(wallModel.y + wallModel.h, wallModel.y, this.rectWidth);
        foodModel.axis[i].color = utilsFn.getSimpleRandomColor();

        playerModel.eating = true;
        playerModel.score++;
        playerModel.speedCount++;
      }
    }
  }
  checkSpeedUp() {
    const playerModel = gameModel.snake.player;
    if (playerModel.speedCount !== 0 && playerModel.speedCount % playerModel.speedUpIntervalCount === 0 && playerModel.speed > 1) {
      playerModel.speedCount = 0;
      playerModel.speed--;
    }
  }
}