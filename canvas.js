class Canvas {
  constructor(width, height, selector, style) {
    this.width = width;
    this.height = height;
    this.selector = selector;
    this.style = style;
    this.canvas = null;
    this.ctx = null;
    this.createCanvas();
  }

  createCanvas() {
    const c = document.createElement("canvas");
    c.width = this.width;
    c.height = this.height;

    if (this.style) {
      Object.keys(this.style).forEach((s) => {
        c.style[s] = this.style[s];
      });
    }

    if (this.selector) {
      const selectorElement = document.querySelector(selector);
      selectorElement.appendChild(c);
    } else {
      const mainDiv = document.createElement("main");
      mainDiv.appendChild(c);
      document.body.appendChild(mainDiv);
    }

    this.canvas = c;
    return this.getContext();
  }

  getContext() {
    this.ctx = this.canvas.getContext("2d");
    return this.ctx;
  }

  drawArc(x, y, r, c = "red") {
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.fillStyle = c;
    this.ctx.fill();
  }

  drawRect(x, y, w, h, c = "#dadada") {
    this.ctx.fillStyle = c;
    this.ctx.fillRect(x, y, w, h);
  }

  drawText(text, x, y, font = "15px Arial", c = "black") {
    this.ctx.fillStyle = c;
    this.ctx.font = font;
    this.ctx.fillText(text, x, y);
  }

  clearRect() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}
