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
                >
                <v-row                        
                style="display: flex; justify-content: space-between;"                   
                >
                        <v-card 
                            subtitle="Customer" 
                            width="150" 
                            color="white" 
                            class="rounded-xl rounded-ts-0"
                        >
                            <v-card-text>
                                Hi!
                            </v-card-text>

                        </v-card>
                        

                </v-row>
                <v-row justify="end">
                    <v-card 
                            subtitle="Teller" 
                            width="150" 
                            color="green" 
                            class="rounded-xl rounded-be-0"
                        >
                            <v-card-text>
                                Hi, how can I help you today!
                            </v-card-text>

                        </v-card>

                </v-row>
                <v-row v-if="isnewMsg" justify="end">
                    <v-card 
                            subtitle="Teller" 
                            width="150" 
                            color="green" 
                            class="rounded-xl rounded-be-0"
                        >
                            <v-card-text>
                                {{newMsg}}
                            </v-card-text>

                        </v-card>

                </v-row>

                


                </v-container>
                <v-row 
                    justify-lg="center"
                >
                    <v-container
                    class="chat-container"
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
                                label="Type a message"
                                variant="solo"
                                class="mr-1"
                                append-inner-icon="mdi-send"
                                @click:append-inner="sendMessage()"
                            >
                            </v-textarea>
                            <v-btn icon="mdi-microphone" variant="text"/>
                            <v-btn 
                                @click="cameraEnabled=!cameraEnabled,openCamera()" 
                                icon="mdi-camera" 
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

    const closeDialog = ref(false)
    const closeWarningDialog = ref(false)
    const stream = ref(null)
    const screenshot = ref(null)
    const cameraEnabled = ref(false)
    const video = ref(null)
    const msg = ref('')
    const isnewMsg = ref(false)
    const newMsg = ref('')

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

  function sendMessage(){
    isnewMsg.value = true
    newMsg.value = msg.value
    console.log(newMsg)
  }



</script>
<style>
    .warning-card{
        width: 70%;
        height: auto;
        margin:0 auto
    }
    .chat-container{
        position:fixed;
        bottom: 0;
        z-index: 1;
        width: 100%
    }
</style>