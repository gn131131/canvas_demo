let utilsFn = {
  /**
   * @description: 获得一个随机数字
   * @param {number} max
   * @param {number} min
   * @return: 随机数字
   * @author: Pumpking
   */  
  getSimpleRandomNumber(max, min) {
    if (!min) {
      min = 0;
    }
    if (min >= 0) {
      return Math.floor(Math.random() * (max - min + 1) ) + min;
    } else if (min < 0) {
      let maxPer = 0, minPer = 0, randomPer;
      if (max > 0) {
        maxPer = max / (max - min);
        minPer = -min / (max - min);
        let randomSign = Math.random() > maxPer ? 'min' : 'max';
        switch (randomSign) {
          case 'max': return Math.floor(Math.random() * max);
          case 'min': return -Math.floor(Math.random() * (-min));
        }
      } else {
        return -Math.floor(Math.random() * ((-min) - (-max) + 1) ) + (-max);
      }
    }
  },
  /**
   * @description: 生成随机数字
   * @param {null} 
   * @return: 随机数字
   * @author: Pumpking
   */
  getSimpleRandomColor() {
    return '#' + Math.floor( Math.random() * 0xffffff ).toString(16);
  },
  /**
   * @description: 从图片数组中随机一个值
   * @param {array} array 
   * @return: 随机值
   * @author: Pumpking
   */
  getRandomItemFromArray(array) {
    return array[Math.floor(Math.random()*array.length)];
  }
};

export default utilsFn;