import "./vendor/flexble/base.css";
import "./vendor/flexble/flexible";

import "./style.css";

import Icon from "./assets/image/a.jpg";

import _ from "lodash";

import mainFn from "./js/main";

function init() {
  mainFn.cursorMove();
}
init();

if (module.hot) {
  module.hot.accept("./js/main.js", function() {
    console.log("热部署模块更新");
    init();
  });
}

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}
