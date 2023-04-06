//
//https://github.com/PacktPublishing/Hands-on-Machine-Learning-with-TensorFlow.js/tree/master/Section5_4
//
const tf = require('@tensorflow/tfjs');
const fs = require('fs');
// require('@tensorflow/tfjs-node');
//load iris training and testing data
const iris = require('../../iris.json');
const irisTesting = require('../../iris-testing.json');
var lossValue;
//
exports.changeTests = function (req, res) {
    irisTesting[0].sepal_length = Number(req.body.data[0].sepal_length);
    irisTesting[0].sepal_width = Number(req.body.data[0].sepal_width);
    irisTesting[0].petal_length = Number(req.body.data[0].petal_length);
    irisTesting[0].petal_width = Number(req.body.data[0].petal_width);
    irisTesting[0].species = req.body.data[0].species;
    irisTesting[1].sepal_length = Number(req.body.data[1].sepal_length);
    irisTesting[1].sepal_width = Number(req.body.data[1].sepal_width);
    irisTesting[1].petal_length = Number(req.body.data[1].petal_length);
    irisTesting[1].petal_width = Number(req.body.data[1].petal_width);
    irisTesting[1].species = req.body.data[1].species;
    irisTesting[2].sepal_length = Number(req.body.data[2].sepal_length);
    irisTesting[2].sepal_width = Number(req.body.data[2].sepal_width);
    irisTesting[2].petal_length = Number(req.body.data[2].petal_length);
    irisTesting[2].petal_width = Number(req.body.data[2].petal_width);
    irisTesting[2].species = req.body.data[2].species;
    console.log(irisTesting);
}
exports.trainAndPredict = function (req, res) {
    //console.log(irisTesting)
    //
    // convert/setup our data for tensorflow.js
    //
    //tensor of features for training data
    // include only features, not the output
    const trainingData = tf.tensor2d(iris.map(item => [
        item.sepal_length, item.sepal_width, item.petal_length,
        item.petal_width
    ]))
    //console.log(trainingData.dataSync())
    //
    //tensor of output for training data
    //the values for species will be:
    // setosa:       1,0,0
    // virginica:    0,1,0
    // versicolor:   0,0,1
    const outputData = tf.tensor2d(iris.map(item => [
        item.species === "setosa" ? 1 : 0,
        item.species === "virginica" ? 1 : 0,
        item.species === "versicolor" ? 1 : 0
    ]))
    //console.log(outputData.dataSync())
    //
    //tensor of features for testing data
    const testingData = tf.tensor2d(irisTesting.map(item => [
        item.sepal_length, item.sepal_width,
        item.petal_length, item.petal_width,
    ]))
    //console.log(testingData.dataSync())    
    //
    // build neural network using a sequential model
    const model = tf.sequential()
    //add the first layer
    model.add(tf.layers.dense({
        inputShape: [4], // four input neurons
        activation: "sigmoid",
        units: 5, //dimension of output space (first hidden layer)
    }))
    //add the hidden layer
    model.add(tf.layers.dense({
        inputShape: [5], //dimension of hidden layer
        activation: "sigmoid",
        units: 3, //dimension of final output (setosa, virginica, versicolor)
    }))
    //add output layer
    model.add(tf.layers.dense({
        activation: "sigmoid",
        units: 3, //dimension of final output (setosa, virginica, versicolor)
    }))
    //compile the model with an MSE loss function and Adam algorithm
    model.compile({
        loss: "meanSquaredError",
        optimizer: tf.train.adam(.06),
    })
    //console.log(model.summary())
    //
    //Train the model and predict the results for testing data
    //
    // train/fit the model for the fixed number of epochs
    async function run() {
        const startTime = Date.now()
        //train the model
        await model.fit(trainingData, outputData,
            {
                epochs: 100,
                callbacks: { //list of callbacks to be called during training
                    onEpochEnd: async (epoch, log) => {
                        lossValue = log.loss;
                        //console.log(`Epoch ${epoch}: lossValue = ${log.loss}`);
                        elapsedTime = Date.now() - startTime;
                        //console.log('elapsed time: ' + elapsedTime)
                    }
                }
            }

        )

        const results = model.predict(testingData);
        //console.log('prediction results: ', results.dataSync())
        //results.print()

        // get the values from the tf.Tensor
        //var tensorData = results.dataSync();
        results.array().then(array => {
            //console.log(array[0][0])
            var resultForData1 = array[0];
            var resultForData2 = array[1];
            var resultForData3 = array[2];
            var dataToSent = { row1: resultForData1, row2: resultForData2, row3: resultForData3 }
            //console.log(resultForData1)
            res.status(200).send(dataToSent);
            //

            // res.render('results',
            //     {
            //         elapsedTime: elapsedTime / 1000,
            //         lossValue: lossValue,
            //         resultForData1: resultForData1[0],
            //         resultForData2: resultForData2,
            //         resultForData3: resultForData3
            //     }
            // )

            //
        })
        //

    } //end of run function
    run()

};
