<template>
  <v-container style="justify-content: center;" class="mt-5">
    <v-row style="justify-content: center;">
      <v-card class="rounded-lg"> 
      <video width="500" height="" ref="video" autoplay muted></video>
      <canvas id="screenshot" v-show="false"></canvas>
    </v-card>
    </v-row>
    <v-row style="justify-content: center;">
      <v-btn ref="openCamera" @click="getPrediction()" class="mt-5" color="green">Open Camera</v-btn>
      <v-btn @click="stopCamera()" class="mt-5 ml-5" color="red">Close Camera</v-btn>
    </v-row>
    <v-row style="justify-content: center;">
      <span>{{ msg }}</span>
    </v-row>
  </v-container>
</template>
<script setup>
  // import * as ort from "onnxruntime-web"
  import {ref,onMounted} from 'vue'
  import axios from 'axios'
  // import { Tensor, InferenceSession } from "onnxruntime-web" 
  // import * as ort from "onnxruntime-web"
  // import ndarray from "ndarray"
  // import ops from "ndarray-ops" 
  import * as tf from "@tensorflow/tfjs"
  import Predictions from '~/components/predictions.vue';
 
  // const model = await tf.loadGraphModel('https://firebasestorage.googleapis.com/v0/b/islandsigns-99848.appspot.com/o/saved_model%2Fmodel.json?alt=media&token=769a6fba-996b-4418-a0f8-b85e94b87d11')
  // console.log(model)
  // console.log("Hello, world!")
  const msg = ref("")
  const numpy = ref(10)

  function getPrediction() {
    const path = 'http://127.0.0.1:5000/'
    let foo = numpy.value
      axios.post(path, {foo})
        .then((res) => {
          msg.value = res.data;
        })
        .catch((error) => {

          console.error(error);
        })
  }

  const video = ref(null)
  const openCamera = ref(null)
  const stream = ref(null)
  // const modelFile = ref(new ArrayBuffer(0))
  // const sessionBackend = ref('wasm')
  // const sessionRunning = ref(false)
  // const modelLoadingError = ref(false)
  // // const session = ref(InferenceSession)
  // const cpuSession = ref(InferenceSession)
  // const webcamEnabled = ref(false)
  // const videoOrigWidth = ref(0)
  // const videoOrigHeight = ref(0)
  // const inferenceTime = ref(0)

  // const MODEL_FILEPATH_DEV = ref("/public/CustomModel.onnx")
  // const options = {
  //   executionProviders: ['wasm'], 
  //   graphOptimizationLevel: 'all',
  //   logLevel: 'debug'
  // }

  // const session = await ort.InferenceSession.create(MODEL_FILEPATH_DEV.value,options)
  // console.log(session)

  async function startCamera() {
    try {
      // webcamEnabled.value = true
      stream.value = await navigator.mediaDevices.getUserMedia({ 
        video:{facingMode:'environment'},
        audio:false
       })
      video.value.srcObject = stream.value
      //Lodaing model
      // const response = await fetch(MODEL_FILEPATH_DEV.value)
      // modelFile.value = await response.arrayBuffer();
      // console.log(modelFile.value)

      //Initializing session
      // sessionRunning.value = false
      // modelLoadingError.value = false
      // if(sessionBackend.value === 'wasm'){
      //   //Create inference session
      //   cpuSession.value = await InferenceSession.create(modelFile.value, {executionProviders: ['wasm']})
      //   console.log(cpuSession.value)
      //   //warmup session

      //   //live feed
      //   // while(webcamEnabled.value){
      //   //   const ctx = capture()
      //   //   await runModel(ctx)
      //   //   await new Promise<>((resolve) =>
      //   //     requestAnimationFrame(() => resolve())
      //   //   );
      //   // }


      // }

    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  };

  async function stopCamera(){
    if (stream.value) {
      const tracks = stream.value.getTracks();
      tracks.forEach(track => track.stop());
      video.value.srcObject = null;
      stream.value = null;
    }
  }

  // function capture(){
  //   const size = Math.min(videoOrigWidth.value, videoOrigHeight.value);
  //   const centerHeight = videoOrigHeight.value / 2;
  //   const beginHeight = centerHeight - size / 2;
  //   const centerWidth = videoOrigWidth.value / 2;
  //   const beginWidth = centerWidth - size / 2;

  //   const canvas = document.getElementById("screenshot")
  //   if (canvas instanceof HTMLCanvasElement) {
  //       canvas.width = Math.min(
  //       video.value.width,
  //       video.value.height
  //     )
  //     canvas.height = Math.min(
  //       video.value.width,
  //       video.value.height
  //     )

  //     const context = canvas.getContext("2d");
  //     context.drawImage(
  //     video.value,
  //     beginWidth,
  //     beginHeight,
  //     size,
  //     size,
  //     0,
  //     0,
  //     canvas.width,
  //     canvas.height
  //   );
  //   return context;

  //   }

  // }

  // async function runModel(ctx){
  //   const data = preprocess(ctx)
  //   let outputTensor = Tensor
  //   [outputTensor,inferenceTime.value] = await predict(cpuSession.value, data)

  // }

  // function preprocess(ctx){
  //   const imageData = ctx.getImageData(
  //     0,
  //     0,
  //     ctx.canvas.width,
  //     ctx.canvas.height
  //   )
  //   const { data, width, height } = imageData
  //   const dataTensor = ndarray(new Float32Array(data), [width, height, 4]);
  //   const dataProcessedTensor = ndarray(new Float32Array(width * height * 3), [
  //     1,
  //     3,
  //     width,
  //     height,
  //   ])

  //   ops.assign(
  //     dataProcessedTensor.pick(0, 0, null, null),
  //     dataTensor.pick(null, null, 0)
  //   )
  //   ops.assign(
  //     dataProcessedTensor.pick(0, 1, null, null),
  //     dataTensor.pick(null, null, 1)
  //   )
  //   ops.assign(
  //     dataProcessedTensor.pick(0, 2, null, null),
  //     dataTensor.pick(null, null, 2)
  //   )
  //   const tensor = new Tensor("float32", new Float32Array(width * height * 3), [
  //     1,
  //     3,
  //     width,
  //     height,
  //   ]);
  //   (tensor.data).set(dataProcessedTensor.data);
  //   return tensor
  // }

  // async function predict(model,tensor){
  //   console.log(model.inputNames[0])
  // }
</script>