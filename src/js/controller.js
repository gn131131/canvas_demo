/*
 * @Description: 总控制器
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 16:56:12
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-25 14:34:10
 * TODO: 
 * Critical.性能优化
 * 6.菜单
 * 6.1.鼠标指向，星辰移动聚焦
 * 6.2.文字暗色
 * 6.3.星辰形成亮字
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
import Stats from "stats.js";

let controllerFn = {
  init() {
    canvasFn.setCanvasToFullScreen(mainModel.canvasNode);
    eventListenerFn.init();
    this.initStats();
    window.requestAnimationFrame(this.canvasControllerMainFn);
  },
  canvasControllerMainFn() {
    mainModel.stats.begin();

    // 创建canvas
    controllerFn.createCanvas();

    // 界面清除--放最前
    controllerFn.clearAll();

    // 离屏渲染
    controllerFn.render();

    mainModel.stats.end();

    window.requestAnimationFrame(controllerFn.canvasControllerMainFn);
  },
  initStats() {
    mainModel.stats = new Stats();
    mainModel.stats.showPanel(0);
    document.body.appendChild(mainModel.stats.dom);
  },
  createCanvas() {
    mainModel.textCanvas = document.createElement('canvas');
    canvasFn.setCanvasToFullScreen(mainModel.textCanvas);
    mainModel.textCtx = mainModel.textCanvas.getContext('2d');

    mainModel.offscreenCanvas = document.createElement('canvas');
    canvasFn.setCanvasToFullScreen(mainModel.offscreenCanvas);
    mainModel.ctx = mainModel.offscreenCanvas.getContext("2d");
  },
  render() {
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

    canvasFn.drawPic(mainModel.mainCtx, mainModel.offscreenCanvas, 0, 0, mainModel.clientWidth, mainModel.clientHeight);
    canvasFn.drawPic(mainModel.mainCtx, mainModel.textCanvas, 0, 0, mainModel.clientWidth, mainModel.clientHeight);
  },
  clearAll() {
    canvasFn.clearRect(mainModel.mainCtx, 0, 0, mainModel.clientWidth, mainModel.clientHeight);
  },
  menu: {
    star: {
      drawMenu() {
        this.initInfo();

        this.drawTinyStar();
        this.tinyStarMoveAuto();

        if (mainModel.menu.star.text.focus) {
          this.drawText();
        } else {
          this.drawMenuText();
        }
      },
      initInfo() {
        this.initMenuTextInfo();
        this.initTinyStarInfo();
      },
      initMenuTextInfo() {

      },
      drawMenuText() {
        const textModel = mainModel.menu.star.text;

        $.each(textModel.content, (i, item) => {
          canvasFn.drawText(mainModel.ctx, item.name, item.x, item.y, item.font, item.color);
        });
      },
      initTinyStarInfo() {
        const tinyStarModel = mainModel.menu.star.tiny;

        tinyStarModel.axis = tinyStarModel.axis || [];

        if (tinyStarModel.axis.length === 0) {
          for (let i = 0; i < tinyStarModel.maxNumber; i++) {
            tinyStarModel.axis.push({
              x: utils.getSimpleRandomNumber(mainModel.clientWidth),
              y: utils.getSimpleRandomNumber(mainModel.clientHeight),
              velocityX: utils.getSimpleRandomNumber(tinyStarModel.speed, -tinyStarModel.speed, null, true, true),
              velocityY: utils.getSimpleRandomNumber(tinyStarModel.speed, -tinyStarModel.speed, null, true, true),
              color: utils.getSimpleRandomColor()
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
      tinyStarMoveAuto() {
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
      drawText() {
        const textModel = mainModel.menu.star.text;
        if(textModel.textCount===textModel.content.length){
          textModel.textCount=0;
        }
        
        let ctx = mainModel.textCtx;

        this.createText(ctx, textModel.content[textModel.textCount].name);
        textModel.textCount++;
        this.findText(ctx);
      },
      //生成文字
      createText(ctx, text) {
        ctx.clearRect(0, 0, mainModel.clientWidth, mainModel.clientHeight);
        ctx.font = mainModel.menu.star.text.font + 'px "微软雅黑';
        ctx.fillStyle = 'red';

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, mainModel.clientWidth / 2, mainModel.clientHeight / 2);
      },
      createRadius(ctx, data) {
        ctx.clearRect(0, 0, mainModel.clientWidth, mainModel.clientHeight);
        for (let i = 0; i < data.length; i++) {
          ctx.beginPath();

          ctx.arc(data[i].x, data[i].y, Math.random() * mainModel.menu.star.text.defR, 0, Math.PI * 2);
          ctx.fillStyle = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
          ctx.closePath();
          ctx.fill();
        }
      },
      //查找不同颜色的值和位置
      findText(ctx) {
        let imageData = ctx.getImageData(0, 0, mainModel.clientWidth, mainModel.clientHeight);
        let data = imageData.data;
        let pos = [];
        for (let i = 0; i < mainModel.clientWidth; i += mainModel.menu.star.text.gap) {
          for (let j = 0; j < mainModel.clientHeight; j += mainModel.menu.star.text.gap) {
            let index = (j * mainModel.clientWidth + i) * 4;
            if (data[index] > 128) {
              pos.push({
                x: i,
                y: j
              });
            }
          }
        }
        this.createRadius(ctx, pos);
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

          const tempObj = utils.deepClone(playerModel.axis[playerModel.axis.length - 1]);
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
        if (playerModel.speedCount !== 0 && playerModel.speedCount % playerModel.speedUpIntervalCount === 0 && playerModel.speed > 1) {
          playerModel.speedCount = 0;
          playerModel.speed--;
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