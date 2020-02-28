/*
 * @Description: 公共方法
 * @Version: 1.0
 * @Autor: Pumpking
 * @Date: 2020-02-11 20:24:25
 * @LastEditors: Pumpking
 * @LastEditTime: 2020-02-28 15:55:22
 */
export class UtilsFn {
  /**
   * @description: 获得一个随机数字
   * @param {number} max 上限
   * @param {number} min 下限
   * @param {number} multiple 倍数，可选
   * @param {boolean} noZero 去0，可选
   * @param {boolean} noInt 非整数，可选
   * @return: 随机数字
   * @author: Pumpking
   */
  getSimpleRandomNumber(max: number, min: number, multiple?: number, noZero?: boolean, noInt?: boolean): number {
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
          minPer = min / (min - max);
          let randomSign = Math.random() > minPer ? 'max' : 'min';
          switch (randomSign) {
            case 'max':
              number = noInt ? (Math.random() * max) : (Math.floor(Math.random() * max));break;
            case 'min':
              number = noInt ? (-Math.random() * (-min)) : (-Math.floor(Math.random() * (-min)));break;
          }
        } else {
          number = noInt ? (-Math.random() * ((-min) - (-max) + 1) + (-max)) : (-Math.floor(Math.random() * ((-min) - (-max) + 1)) + (-max));
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
  }
  /**
   * @description: 生成随机颜色
   * @param {null} 
   * @return: 随机颜色
   * @author: Pumpking
   */
  getSimpleRandomColor(): string {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
  }
  /**
   * @description: 从数组中随机一个值
   * @param {array} array 数组
   * @return: 随机值
   * @author: Pumpking
   */
  getRandomItemFromArray(array: Array<any>): any {
    return array[Math.floor(Math.random() * array.length)];
  }
  /**
   * @description: 深拷贝
   * @param {any} 原数据 
   * @return: 深拷贝后的数据
   * @author: Pumpking
   */
  deepClone(origin: any): any {
    let toStr = Object.prototype.toString
    let isInvalid = toStr.call(origin) !== '[object Object]' && toStr.call(origin) !== '[object Array]'
    if (isInvalid) {
      return origin
    }
    let target = toStr.call(origin) === '[object Object]' ? {} : []
    for (const key in origin) {
      if (origin.hasOwnProperty(key)) {
        const item = origin[key];
        if (typeof item === 'object' && item !== null) {
          target[key] = this.deepClone(item)
        } else {
          target[key] = item
        }
      }
    }
    return target
  }
}