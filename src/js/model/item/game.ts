/*
 * @Description: game model
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-03-02 16:04:13
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-03-02 16:24:44
 */
let gameModel: any = {
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
};

gameModel.snake.wall.x = gameModel.snake.wall.x * gameModel.snake.game.rectWidth;
gameModel.snake.wall.y = gameModel.snake.wall.y * gameModel.snake.game.rectWidth;
gameModel.snake.wall.w = gameModel.snake.wall.w * gameModel.snake.game.rectWidth;
gameModel.snake.wall.h = gameModel.snake.wall.h * gameModel.snake.game.rectWidth;
gameModel.snake.player.oriAxis.x = gameModel.snake.player.oriAxis.x * gameModel.snake.game.rectWidth;
gameModel.snake.player.oriAxis.y = gameModel.snake.player.oriAxis.y * gameModel.snake.game.rectWidth;

export default gameModel;