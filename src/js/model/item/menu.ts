/*
 * @Description: menu model
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-03-02 15:58:38
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-03-31 20:13:39
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
        name: 'AngularJS',
        x: 150,
        y: 150,
        w: 300,
        h: 50,
        color: 'gray',
        font: 50,
        url: 'https://angularjs.pumpking.xyz'
      }, {
        name: 'Angular',
        x: 150,
        y: 250,
        w: 250,
        h: 50,
        color: 'gray',
        font: 50,
        url: 'https://angular.pumpking.xyz'
      }, {
        name: 'Vue',
        x: 150,
        y: 350,
        w: 100,
        h: 50,
        color: 'gray',
        font: 50,
        url: 'https://vue.pumpking.xyz'
      }],
      focusIndex: null,
      font: 50,
      defR: 5,
      gap: 5,
      textCount: 0
    }
  }
};

export default menuModel;