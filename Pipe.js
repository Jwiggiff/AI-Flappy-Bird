class Pipe {
  static speed = 4;
  static w = 80;

  constructor() {
    this.spacing = 200;
    this.top = random(height / 12, (3 / 5) * height);
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
  }

  draw() {
    fill(100, 255, 100);
    // Top pipe
    push();
    scale(1, -1);
    image(
      pipeImg,
      this.x,
      -this.top,
      Pipe.w,
      pipeImg.height / (pipeImg.width / Pipe.w)
    );
    pop();

    // Bottom pipe
    image(
      pipeImg,
      this.x,
      height - this.bottom,
      Pipe.w,
      pipeImg.height / (pipeImg.width / Pipe.w)
    );
  }

  update() {
    this.x -= Pipe.speed;
  }

  hits(bird) {
    return (
      (bird.y < this.top || bird.y + 40 > height - this.bottom) && // Vertical check
      bird.x > this.x &&
      bird.x < this.x + Pipe.w
    ); // Horizontal check
  }

  isOffScreen() {
    return this.x < -this.width;
  }
}
