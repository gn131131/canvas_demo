/*
 * @Description: 常量数据模型，设置项
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 20:33:15
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-03-02 19:15:34
 */
const canvasNode: any = document.getElementById("mainCanvas");

let mainModel: any = {
  mode: 'normal', // 'normal'、'test'
  canvasNode: canvasNode,
  ctx: canvasNode.getContext("2d"),
  clientWidth: document.documentElement.clientWidth,
  clientHeight: document.documentElement.clientHeight,
  interface: 'menu', // 'menu'、'game'
};

export default mainModel;