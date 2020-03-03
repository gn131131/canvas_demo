/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 16:13:25
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-03-02 17:53:57
 */
"use strict";

import "./vendor/flexble/base.css";
import "./vendor/flexble/flexible";

import "./style.css";

import $ from "jquery";
import MainFn from "./js/main";

$(document).ready(() => {
  // compatibility();
  init();
  hotModuleSet();
});

function init() {
  const mainFn = new MainFn();
  mainFn.init();
}
// ts 兼容性写法不可行
// function compatibility() {
//   if (!window.requestAnimationFrame) {
//     window.requestAnimationFrame = (
//       window.webkitRequestAnimationFrame ||
//       window.mozRequestAnimationFrame ||
//       window.msRquestAniamtionFrame ||
//       window.oRequestAnimationFrame ||
//       function (callback: any) {
//         return setTimeout(callback, Math.floor(1000 / 60))
//       }
//     )
//   }
// }

function hotModuleSet() {
  if (module.hot) {
    module.hot.accept("./js/main.ts", () => {
      console.log("热部署模块更新");
      init();
    });
  }


  if (process.env.NODE_ENV !== "production") {
    console.log("Looks like we are in development mode!");
  }
}