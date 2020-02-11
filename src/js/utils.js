let utilsFn = {
  getSimpleRandomNumber(min, max) {
    if (min >= 0) {
      return Math.floor(Math.random() * (max - min + 1) ) + min;
    } else if (min < 0) {
      /**
       * TODO: 如果最小值是负数怎么办
       */
    }
    
  },
  getSimpleRandomColor() {
    return '#' + Math.floor( Math.random() * 0xffffff ).toString(16);
  }
};

export default utilsFn;