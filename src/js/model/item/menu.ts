/*
 * @Description: menu model
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-03-02 15:58:38
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-03-02 15:58:40
 */
let menuModel: any = {
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
      }, {
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
};

export default menuModel;