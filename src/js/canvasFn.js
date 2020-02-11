let canvasFn = {
  drawLine() {
    
  },
  drawRect(ctx, x, y, w, h, color, isEmpty, borderColor) {
    if (isEmpty === true) {
      ctx.strokeStyle = borderColor;
      ctx.strokeRect(x, y, w, h);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
    }
    
  },
  drawPic() {

  }
};

export default canvasFn;