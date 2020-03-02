/*
 * @Description: 常量数据模型，设置项
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 20:33:15
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-29 15:26:33
 */
const canvasNode: any = document.getElementById("mainCanvas");

let mainModel: any = {
  canvasNode: canvasNode,
  ctx: canvasNode.getContext("2d"),
  clientWidth: document.documentElement.clientWidth,
  clientHeight: document.documentElement.clientHeight,
  interface: 'menu', // 'menu'、'game'
  menu: {
    mode: 'star',
    star: {
      tiny: {
        maxNumber: 500,
        color: '#fff',
        radius: 2,
        speed: 2
      },
      big: {

      },
      text: {
        content: [{
          name: '第一行',
          x: 200,
          y: 150,
          w: 300,
          h: 100,
          color: 'gray',
          font: 100
        },{
          name: '第二行',
          x: 200,
          y: 400,
          w: 300,
          h: 100,
          color: 'gray',
          font: 100
        }],
        focusIndex: null,
        font: 100,
        defR: 5,
        gap: 5,
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
  }
};

export default mainModel;