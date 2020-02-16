/*
 * @Description: 常量数据模型
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 20:33:15
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-15 14:45:03
 */
import $ from "jquery";
import img1 from '../assets/image/peach/1.png';
import img2 from '../assets/image/peach/2.png';
import img3 from '../assets/image/peach/3.png';
import img4 from '../assets/image/peach/4.png';
import img5 from '../assets/image/peach/5.png';
import img6 from '../assets/image/peach/6.png';

let mainModel = {
  canvasNode: document.getElementById("mainCanvas"),
  ctx: document.getElementById("mainCanvas").getContext('2d'),
  cursor: {
    axisX: null,
    axisY: null,
    isClicked: false,
    isMoving: false,
    rect: {
      offsetXScope: [20, -20],
      offsetYScope: [20, -20],
      widthScope: [20, 3],
      countInterval: 1,
      showNumber: 10,
      randomInfoArray: [],
      count: 0,
      currentIndex: 0,
      mode: 'rect', // 'picture' 'rect'
      picArray: [img1, img2, img3, img4, img5, img6],
      imageArray: []
    }
  }
};

export default mainModel;