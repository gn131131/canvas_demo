/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 16:13:25
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-26 14:59:52
 */
"use strict";

import "./vendor/flexble/base.css";
import "./vendor/flexble/flexible";

import "./style.css";

import $ from "jquery";
import mainFn from "./js/main";

$(document).ready(() => {
  compatibility();
  mainFn.init();
  hotModuleSet();
});

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
      mainFn.init();
    });
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("Looks like we are in development mode!");
  }
}