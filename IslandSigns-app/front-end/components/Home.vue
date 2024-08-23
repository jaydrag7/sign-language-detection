<template>
  <v-container class="mt-14">

    <v-row justify="center" class="pa-12">
      <v-card color="blue-lighten-3" class="text-center" height="120" width="300">
        <v-card-text class="text-h6">
          <v-icon color="green-lighten-1" icon="mdi-chat"/> Session
        </v-card-text>
        <v-sheet class="mt-1" :color="theme ? '#202c33':'grey-lighten-3'" style="height: 100%;">
          <v-row>
            <v-card-text v-if="sessionActive==false" class="text-h7 py-5 px-5 mr-n16" style="display: flex; font-family:Verdana, Geneva, Tahoma, sans-serif;">
              {{ sessionText() }} <v-img class="mt-n2" height="35" src="empty-box.png" draggable="false"/>
            </v-card-text>
            <JoinChatBtn 
              v-if="sessionActive"
              :theme="theme"
              @resetInvite="resetInviteHandler()"
            />
            <InviteBtn v-if="sessionActive" :theme="theme"/>
          </v-row>


        </v-sheet>
      </v-card>
    </v-row>

    <v-row justify="center">
      <div class="pa-5">
        <v-btn 
        :color="theme ? '#202c33':'blue-lighten-3'" 
        prepend-icon="mdi-pencil"
        @click="createSession()" 
        :disabled="sessionActive"
        :loading="sessionLoading"
        style="font-weight: bold"
        class="mx-auto mb-5"
      >
        New Session
      </v-btn>
      <v-snackbar
        v-model="sessionBool"
        :color="theme ? 'white':'#010420'"
        :text="session"
      >
      <template v-slot:actions>
      <v-btn
        :icon="sessionActive ? 'mdi-check-outline':'mdi-close-outline'"
        :color="sessionActive ? 'green-lighten-1': 'red-lighten-1'"
        variant="flat"
        size="30"
      />
    </template>
      </v-snackbar>
      </div>
      <div class="pa-5">
        <v-row align="center">
          <div>
            <v-textarea style="width: 200px;" v-model="sessionCode" clearable placeholder="Enter session code" variant="outlined" bg-color="white" rows="1"/>

          </div>
          <div class="pa-2">
            <v-btn 
            color="green-lighten-3" 
            prepend-icon="mdi-plus"
            :disabled="isEmpty()"
            style="font-weight: bold"
            class="mx-auto mb-5"
            variant="text"
            @click="joinSessionFromCopied(),showChatComponent=!showChatComponent"
          >
          Join
          </v-btn>
          <ChatsComponent
              v-if="showChatComponent"
              :theme="theme"
              :showDialog="showChatComponent"
              @resetInvite="resetInviteHandler()" 
          />
          </div>
        </v-row>
      </div>
    </v-row>
    <v-row class="justify-center">
      <v-divider class="border-opacity-100" :color="user.darkTheme ? 'green-lighten-3':''"/>
    </v-row>
    <v-row class="justify-center mt-10">
      <v-window
        v-model="windowCount"
        direction="horizontal"
        show-arrows
      >
        <v-window-item
        >
          <v-card
            class="align-center justify-center"
            variant="flat"
            width="300"
            :color="user.darkTheme ? '#0b141a':''"
          >
            <v-row class="justify-center">
              <v-avatar image="chat.png" size="100" class="mt-10"/>
            </v-row>
            <v-row class="justify-center">
              <span
              class="text-h6 font-weight-bold"
              style="font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"
            >
              Create
            </span>
            </v-row>
            <v-row class="justify-center ">
              <v-card-text
              class="text-body-2"
              style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"
            >
              Click <span class="font-weight-bold">New Session</span> to generate a session link you can share with someone you want to connect with.
            </v-card-text>
            </v-row>
          </v-card>
        </v-window-item>
        <v-window-item
        >
          <v-card
            class="align-center justify-center"
            variant="flat"
            width="300"
            :color="user.darkTheme ? '#0b141a':''"

          >
            <v-row class="justify-center">
              <v-avatar image="link.png" size="100" class="mt-10"/>
            </v-row>
            <v-row class="justify-center">
              <span
              class="text-h6 font-weight-bold"
              style="font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"
            >
              Join
            </span>
            </v-row>
            <v-row class="justify-center ">
              <v-card-text
              class="text-body-2 justify-center"
              style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"
            >
              Enter a session code in the text area to join an existing session.
            </v-card-text>
            </v-row>
          </v-card>
        </v-window-item>
        <v-window-item
        >
          <v-card
            class="align-center justify-center"
            variant="flat"
            width="300"
            :color="user.darkTheme ? '#0b141a':''"

          >
            <v-row class="justify-center">
              <v-avatar image="encrypted-data.png" size="100" class="mt-10"/>
            </v-row>
            <v-row class="justify-center">
              <span
              class="text-h6 font-weight-bold"
              style="font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"
            >
              Safety
            </span>
            </v-row>
            <v-row class="justify-center ">
              <v-card-text
              class="text-body-2 justify-center"
              style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"
            >
              Only <span class="font-weight-bold">you</span> determine who can join your conversation.
            </v-card-text>
            </v-row>
          </v-card>
        </v-window-item>
        <v-window-item
        >
          <v-card
            class="align-center justify-center"
            variant="flat"
            width="300"
            :color="user.darkTheme ? '#0b141a':''"

          >
            <v-row class="justify-center">
              <v-avatar image="tip.png" size="100" class="mt-10"/>
            </v-row>
            <v-row class="justify-center">
              <span
              class="text-h6 font-weight-bold"
              style="font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"
            >
              Tip
            </span>
            </v-row>
            <v-row class="justify-center ">
              <v-card-text
              class="text-body-2 justify-center"
              style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"
            >
            For best results, ensure that live feed can be taken from a well-lit area and limit background noise as best as possible for JSL-to-text and speech-to-text translations.
          </v-card-text>
            </v-row>
          </v-card>
        </v-window-item>
      </v-window>
    </v-row>
  </v-container>
</template>

<script setup>
  import {useUserProfile} from '~/store/store'
  import ChatsComponent from '~/components/ChatsComponent'
  import InviteCard from '~/components/InviteCard'
  import JoinChatBtn from '~/components/JoinChatBtn'
  import InviteBtn from '~/components/InviteBtn'
  import { onChildAdded, ref as dbRef, onChildChanged } from 'firebase/database'
  import { db } from "@/utils/firebase"


  const user = useUserProfile()
  const session = ref('')
  const sessionBool = ref(false)
  const sessionLoading = ref(false)
  const sessionActive = ref(false)
  const showChatComponent = ref(false)
  const sessionCode = ref("")
  const windowCount = ref(0)

  const props = defineProps({
    theme: Boolean,
  })
  const emits = defineEmits(['resetInvite'])

  function resetInviteHandler(){
    sessionActive.value = false
    showChatComponent.value = false
    emits('resetInvite')
  }

  // onMounted(async()=>{
  //   user.getChatActivity()
  // })

  function isObject(variable) {
        return variable !== null && typeof variable === 'object';
    }
  function isEmpty(){
    return sessionCode.value === ""
  }

  async function joinSessionFromCopied(){
    await user.getSessionCodes()
    const codes = user.sessionCodes
    const session = sessionCode.value
    if(codes.hasOwnProperty(session)){
      // console.log(codes[session]['participants']['createdBy']['name'])
      user.chatParticipant = codes[session]['participants']['createdBy']['name']
      user.sessionId = session
      await user.addChatParticipant(user.fname)
      await user.updateSessionInviteeStatus()
    }
  }


  //   onChildChanged(authorSessionStatusRef, (snapshot) => {
  //       const isOnline = snapshot.val()
  //       if(isOnline){
  //           user.sessionInviteeStatus = true
  //           console.log(isOnline)
  //       }
  //       else{
  //           user.sessionInviteeStatus = false
  //           console.log(isOnline)

  //       }
  //   })     

  async function createSession(){
    try{
      sessionLoading.value = true
      sessionActive.value = true
      const sessionId = generateHexCode()
      return await user.createSession(sessionId)


    }
    catch(err){
      console.error(err)
    }finally {
      if (sessionActive.value){
      session.value = "Session created successfully"

      }
      else{
        session.value = "Oops! We are having problems creating a session. Try again in a bit."

      }

      setTimeout(() => (sessionLoading.value = false,sessionBool.value = true), 1000)
      }    
  }

  function sessionText() {
    return sessionActive.value ? "" : "--Empty--";
  }

  function generateHexCode(){
    let hexCode = 'Chat'
    const hexCharacters = '0123456789ABCDEF'
    for(let i=0;i<9;i++){
      hexCode += hexCharacters[Math.floor(Math.random()*16)]
    }
    return hexCode
  }
</script>
