function nextGeneration() {
  gen.update();
  calcFitness();

  // Create new generation of birds
  for (let i = 0; i < numBirds; i++) {
    birds.push(pickOne());
  }

  for (let i = 0; i < numBirds; i++) deadBirds[i].dispose();
  deadBirds = [];
}

function calcFitness() {
  let totalScore = 0;
  for (let bird of deadBirds) totalScore += bird.score;
  for (let bird of deadBirds) bird.fitness = bird.score / totalScore;

  let maxScore = 0;
  for (let bird of deadBirds) maxScore = Math.max(maxScore, bird.score);

  scoreboard.update(totalScore, maxScore);
}

function pickOne() {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r -= deadBirds[index].fitness;
    index++;
  }
  index--;

  let bird = deadBirds[index];
  let child = new Bird(bird.brain);
  child.mutate();
  return child;
}
