let utilsFn = {
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
  getSimpleRandomColor() {
    return '#' + Math.floor( Math.random() * 0xffffff ).toString(16);
  },
  getRandomPicFromArray(array) {
    return array[Math.floor(Math.random()*array.length)];
  }
};

export default utilsFn;