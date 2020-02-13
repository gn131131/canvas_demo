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
      offsetXScope: [50, -50],
      offsetYScope: [50, -50],
      widthScope: [30, 10],
      intervalCountTimes: 4,
      showNumber: 20,
      randomInfoArray: [],
      count: 0
    }
  }
};

export default mainModel;