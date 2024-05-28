<template>
    <v-row
        style="justify-content: center;"
        class="mt-3"
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
                    variant="flat"
                    prepend-icon="mdi-location-enter"
                    color="green-lighten-1"
                    class="rounded-pill"
                >
                    Join

                </v-btn>
            </template>
            <v-card
                fluid="true"
                color="grey-lighten-4"
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
                            class="warning-card rounded-xl"
                            width="250"
                        >
                            <v-container
                                class="mt-2"
                                style="justify-content: center;"
                            >
                            <v-row>
                                <v-img
                                    src="caution.png"
                                    height="30"
                                    class="mt-2 ml-2"
                                />
                                <v-card-text
                                    class="text-h4 text-red"
                                >
                                    Warning!
                                </v-card-text>
                            </v-row>
                            <v-row>
                                <span>
                                    ___________________________
                                </span>
                                <v-card-text
                                    class="text-body-1 text-center"
                                    style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"
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
                                    variant="outlined"
                                    rounded
                                    @click="closeDialog=false;closeWarningDialog=false,endSession()"
                                >
                                    Yes
                                </v-btn>
                                <v-btn
                                    color="red"
                                    variant="outlined"
                                    rounded
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
                    v-if="user.roles"
                    style="justify-content: center;"
                    v-for="(role,i) in user.roles"
                    class="message-threads"
                >
                <v-row
                    :style="{ display: 'flex', justifyContent: role === 'Customer' ? 'space-between' : 'flex-end' }"
                    class="mt-0"
                >
                        <v-card 
                            :subtitle="role === 'Customer' ? `Customer` : `Teller`" 
                            width="200" 
                            :color="role === 'Customer' ? 'white' : '#d1f4cc'" 
                            :class="['rounded-xl', role === 'Customer' ? 'rounded-ts-0' : 'rounded-be-0']" 
                            elevation="2"                    
                        >
                            <v-card-text>
                                {{ user.messages[i] }}
                            </v-card-text>

                        </v-card>
                        

                </v-row>
                </v-container>
                <v-row 
                    justify-lg="center"
                >
                    <v-container
                        class="mt-10" :class="{'threadActive': active, 'threadNotActive': !active}"                    
                    >
                        <v-row justify="end">
                            <v-card v-if="cameraEnabled" height="220" class="rounded-xl mb-2 mr-3"> 
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
                        <v-row class="ml-1 mr-1">
                        <v-card
                            color="grey-lighten-2"
                            style="width: 100%;"
                            class="rounded-lg"
                            height="100"
                            variant="flat"
                        >
                        <v-row
                            class="mt-0 pa-5"
                        >
                            <v-textarea
                                v-model="msg"
                                rows="1"
                                auto-grow
                                :label="label"
                                variant="solo"
                                class="mr-1 footer"
                                append-inner-icon="mdi-send"
                                prepend-inner-icon="mdi-swap-vertical"
                                @click:append-inner="sendMessage"
                                @click:prepend-inner="swapRoles()"
                            />
                            <audio ref="audioPlayback"></audio>
                            <v-btn @click="microphoneEnabled ? recordAudio():closeMicrophone()" icon variant="tonal" :color="microphoneEnabled ? 'green-lighten-1': 'red-lighten-1'">
                                <v-icon :icon="microphoneEnabled ? 'mdi-microphone':'mdi-microphone-off'"/>
                                <v-tooltip
                                    activator="parent"
                                    location="top"
                                >Record Audio</v-tooltip>

                            </v-btn>
                            <v-btn 
                                @click="cameraEnabled=!cameraEnabled,openCamera()" 
                                icon
                                variant="tonal"
                            >
                                <v-icon icon="mdi-video"/>
                                <v-tooltip
                                    activator="parent"
                                    location="top"
                                >Record JSL</v-tooltip>
                            </v-btn>


                        </v-row>
                        </v-card>
                        </v-row>
                    </v-container>

                    
                </v-row>
                
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script setup>
    import axios from 'axios'
    import {useUserProfile} from '~/store/store'
    import { ref, onMounted } from 'vue'
    import { db } from "@/utils/firebase";
    import { onChildAdded, ref as dbRef, onChildChanged } from 'firebase/database'
    import OpenAI from 'openai'


    const user = useUserProfile()    
    const closeDialog = ref(false)
    const closeWarningDialog = ref(false)
    const stream = ref(null)
    const audioStream = ref(null)
    const screenshot = ref(null)
    const cameraEnabled = ref(false)
    const video = ref(null)
    const tellerMsg = ref('')
    const msg = ref('')
    const role = ref('Teller')
    const label = ref('Send message as Teller')
    const msgObj = ref({})
    const roles = ref(new Array())
    const messages = ref(new Array())
    const active = ref(false)
    const audioChunks = ref([])
    const audioPlayback = ref(null)
    const microphoneEnabled = ref(true)


    function isObject(variable) {
        return variable !== null && typeof variable === 'object';
    }
    const threadRef = dbRef(db, `/users/${user.bankName}/${user.branchID}/${user.tellerStation}`)
    onChildAdded(threadRef, (snapshot) => {
        const newMessage = snapshot.val()
        if(isObject(newMessage)){
            if(newMessage.hasOwnProperty('roles')){
                user.roles = newMessage['roles']
            user.messages = newMessage['messages']
            roles.value = user.roles
            messages.value = user.messages


            console.log('New message received:', newMessage);


            }
        }
    })            

    onChildChanged(threadRef, (snapshot) => {
        const updatedMessage = snapshot.val()
        if(isObject(updatedMessage)){
            if(updatedMessage.hasOwnProperty('roles')){
                user.roles = updatedMessage['roles']
                user.messages = updatedMessage['messages']
                roles.value = user.roles
                messages.value = user.messages

                console.log('Updated message received:', updatedMessage);
            }
        }
        // updatedMessage['roles'].forEach(role => {
        //     user.roles.push(role)
        // })

        // updatedMessage['messages'].forEach(message => {
        //     user.messages.push(message)
        // })

    })
    
    async function endSession(){
        
        await user.endSession()
        return await user.removeChatLog()
    }


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
        captureAndSendFrames(liveFeed,liveFeed.videoWidth,liveFeed.videoHeight)


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

  const customerObj=ref({})


async function getPrediction(frame) {
  const path = 'http://127.0.0.1:5000/predict';
  if (cameraEnabled.value) {
    try {
      const res = await axios.post(path, { frame });
      if (res.data['predictions'].length !== 0) {
        let custMsg = [];
        let st = "";
        role.value = 'Teller';
        swapRoles();
        custMsg = res.data['predictions'];
        st = msg.value + " " + custMsg[0];
        console.log(st)

        // const openai = new OpenAI({
        //   apiKey: "",
        //   dangerouslyAllowBrowser: true,
        // });

        // const completion = await openai.chat.completions.create({
        //   messages: [
        //     { "role": "system", "content": "You are a helpful transcriber that transcribes incoherent words or sentences to coherent ones. If you are given a word or phrase that does not make sense or you need more clarification on the word or phrase, just return back the original message." },
        //     { "role": "user", "content": st }
        //   ],
        //   model: "gpt-3.5-turbo",
        // });

        // console.log(completion.choices[0].message.content);

        msg.value = st;
        console.log(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  }
}



  async function captureAndSendFrames(feed,streamWidth,streamHeight){
    const canvas = screenshot.value
    const context = canvas.getContext('2d',{ willReadFrequently: true })
    const fps = 30

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
        const base64Image = canvas.toDataURL('image/png')
        if(cameraEnabled){
            await getPrediction(base64Image)
            // Request next frame
            requestAnimationFrame(captureFrame)


        }

      }
        else{
        closeCamera()
        return
      }
    }

    await captureFrame()

  }
  const audioRecorder = ref(null)

  async function recordAudio(){
    audioStream.value = await navigator.mediaDevices.getUserMedia({audio:true})
    audioRecorder.value = new MediaRecorder(audioStream.value)
    console.log(audioRecorder.value)
    audioRecorder.value.ondataavailable = event => {
        audioChunks.value.push(event.data)
        console.log(audioChunks.value)
    }
    audioRecorder.value.onstop = () =>{
        const audioBlob = new Blob(audioChunks.value,{type:'audio/wav'})
        const audioUrl = URL.createObjectURL(audioBlob)
        audioPlayback.value.src = audioUrl
        console.log(audioPlayback.value)
        audioChunks.value = []
        sendAudioForTranscription(audioBlob)

    }
    microphoneEnabled.value = false
    audioRecorder.value.start()

    }

    function closeMicrophone(){
        microphoneEnabled.value = true
        console.log(audioRecorder.value)
        audioRecorder.value.stop()


    }

    async function sendAudioForTranscription(audioBlob){
        console.log(audioBlob)
        const formData = new FormData()
        formData.append('audio',audioBlob,'audio.wav')
        const path = 'http://127.0.0.1:5000/audio';
        try{
            const res = await axios.post(path, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            })
            msg.value = msg.value + res.data
            console.log(res.data)
        }
        catch(error){
            console.error(error)
        }


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

//   onMounted(async()=>{
//     await user.getMessageThread()
//     roles.value = user.roles
//     messages.value = user.messages
//     console.log(roles.value)
//   })

    function calculateTime(){
        const currentTime = new Date()
        const hours = currentTime.getHours()
        const minutes = currentTime.getMinutes()
        const time = `${hours}:${minutes}`
        return time
        // return time
    }

  const sendMessage = async () =>{
    console.log(roles.value)
    roles.value.push(role.value)
    messages.value.push(msg.value)
    console.log(messages.value)

    await user.sendMessage(roles.value,messages.value)
    let arr = messages.value
    if(arr.length >= 5){
        active.value = true

    }
    msg.value = ""
  }
</script>
<style>
    .footer{
        width:40%;
    }
    .footer{
        width:40%;
    }
    .warning-card{
        width: 70%;
        height: auto;
        margin:0 auto
    }

    .threadActive{
        position:relative;
        bottom: 0;
        width: 100%;
    }
    .threadNotActive{
        position:fixed;
        bottom: 0;
        width: 100%;
    }
</style>