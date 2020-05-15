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
  compatibility();
  init();
  hotModuleSet();
});

function init() {
  const mainFn = new MainFn();
  mainFn.init();
}

// raf兼容性
function compatibility() {
  const win: any = window;
  let lastTime = 0;
  const vendors = ["webkit", "moz"];
  for (let x = 0; x < vendors.length && !win.requestAnimationFrame; ++x) {
    win.requestAnimationFrame = win[vendors[x] + "RequestAnimationFrame"];
    win.cancelAnimationFrame =
      win[vendors[x] + "CancelAnimationFrame"] || // Webkit中此取消方法的名字变了
      win[vendors[x] + "CancelRequestAnimationFrame"];
  }
  if (!win.requestAnimationFrame) {
    win.requestAnimationFrame = function (callback: any) {
      const currTime = new Date().getTime();
      const timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
      const id = win.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!win.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }
}

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
