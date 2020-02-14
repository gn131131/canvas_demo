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
      offsetXScope: [30, -30],
      offsetYScope: [30, -30],
      widthScope: [25, 5],
      countInterval: 1,
      showNumber: 10,
      randomInfoArray: [],
      count: 0,
      currentIndex: 0
    }
  }
};

export default mainModel;