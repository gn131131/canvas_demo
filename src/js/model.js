import $ from "jquery";

let mainModel = {
  canvasNode: document.getElementById("mainCanvas"),
  ctx: document.getElementById("mainCanvas").getContext('2d'),
  cursor: {
    axisX: undefined,
    axisY: undefined,
    isClicked: false,
    isMoving: false,
    rect: {
      offsetXScope: [30, -30],
      offsetYScope: [30, -30],
      widthScope: [20, 10],
      generateNumber: 5,
      clearTimes: 80
    }
  }
};

export default mainModel;