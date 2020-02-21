/*
 * @Description: 公共方法
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 20:24:25
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-21 14:23:21
 */
let utilsFn = {
  /**
   * @description: 获得一个随机数字
   * @param {number} max 上限
   * @param {number} min 下限
   * @param {number} multiple 倍数，可填
   * @param {boolean} noZero 去0，可填
   * @param {boolean} noInt 非整数，可填
   * @return: 随机数字
   * @author: Pumpking
   */
  getSimpleRandomNumber(max, min, multiple, noZero, noInt) {
    let number = null;
    if (!min) {
      min = 0;
    }
    function getResult() {
      if (min >= 0) {
        number = noInt ? Math.random() * (max - min + 1) + min : Math.floor(Math.random() * (max - min + 1)) + min;
      } else if (min < 0) {
        let minPer = 0;
        if (max >= 0) {
          minPer = min / (max - min);
          let randomSign = Math.random() > minPer ? 'max' : 'min';
          switch (randomSign) {
            case 'max':
              number = noInt ? Math.random() * max : Math.floor(Math.random() * max);break;
            case 'min':
              number = noInt ? -Math.random() * (-min) : -Math.floor(Math.random() * (-min));break;
          }
        } else {
          number = noInt ? -Math.random() * ((-min) - (-max) + 1) + (-max) : -Math.floor(Math.random() * ((-min) - (-max) + 1)) + (-max);
        }
      }
      if (multiple && !noInt) {
        if (number / multiple !== 0) {
          if (number % multiple >= multiple / 2) {
            number = Math.ceil(number / multiple) * multiple;
          } else {
            number = Math.floor(number / multiple) * multiple;
          }
        }
      }
    }
    if (noZero) {
      while (number === null || number === 0) {
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