<template>
  <v-container style="justify-content: center;" class="mt-5">
    <v-row style="justify-content: center;">
      <v-card class="rounded-lg"> 
      <video width="500" height="" ref="video" autoplay muted></video>
    </v-card>
    </v-row>
    <v-row style="justify-content: center;">
      <canvas ref="screenshot" v-show="false"></canvas>

    </v-row>
    <v-row style="justify-content: center;">
      <v-btn ref="openCamera" @click="startCamera(),cameraEnabled=!cameraEnabled" class="mt-5" color="green">Open Camera</v-btn>
      <v-btn @click="stopCamera()" class="mt-5 ml-5" color="red">Close Camera</v-btn>
    </v-row>
    <v-row style="justify-content: center;">
    <v-container style="justify-content: center;">
      <v-card-text>
        <span>{{ msg }}</span>


      </v-card-text>
    </v-container>
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

  async function getPrediction(frame) {
    const path = 'http://127.0.0.1:5000/'
      await axios.post(path, {frame})
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
  const screenshot = ref(null)
  const cameraEnabled = ref(false)

  async function startCamera() {
    try {
      if(cameraEnabled){
        stream.value = await navigator.mediaDevices.getUserMedia({ 
        video:{facingMode:'environment'},
        audio:false
       })
      const liveFeed = video.value
      liveFeed.srcObject = stream.value
      //Make sure the video is loaded before starting to capture frames
      await new Promise((resolve) => {
        liveFeed.onloadedmetadata = () => resolve()
      })

          setTimeout(() => {
      // Start capturing frames
      captureAndSendFrames(liveFeed,liveFeed.videoWidth,liveFeed.videoHeight);
    }, 3000);

      //Sending them to the backend
      // captureAndSendFrames(liveFeed,liveFeed.videoWidth,liveFeed.videoHeight)
      // console.log(liveFeed.videoWidth,liveFeed.videoHeight)

      }

    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  }

  async function captureAndSendFrames(feed,streamWidth,streamHeight){
    const canvas = screenshot.value
    const context = canvas.getContext('2d')
    const fps = 60
    console.log(feed)

    //Set canvas dimensions
    canvas.width = streamWidth
    canvas.height = streamHeight
    console.log(canvas.width,canvas.height)

      //Draw current frame
      context.drawImage(feed,0,0,canvas.width,canvas.height)
      

      //Get image data from the canvas
      const imageData = context.getImageData(0,0,canvas.width,canvas.height)
      console.log(imageData)
      context.putImageData(imageData, 0, 0);
      if (imageData.data.some(value => value !== 0)) {
        // Send the image to the backend
        const base64Image = canvas.toDataURL('image/png')
        console.log(base64Image)
        await getPrediction(base64Image)
        setTimeout(startCamera,1000/fps)

      }else{
        setTimeout(startCamera,1000/fps)
      }


  }

  async function stopCamera(){
    if (stream.value) {
      cameraEnabled.value = false
      const tracks = stream.value.getTracks();
      tracks.forEach(track => track.stop());
      video.value.srcObject = null;
      stream.value = null;
    }
  }

</script>