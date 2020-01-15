import "./vendor/flexble/base.css";
import "./vendor/flexble/flexible";

import "./style.css";

import Icon from "./assets/image/a.jpg";

import _ from "lodash";

import printFn from "./js/main";

function component() {
  let element = document.createElement("div");

  element.innerHTML = _.join(["你好", "朋友"], "-");
  element.classList.add("color-red", "bg-pic-b", "font-simkai");

  let myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);

  let btn = document.createElement("button");
  btn.innerHTML = "点击我!";
  btn.onclick = printFn;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());
