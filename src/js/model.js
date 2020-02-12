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
      offsetXScope: [10, -10],
      offsetYScope: [10, -10],
      widthScope: [30, 10],
      generateNumber: 2,
      clearTimes: 500
    }
  }
};

export default mainModel;