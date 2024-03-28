<template>
  <v-container style="justify-content: center;" class="mt-5">
    <v-row style="justify-content: center;">
      <v-card class="rounded-lg"> 
      <video width="500" height="" ref="video" autoplay muted></video>
      <canvas ref="screenshot" v-show="false"></canvas>

    </v-card>
    </v-row>
    <v-row style="justify-content: center;">
      <v-btn ref="openCamera" @click="startCamera(),cameraEnabled=!cameraEnabled" class="mt-5" color="green">Open Camera</v-btn>
      <v-btn @click="stopCamera()" class="mt-5 ml-5" color="red">Close Camera</v-btn>
    </v-row>
    <v-row style="justify-content: center;">
    <v-container style="justify-content: center;">
      <v-card-text>
        <span>{{ msg.predictions }}</span>


      </v-card-text>
    </v-container>
    </v-row>
  </v-container>
</template>
<script setup>
  import {ref,onMounted} from 'vue'
  import axios from 'axios'
 
  const msg = ref("")

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

        //Start capturing frames
        captureAndSendFrames(liveFeed,liveFeed.videoWidth,liveFeed.videoHeight);  
      }

    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  }

  async function captureAndSendFrames(feed,streamWidth,streamHeight){
    const canvas = screenshot.value
    const context = canvas.getContext('2d')
    const fps = 60

    //Set canvas dimensions
    canvas.width = streamWidth
    canvas.height = streamHeight

    async function captureFrame(){
            //Draw current frame
            context.drawImage(feed,0,0,canvas.width,canvas.height)
      

      //Get image data from the canvas
      const imageData = context.getImageData(0,0,canvas.width,canvas.height)
      context.putImageData(imageData, 0, 0);
      if (imageData.data.some(value => value !== 0)) {
        // Send the image to the backend
        const base64Image = canvas.toDataURL('image/jpeg')
        console.log(base64Image)
        if(cameraEnabled){
          await getPrediction(base64Image)
        // Request next frame
        setTimeout(requestAnimationFrame(captureFrame),1000)


        }

      }
        else{
        stopCamera()
        return
      }
    }

    await captureFrame()



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