/*
 * @Description: 总控制器
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 16:56:12
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-26 14:52:48
 * TODO: 
 * Critical.解耦，使用prototype+Class重构所有元素
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

    this.initStats(); // 初始化stats.js

    canvasFn.setCanvasToFullScreen(mainModel.canvasNode); // 设置主canvas为全屏

    eventListenerFn.init(); // 监听初始化

    this.initRenderInfo(); // 初始化所有渲染相关信息

    this.canvasControllerMainFn(); // 开始主函数
  },
  canvasControllerMainFn() {

    mainModel.stats.begin(); // stats.js开始

    controllerFn.clearAll(); // 界面清除--放最前

    controllerFn.render(); // 渲染

    mainModel.stats.end(); // stats.js结束

    window.requestAnimationFrame(controllerFn.canvasControllerMainFn); // RAF执行
  },
  initStats() {
    mainModel.stats = new Stats();
    mainModel.stats.showPanel(0);
    document.body.appendChild(mainModel.stats.dom);
  },
  initRenderInfo() {
    if (mainModel.interface === 'game') {
      controllerFn.game[mainModel.game.mode].initRenderInfo();
    } else if (mainModel.interface === 'menu') {
      controllerFn.menu[mainModel.menu.mode].initRenderInfo();
    }

    controllerFn.cursor.initRenderInfo();
  },
  render() {
    if (mainModel.interface === 'game') {
      controllerFn.game[mainModel.game.mode].render();
    } else if (mainModel.interface === 'menu') {
      controllerFn.menu[mainModel.menu.mode].render();
    }
    
    if (mainModel.cursor.axisX && mainModel.cursor.axisY && mainModel.cursor.isClicked) {
      controllerFn.cursor.render();
    } else {
      controllerFn.cursor.resetRenderInfo();
    }
  },
  clearAll() {
    canvasFn.clearRect(mainModel.ctx, 0, 0, mainModel.clientWidth, mainModel.clientHeight);
  },


  menu: {
    star: {
      initRenderInfo() {
        this.initTinyStarInfo();
        this.initMenuTextInfo();
        this.initTextInfo();
      },
      render() {
        this.drawTinyStar();

        if (mainModel.menu.star.text.focus) {
          this.drawText();
        } else {
          this.drawMenuText();
        }
      },
      initTinyStarInfo() {
        const tinyStarModel = mainModel.menu.star.tiny;

        tinyStarModel.axis = tinyStarModel.axis || [];

        if (tinyStarModel.axis.length === 0) {
          for (let i = 0; i < tinyStarModel.maxNumber; i++) {
            let obj = {
              x: utils.getSimpleRandomNumber(mainModel.clientWidth),
              y: utils.getSimpleRandomNumber(mainModel.clientHeight),
              velocityX: utils.getSimpleRandomNumber(tinyStarModel.speed, -tinyStarModel.speed, null, true, true),
              velocityY: utils.getSimpleRandomNumber(tinyStarModel.speed, -tinyStarModel.speed, null, true, true),
              color: utils.getSimpleRandomColor(),
              render() {
                // canvasFn.drawCircle(this.offscreenCtx, tinyStarModel.radius, 0, 0, this.color, false);
                canvasFn.drawRect(this.offscreenCtx, 0, 0, tinyStarModel.radius, tinyStarModel.radius, this.color);
              },
              move() {
                this.x += this.velocityX;
                this.y += this.velocityY;
                if (this.x >= mainModel.clientWidth || this.x <= 0) {
                  this.velocityX = -this.velocityX;
                }
                if (this.y >= mainModel.clientHeight || this.y <= 0) {
                  this.velocityY = -this.velocityY;
                }
              }
            };
            tinyStarModel.axis.push(obj);
          }
        }
        $.each(tinyStarModel.axis, (i, item) => {
          controllerFn.createAndRenderOffscreenCanvas(item, tinyStarModel.radius, tinyStarModel.radius);
        });
      },
      drawTinyStar() {
        const tinyStarModel = mainModel.menu.star.tiny;

        $.each(tinyStarModel.axis, (i, item) => {
          canvasFn.drawImage(mainModel.ctx, item.offscreenCanvas, item.x, item.y, tinyStarModel.radius, tinyStarModel.radius);
          item.move();
        });
      },
      initMenuTextInfo() {
        const textModel = mainModel.menu.star.text;

        $.each(textModel.content, (i, item) => {
          item.render = () => {
            canvasFn.drawText(item.offscreenCtx, item.name, 0, 0, item.font, item.color);
          };
          controllerFn.createAndRenderOffscreenCanvas(item, item.w, item.h);
        });
      },
      drawMenuText() {
        const textModel = mainModel.menu.star.text;

        $.each(textModel.content, (i, item) => {
          canvasFn.drawImage(mainModel.ctx, item.offscreenCanvas, item.x, item.y, item.w, item.h);
        });
      },
      initTextInfo() {
        const textModel = mainModel.menu.star.text;

        let vm = this;
        textModel.content[0].innerTextObject = {
          name: textModel.content[0].name,
          x: textModel.content[0].x,
          y: textModel.content[0].y,
          w: textModel.content[0].w,
          h: textModel.content[0].h,
          font: textModel.content[0].font,
          render() {
            vm.createText(this.offscreenCtx, textModel.content[0]);
            vm.findText(this.offscreenCtx, textModel.content[0]);
          }
        };
        controllerFn.createAndRenderOffscreenCanvas(textModel.content[0].innerTextObject, textModel.content[0].innerTextObject.w, textModel.content[0].innerTextObject.h);
      },
      drawText() {
        const obj = mainModel.menu.star.text.content[0].innerTextObject;
        canvasFn.drawImage(mainModel.ctx, obj.offscreenCanvas, obj.x, obj.y, obj.w, obj.h);
      },
      //生成文字
      createText(ctx, obj) {
        canvasFn.drawText(ctx, obj.name, 0, 0, obj.font, 'red');
      },
      //查找不同颜色的值和位置
      findText(ctx, obj) {
        let imageData = ctx.getImageData(0, 0, obj.w, obj.h);
        let data = imageData.data;
        let pos = [];
        for (let i = 0; i < obj.w; i += mainModel.menu.star.text.gap) {
          for (let j = 0; j < obj.h; j += mainModel.menu.star.text.gap) {
            let index = (j * obj.w + i) * 4;
            if (data[index] > 128) {
              pos.push({
                x: i,
                y: j
              });
            }
          }
        }
        this.createRadius(ctx, pos, obj);
      },
      createRadius(ctx, data, obj) {
        ctx.clearRect(0, 0, obj.w, obj.h);
        for (let i = 0; i < data.length; i++) {
          ctx.beginPath();

          ctx.arc(data[i].x, data[i].y, Math.random() * mainModel.menu.star.text.defR, 0, Math.PI * 2);
          ctx.fillStyle = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
          ctx.closePath();
          ctx.fill();
        }
      }
    }
  },


  game: {
    snake: {
      initRenderInfo() {
        this.initPlayerInfo();
        this.initWallInfo();
        this.initFoodInfo();
        this.initScoreInfo();
      },
      render() {
        this.drawPlayer();
        this.drawWall();
        this.drawFood();
        this.drawScore();
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
      drawPlayer() {
        const gameModel = mainModel.game.snake.game;

        this.drawPlayerByInfo();

        if (gameModel.start === true) {
          this.playerMoveByPosition();

          this.eatFood();
          this.checkSpeedUp();
          this.checkCollision();
        }
      },
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
        controllerFn.createAndRenderOffscreenCanvas(wallModel, mainModel.clientWidth, mainModel.clientHeight);
      },
      drawWall() {
        const wallModel = mainModel.game.snake.wall;

        canvasFn.drawImage(mainModel.ctx, wallModel.offscreenCanvas, 0, 0, mainModel.clientWidth, mainModel.clientHeight);
      },
      initFoodInfo() {
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
      drawFood() {
        const gameModel = mainModel.game.snake.game;
        const foodModel = mainModel.game.snake.food;
        $.each(foodModel.axis, (i, item) => {
          canvasFn.drawRect(mainModel.ctx, item.x, item.y, gameModel.rectWidth, gameModel.rectWidth, item.color);
        });
      },
      initScoreInfo() {

      },
      drawScore() {
        const playerModel = mainModel.game.snake.player;
        canvasFn.drawText(mainModel.ctx, `${playerModel.scoreText}: ${playerModel.score}`, playerModel.scoreAxis.x, playerModel.scoreAxis.y, playerModel.scoreFont, playerModel.scoreColor);
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

        this.initRenderInfo();
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
      }
    }
  },


  cursor: {
    initRenderInfo() {
      const rectModel = mainModel.cursor.rect;

      rectModel.count = rectModel.count || 0;
      rectModel.randomInfoArray = rectModel.randomInfoArray || [];
      rectModel.imageArray = rectModel.imageArray || [];
    },
    render() {
      const rectModel = mainModel.cursor.rect;

      if (rectModel.mode === 'picture' && rectModel.imageArray.length === 0) {
        $.each(rectModel.picArray, (i, item) => {
          let image = new Image();
          image.src = item;
          rectModel.imageArray.push(image);
        });
      }

      rectModel.count++;
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
    resetRenderInfo() {
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
      canvasFn.drawImage(mainModel.ctx, obj.randomImage, obj.x + obj.randomOffsetX - obj.randomWidth / 2, obj.y + obj.randomOffsetY - obj.randomHeight / 2, obj.randomWidth, obj.randomHeight);
    }
  },


  createAndRenderOffscreenCanvas(obj, w, h) {
    obj.offscreenCanvas = document.createElement('canvas');
    obj.offscreenCanvas.width = w;
    obj.offscreenCanvas.height = h;
    obj.offscreenCtx = obj.offscreenCanvas.getContext('2d');
    obj.render(obj.offscreenCtx);
  }
};

export default controllerFn;