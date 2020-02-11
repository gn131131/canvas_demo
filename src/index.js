"use strict";

import "./vendor/flexble/base.css";
import "./vendor/flexble/flexible";

import "./style.css";

import $ from "jquery";
import mainFn from "./js/main";

$(document).ready(() => {
  init();
  hotModuleSet();
});

function init() {
  mainFn.init();
}

function hotModuleSet() {
  if (module.hot) {
    module.hot.accept("./js/main.js", function() {
      console.log("热部署模块更新");
      init();
    });
  }
  
  if (process.env.NODE_ENV !== "production") {
    console.log("Looks like we are in development mode!");
  }
}