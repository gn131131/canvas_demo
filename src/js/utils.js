/*
 * @Description: 公共方法
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 20:24:25
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-19 14:43:53
 */
let utilsFn = {
  /**
   * @description: 获得一个随机数字
   * @param {number} max 上限
   * @param {number} min 下限
   * @param {number} multiple 倍数，可填
   * @return: 随机数字
   * @author: Pumpking
   */
  getSimpleRandomNumber(max, min, multiple) {
    let number = null;
    if (!min) {
      min = 0;
    }
    function getResult() {
      if (min >= 0) {
        number = Math.floor(Math.random() * (max - min + 1)) + min;
      } else if (min < 0) {
        let maxPer = 0;
        if (max > 0) {
          maxPer = max / (max - min);
          let randomSign = Math.random() > maxPer ? 'min' : 'max';
          switch (randomSign) {
            case 'max':
              number = Math.floor(Math.random() * max);break;
            case 'min':
              number = -Math.floor(Math.random() * (-min));break;
          }
        } else {
          number = -Math.floor(Math.random() * ((-min) - (-max) + 1)) + (-max);
        }
      }
    }
    if (multiple) {
      while (number === null || (number / multiple) % 1 !== 0) {
        getResult();
      }
    } else {
      getResult();
    }
    
    return number;
  },
  /**
   * @description: 生成随机颜色
   * @param {null} 
   * @return: 随机颜色
   * @author: Pumpking
   */
  getSimpleRandomColor() {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
  },
  /**
   * @description: 从数组中随机一个值
   * @param {array} array 数组
   * @return: 随机值
   * @author: Pumpking
   */
  getRandomItemFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
};

export default utilsFn;