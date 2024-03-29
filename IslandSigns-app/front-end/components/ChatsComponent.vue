<template>
    <v-row
        style="justify-content: center;"
        class="pa-0 mt-5"
    >
        <v-dialog
            v-model="closeDialog"
            fullscreen
            scrollable
        >
            <template v-slot:activator="{props}">
                <v-btn
                    :style="{textTransform:'none'}"
                    @click="closeDialog=!closeDialog"
                    v-bind="props"
                    vatiant="text"
                    append-icon="mdi-location-enter"
                    color="green-lighten-1"
                >
                    Join

                </v-btn>
            </template>
            <v-card
                color="grey-lighten-2"
            >
                <v-toolbar
                    color="white"
                >
                    <v-dialog
                        v-model="closeWarningDialog"
                        transition="dialog-bottom-transition"
                    >
                        <template v-slot:activator="{props}">
                            <v-btn
                                :style="{textTransform:'none'}"
                                v-bind="props"
                                append-icon="mdi-close"
                                color="red-lighten-1"      
                                variant="tonal"      
                            >
                                End Session
                            </v-btn>
                        </template>
                        <v-card
                            class="warning-card"
                        >
                            <v-container
                                class="mt-2"
                                style="justify-content: center;"
                            >
                            <v-row>
                                <v-card-text
                                    class="text-h4 text-red text-center"
                                >
                                    Warning!
                                </v-card-text>
                            </v-row>
                            <v-row>
                                <v-card-text
                                    class="text-h6 text-center"
                                >
                                    Are you sure you want to end the session?
                                </v-card-text>
                            </v-row>
                            <v-row
                                style="justify-content: center;"
                            >
                                <v-btn
                                    color="green"
                                    class="mr-5"
                                    @click="closeDialog=false;closeWarningDialog=false"
                                >
                                    Yes
                                </v-btn>
                                <v-btn
                                    color="red"
                                    @click="closeWarningDialog=!closeWarningDialog"
                                >
                                    No
                                </v-btn>


                            </v-row>
                            </v-container>
                        </v-card>

                    </v-dialog>
                    <v-img
                        src="IslandSigns-logo.png"
                    />
                </v-toolbar>
                <v-container
                    style="justify-content: center;"
                    v-for="(role,i) in msgObj['roles']"

                >
                <v-row
                    :style="{ display: 'flex', justifyContent: role === 'Customer' ? 'space-between' : 'flex-end' }"
                    class="mt-0"
                >
                        <v-card 
                            :subtitle="role === 'Customer' ? 'Customer' : 'Teller'" 
                            width="150" 
                            :color="role === 'Customer' ? 'white' : 'green'" 
                            :class="['rounded-xl', role === 'Customer' ? 'rounded-ts-0' : 'rounded-be-0']" 
                                                 
                        >
                            <v-card-text>
                                {{ msgObj['messages'][i] }}
                            </v-card-text>

                        </v-card>
                        

                </v-row>
                </v-container>
                <v-row 
                    justify-lg="center"
                >
                    <v-container
                    class="chat-container mt-10"
                    >
                        <v-row justify="end">
                            <v-card v-if="cameraEnabled" height="220" class="rounded-xl mb-2"> 
                                <v-row>
                                    <video height="200" ref="video" autoplay muted></video>
                                    <canvas ref="screenshot" v-show="false"></canvas>
                                </v-row>
                                <v-row justify="center">
                                    <v-btn
                                        @click="cameraEnabled=false,closeCamera()"
                                        append-icon="mdi-close"
                                        variant='tonal'
                                        color='red'
                                        width="250"
                                    >
                                        Close
                                    </v-btn>
                                </v-row>
                        
                                   
                            </v-card>
                        </v-row>
                        <v-row class="ml-3">
                           <v-textarea
                                v-model="msg"
                                rows="1"
                                auto-grow
                                :label="label"
                                variant="solo"
                                class="mr-1"
                                append-inner-icon="mdi-send"
                                prepend-inner-icon="mdi-swap-vertical"
                                @click:append-inner="sendMessage()"
                                @click:prepend-inner="swapRoles()"
                            >
                            </v-textarea>
                            <v-btn icon="mdi-microphone" variant="text"/>
                            <v-btn 
                                @click="cameraEnabled=!cameraEnabled,openCamera()" 
                                icon="mdi-video" 
                                variant="text"
                            />
                        </v-row>


                    </v-container>

                    
                </v-row>
                
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script setup>
    import axios from 'axios'


    const closeDialog = ref(false)
    const closeWarningDialog = ref(false)
    const stream = ref(null)
    const screenshot = ref(null)
    const cameraEnabled = ref(false)
    const video = ref(null)
    const tellerMsg = ref('')
    const customerObj = ref({})
    const msg = ref('')
    const role = ref('Teller')
    const label = ref('Send message as Teller')
    const msgObj = ref({
        'roles': [],
        'messages': []
    })

    const isnewMsg = ref(false)
    const isnewCustomerMsg = ref(false)

    const newTellerMsg = ref([])
    const tellerMsgThread = ref([])
    const customerMsgThread = ref([])


    async function openCamera() {
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

  async function closeCamera(){
    if (stream.value) {
      cameraEnabled.value = false
      const tracks = stream.value.getTracks();
      tracks.forEach(track => track.stop());
      video.value.srcObject = null;
      stream.value = null;
    }
  }

  async function getPrediction(frame) {
    const path = 'http://127.0.0.1:5000/'
      await axios.post(path, {frame})
        .then((res) => {
          customerObj.value = res.data;
          let s = {}
          s = customerObj.value
          msg.value = s['speaker']
          console.log(s['speaker'])
        })
        .catch((error) => {

          console.error(error);
        })
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
        if(cameraEnabled){
          await getPrediction(base64Image)
        // Request next frame
        setTimeout(requestAnimationFrame(captureFrame),1000)


        }

      }
        else{
        closeCamera()
        return
      }
    }

    await captureFrame()



  }

  function swapRoles(){
    switch(role.value){
        case 'Teller':
            role.value = 'Customer'
            label.value = `Send message as ${role.value}`
            break
        case 'Customer':
            role.value = 'Teller'
            label.value = `Send message as ${role.value}`
            break
    }
    console.log(role.value)

  }

  function sendMessage(){
    let roleArr = msgObj.value['roles']
    let messageArr = msgObj.value['messages']
    roleArr.push(role.value)
    messageArr.push(msg.value)
    msgObj.value['roles'] = roleArr
    msgObj.value['messages'] = messageArr
    console.log(msgObj.value)

  }
  function sendTellerMessage(){
    isnewMsg.value = true
    tellerMsgThread.value.push(tellerMsg.value)
    newTellerMsg.value = tellerMsgThread.value

    console.log(tellerMsgThread.value)
  }

  function sendCustomerMessage(){
    let cMsg = {}
    isnewCustomerMsg.value = true
    cMsg = customerMsg.value
    customerMsgThread.value.push(cMsg['Speaker'])
    msg = cMsg['Speaker']

    console.log(customerMsgThread.value)
  }




</script>
<style>
    .warning-card{
        width: 70%;
        height: auto;
        margin:0 auto
    }
    .chat-container{
        position:relative;
        bottom: 0;
        z-index: 1;
        width: 100%
    }
</style>