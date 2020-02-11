let canvasFn = {
  drawLine() {
    
  },
  drawRect() {

  },
  drawPic() {

  },
  startAnimation: (animationFn) => {
    animationFn();
    window.requestAnimationFrame(this.startAnimation);
  }
};

export default canvasFn;