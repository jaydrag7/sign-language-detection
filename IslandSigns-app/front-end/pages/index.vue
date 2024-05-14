<template>
<<<<<<< HEAD
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
        <span>{{ msg.predictions }}</span>


      </v-card-text>
    </v-container>
    </v-row>
  </v-container>
=======
  <v-app>
    <v-app-bar app flat>
      <v-btn
        style="text-transform:none;"

      >
        Support
      </v-btn>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-avatar image="IslandSigns-logo.png" size="100"/>
      <v-card-title class="text-h6" style="font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">IslandSigns</v-card-title>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>

      <v-btn 
        variant="outlined"
        @click="goToSignIn" 
        class="mr-2"
        width="30"
        style="text-transform:none;"
      >
        Log in
      </v-btn>

      <v-btn 
        variant="flat"
        @click="goToRegister" 
        color="blue-lighten-1"
        style="text-transform:none;"

      >
        Register
      </v-btn>
    </v-app-bar>
    <v-container class="mt-10">
      <v-row  class="mt-10">
        <v-col/>
        <v-col>
          <v-card-title class="text-h5 text-blue-lighten-1" style="font-family: Verdana, Geneva, Tahoma, sans-serif;">
            For those who Sign
          </v-card-title>
          <v-img src="sign.png" width="300"/>
        </v-col>
        <v-col>
          <v-card-title class="text-h5 text-blue-lighten-1" style="font-family: Verdana, Geneva, Tahoma, sans-serif;">
            For those who Speak
          </v-card-title>
          <v-img src="speak.png" width="300"/>
        </v-col>
        <v-col/>
      </v-row>
    </v-container>
    <v-row class="mt-10">
        <v-card class="rounded-sm" color="" variant="flat" style="width: 100%;">
          <v-row>
            <v-col/>
            <v-col>
            <v-row class="mt-2">
            <v-card-title class="text-h4 text-blue-lighten-1" style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            Redefining
          </v-card-title>
          </v-row>
          <v-row>
            <v-card-title class="text-h4 text"  style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            your banking experience
          </v-card-title>
          </v-row>
          <v-row>
            <v-card-title class="text-h4"  style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              with
            </v-card-title>
            <v-card-title class="text-h4 text-green-lighten-1 mb-5"  style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              Artificial Intelligence
            </v-card-title>
          </v-row>
          </v-col>
          <v-col>
            <v-img height="150" src="bank.png"/>
          </v-col>
          <v-col/>


          </v-row>
        </v-card>
    </v-row>
    <v-row class="mt-10">
      
      <v-col>
        <v-container class="mt-10">
      <h2>How to Use</h2>
      <br>
      
      <div class="use"><div class="start">1</div> Create your account.</div>
      <div class="use"><div class="start">2</div> Start a session.</div>
      <div class="use"><div class="start">3</div> Begin your conversation and our app will do the rest.</div>
      
    </v-container>
      </v-col>
      <v-col>
        <v-card variant="flat" class="rounded-xl mt-10" color="blue-lighten-4" style="max-width: 600px; margin: 0 auto;">
          <v-row>
        <v-col>
          <v-card-text align="left" class="text-h6" style="font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">
            IslandSigns serves as a pivotal communication solution between the deaf or hard-of-hearing community and hearing individuals when making banking transactions in Jamaica.
            We train our custom AI model on a variety of banking scenarios to capture JSL in real-time. Allowing for seamless communication and creating an inclusive space for deaf Jamaicans.

          </v-card-text>
        </v-col>
      </v-row><br>
        </v-card>
      </v-col>
    </v-row>
    <footer class="mt-10">
          <v-container fluid>
            <v-row>
              <v-container>
                <v-row>
                  <v-col>
                    <v-card-text class="text-blue-lighten-1 text-body-1">
                      Company
                    </v-card-text>
                    <v-card-text class="underline-link">
                      About
                    </v-card-text>
                    <v-card-text class="underline-link">
                      Contact Us
                    </v-card-text>
                  </v-col>
               <v-col>
                <v-card-text class="text-blue-lighten-1 text-body-1">
                  Blog
                </v-card-text>
                <v-card-text class="underline-link">
                  JSL
                </v-card-text>
                <v-card-text class="underline-link">
                  Resources
                </v-card-text>
               </v-col>
               <v-col>
                <v-card-text class="text-blue-lighten-1 text-body-1">
                  Learn
                </v-card-text>
                <v-card-text class="underline-link">
                  Help Center
                </v-card-text>
               </v-col>
            </v-row>
              </v-container>
            </v-row>
            <v-row justify="left">            
              
                <span 
                  class="text-center text-caption grey--text"
                >
                  &copy; ISLANDSIGNS 2024
                </span>            
                <span class="ml-2 mt-n2">
                  <a class="text-center grey--text" style="text-decoration: underline; font-size: small">Privacy</a>
                </span>
                <span class="ml-2 mt-n2">
                  <a class="text-center grey--text" style="text-decoration: underline; font-size: small">Terms</a>
                </span>
              <v-col/>
              <v-col/>
              <v-col/>
              <v-col/>
              <v-col/>
            </v-row>
          </v-container>
        </footer>

  </v-app>
>>>>>>> a4a2d712532e044726d0a23a0822400425945cf8
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

<<<<<<< HEAD
          console.error(error);
        })
=======
    // Handle register button click
    const goToRegister = () => {
    // Implement your register logic here
    route.push( '/register' )
  };
  const goToSignIn = () => {
    // Implement your register logic here
    route.push( '/SigninPage' )
  };


</script>

  
  <style scoped>
  /* General styles */
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }
  .underline-link {
    text-decoration: none; /* Remove underline by default */
  }

  .underline-link:hover {
    text-decoration: underline; /* Add underline on hover */
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  /* Header styles */
  /* header {
    background-color: #e2dfdf;
    padding: 1rem;
  } */

  /* .hdimg-logo{
    width: 75px;
    margin-right: 20px;
  } */
  
  nav ul {
    list-style: none;
    padding: 0;
  }
  
  nav ul li {
    display: inline-block;
    margin-right: 1rem;
  }
  
  nav ul li:last-child {
    margin-right: 0;
>>>>>>> a4a2d712532e044726d0a23a0822400425945cf8
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