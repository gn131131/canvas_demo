import $ from "jquery";

let mainModel = {
  canvasNode: document.getElementById("mainCanvas"),
  ctx: document.getElementById("mainCanvas").getContext('2d'),
  cursor: {
    axisX: undefined,
    axisY: undefined,
    isClicked: false,
    isMoving: false
  }
};

export default mainModel;