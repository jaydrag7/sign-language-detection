<template>
  <v-container class="mt-14">

    <v-row justify="center" class="pa-12">
      <v-card color="blue-lighten-3" class="text-center" height="120" width="355">
        <v-card-text class="text-h6">
          <v-icon color="green-lighten-1" icon="mdi-chat"/> Session
        </v-card-text>
        <v-sheet class="mt-1" :color="theme ? '#202c33':'grey-lighten-3'" style="height: 100%;">
          <v-row style="width:100% ;">
            <v-card-text class="text-h7 py-5 px-5 mr-n16" style="display: flex; font-family:Verdana, Geneva, Tahoma, sans-serif;">
            <v-btn v-if="sessionActive" variant="text" class="mt-n1" size="30" color="red-lighten-1" icon="mdi-access-point"/> {{ sessionText() }} <v-img v-if="sessionActive==false" class="mt-n2" height="35" src="empty-box.png" draggable="false"/>
            </v-card-text>
            <ChatsComponent v-if="sessionActive" :theme="theme"/>

          </v-row>


        </v-sheet>
      </v-card>
    </v-row>

    <v-row justify="center" class="pa-10">
      <v-card 
        variant="outlined" 
        color="green-lighten-1" 
        class="text-left rounded-xl"
      >
        <v-card-text>
          <v-avatar image="tip.png"/> TIP
        </v-card-text>
        <v-sheet color="green-lighten-3">
          <v-card-text class="text-body text-black" style="font-family:Verdana, Geneva, Tahoma, sans-serif;">
          For best results, ensure that live feed can be taken from a well-lit area and limit background noise as best as possible for JSL-to-text and speech-to-text translations.
        </v-card-text>
        </v-sheet>
      </v-card>
    </v-row>

    <v-row justify="center">
      <div class="pa-5">
        <v-btn 
        :color="theme ? '#202c33':'blue-lighten-3'" 
        prepend-icon="mdi-pencil"
        @click="createSession" 
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
            <v-textarea style="width: 200px;" v-model="sessionCode" clearable label="Enter session code" variant="outlined" bg-color="white" rows="1"/>

          </div>
          <div class="pa-2">
            <v-btn 
            color="green-lighten-3" 
            prepend-icon="mdi-plus"
            :disabled="isEmpty()"
            style="font-weight: bold"
            class="mx-auto mb-5"
            variant="text"
          >
          Join
          </v-btn>


          </div>
        </v-row>
      </div>
    </v-row>
  </v-container>
</template>

<script setup>
  import {useUserProfile} from '~/store/store'
  import ChatsComponent from '~/components/ChatsComponent'
  import { onChildAdded, ref as dbRef, onChildChanged } from 'firebase/database'
  import { db } from "@/utils/firebase"


  const user = useUserProfile()
  const session = ref('')
  const sessionBool = ref(false)
  const sessionLoading = ref(false)
  const disableSessionButton = ref(false)
  const sessionActive = ref(false)
  const joinSessionBool = ref(false)
  const sessionCode = ref("")
  const showTip = ref(false)

  const props = defineProps({
    theme: Boolean,
  })

  // onMounted(async()=>{
  //   user.getChatActivity()
  // })

  function isObject(variable) {
        return variable !== null && typeof variable === 'object';
    }
  function isEmpty(){
    return sessionCode.value === ""
  }


  const threadRef = dbRef(db, `/users/${user.bankName}/${user.branchID}/${user.tellerStation}/chatActivity`)
  // onChildAdded(threadRef, (snapshot) => {
  //     const newMessage = snapshot.val()
  //     console.log('New message received:', newMessage);

  // })     
  
  onChildChanged(threadRef, (snapshot) => {
    const isChatActive = snapshot.val()
    if(isChatActive){
      sessionActive.value = true
      console.log('Chat Active?:', isChatActive);

    }
    else{
      sessionActive.value = false
    }
  })     

  async function createSession(){
    try{
      sessionLoading.value = true
      await user.createSession()

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
    return sessionActive.value ? "Live Session" : "--Empty--";
  }
</script>

<style>
.session-button {
  margin-top: 20px;
}
</style>

