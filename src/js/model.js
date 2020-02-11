import $ from "jquery";

let mainModel = {
  ctx: document.getElementById("mainCanvas").getContext('2d'),
  cursor: {
    axisX: undefined,
    axisY: undefined
  }
};

export default mainModel;