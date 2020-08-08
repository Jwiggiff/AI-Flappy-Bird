class NeuralNetwork {
  constructor(input_nodes, hidden_nodes, output_nodes, model = null) {
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;

    if (model) this.model = model;
    else this.model = this.createModel();
  }

  createModel() {
    const model = tf.sequential();
    const hidden_layer = tf.layers.dense({
      units: this.hidden_nodes,
      inputShape: [this.input_nodes],
      activation: "sigmoid",
    });
    const output_layer = tf.layers.dense({
      units: this.output_nodes,
      activation: "softmax",
    });
    model.add(hidden_layer);
    model.add(output_layer);
    return model;
  }

  predict(inputs) {
    return tf.tidy(() => {
      const t_inputs = tf.tensor2d([inputs]);
      const t_outputs = this.model.predict(t_inputs);
      return t_outputs.dataSync();
    });
  }

  copy() {
    return tf.tidy(() => {
      const modelCopy = this.createModel();
      const weights = this.model.getWeights();
      const weightCopies = [];
      for (let weight of weights) {
        weightCopies.push(weight.clone());
      }
      modelCopy.setWeights(weightCopies);
      return new NeuralNetwork(
        this.input_nodes,
        this.hidden_nodes,
        this.output_nodes,
        modelCopy
      );
    });
  }

  mutate(rate) {
    tf.tidy(() => {
      const weights = this.model.getWeights();
      const mutatedWeights = [];
      for (let t_weight of weights) {
        let shape = t_weight.shape;
        let weight_values = t_weight.dataSync().slice();
        for (let i = 0; i < weight_values.length; i++) {
          if (random(1) < rate) {
            weight_values[i] = weight_values[i] + randomGaussian();
          }
        }
        let newTensor = tf.tensor(weight_values, shape);
        mutatedWeights.push(newTensor);
      }
      this.model.setWeights(mutatedWeights);
    });
  }

  dispose() {
    this.model.dispose();
  }
}
