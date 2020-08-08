class Scoreboard {
  lastGenScore;
  bestGenScore;
  lastSoloScore;
  bestSoloScore;

  constructor() {
    this.lastGenScore = 0;
    this.bestGenScore = 0;
    this.lastSoloScore = 0;
    this.bestSoloScore = 0;

    this.lastGenScoreEl = document.getElementById("lastGenScore");
    this.bestGenScoreEl = document.getElementById("bestGenScore");
    this.lastSoloScoreEl = document.getElementById("lastSoloScore");
    this.bestSoloScoreEl = document.getElementById("bestSoloScore");
  }

  draw() {
    let lastSoloScorePipes =
      Math.floor((this.lastSoloScore - 100) / 120) < 0
        ? 0
        : Math.floor((this.lastSoloScore - 100) / 120);
    let bestSoloScorePipes =
      Math.floor((this.bestSoloScore - 100) / 120) < 0
        ? 0
        : Math.floor((this.bestSoloScore - 100) / 120);

    this.lastGenScoreEl.innerText =
      "Last Generation Total Score: " + this.lastGenScore;
    this.bestGenScoreEl.innerText =
      "Best Generation Total Score: " + this.bestGenScore;
    this.lastSoloScoreEl.innerText =
      "Last Generation Best Solo Score: " +
      this.lastSoloScore +
      " (" +
      lastSoloScorePipes +
      " pipes)";
    this.bestSoloScoreEl.innerText =
      "Best Solo Score: " +
      this.bestSoloScore +
      " (" +
      bestSoloScorePipes +
      " pipes)";
  }

  update(totalScore, soloScore) {
    this.lastGenScore = totalScore;
    this.bestGenScore = Math.max(this.bestGenScore, totalScore);
    this.lastSoloScore = soloScore;
    this.bestSoloScore = Math.max(this.bestSoloScore, soloScore);
  }
}
