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
  compatibility();
  mainFn.init();
}

function compatibility() {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRquestAniamtionFrame ||
      window.oRequestAnimationFrame ||
      function (callback) {
        return setTimeout(callback, Math.floor(1000 / 60))
      }
    )
  }
}

function hotModuleSet() {
  if (module.hot) {
    module.hot.accept("./js/main.js", function () {
      console.log("热部署模块更新");
      init();
    });
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("Looks like we are in development mode!");
  }
}