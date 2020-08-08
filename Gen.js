class Gen {
  constructor() {
    this.generation = 1;
  }

  draw() {
    document.getElementById("generation").innerText =
      "Generation: " + this.generation.toString();
  }

  update() {
    this.generation++;
    this.draw();
  }
}
