class Bird {
  constructor(brain) {
    this.x = 40;
    this.y = height / 2;
    this.velocity = 0;
    this.score = 0;
    this.fitness = 0;
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, 8, 2, brain);
    }
  }

  dispose() {
    this.brain.dispose();
  }

  draw() {
    fill(243, 145, 145);
    // rect(this.x, this.y, 40, 40);
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(map(this.velocity, -10, 10, -45, 45));
    image(birdImg, 0, 0, 40, 40);
    pop();
  }

  update() {
    this.score++;

    this.velocity += GRAVITY;
    this.y += this.velocity;
  }

  jump() {
    this.velocity -= 12;
  }

  isOffScreen() {
    return this.y > height || this.y < 0;
  }

  think(pipes) {
    let closestPipe = null;
    let shortestDist = Infinity;
    for (let pipe of pipes) {
      let dist = pipe.x + Pipe.w - this.x;
      if (dist < shortestDist && dist > 0) {
        shortestDist = dist;
        closestPipe = pipe;
      }
    }

    let inputs = [
      this.y / height, //current height
      closestPipe.x / width, //closest pipe's x
      closestPipe.top / height, //closest pipe's top
      closestPipe.bottom / height, //closest pipe's bottom
      this.velocity / 10, //current velocity
    ];
    let outputs = this.brain.predict(inputs);
    if (outputs[0] > outputs[1]) this.jump();
  }

  mutate() {
    this.brain.mutate(0.1);
  }
}
