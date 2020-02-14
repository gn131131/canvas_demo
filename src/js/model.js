import $ from "jquery";

let mainModel = {
  canvasNode: document.getElementById("mainCanvas"),
  ctx: document.getElementById("mainCanvas").getContext('2d'),
  cursor: {
    axisX: null,
    axisY: null,
    isClicked: false,
    isMoving: false,
    rect: {
      offsetXScope: [50, -50],
      offsetYScope: [50, -50],
      widthScope: [25, 5],
      countInterval: 1,
      showNumber: 20,
      randomInfoArray: [],
      count: 0,
      currentIndex: 0,
      mode: 'picture',
      picArray: [
        '../assets/image/peach/1.png',
        '../assets/image/peach/2.png',
        '../assets/image/peach/3.png',
        '../assets/image/peach/4.png',
        '../assets/image/peach/5.png',
        '../assets/image/peach/6.png'
      ],
      imageArray: []
    }
  }
};

export default mainModel;