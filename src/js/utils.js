let utilsFn = {
  getSimpleRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  },
  getSimpleRandomColor() {
    return '#' + Math.floor( Math.random() * 0xffffff ).toString(16);
  }
};

export default utilsFn;