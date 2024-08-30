<template>
  <v-app :class="{'body':user.darkTheme}">
    <v-app-bar :color="user.darkTheme ? 'secondaryDarkBtnColor':''">
      <v-avatar image="IslandSigns-logo.png" size="120"/>
      <v-spacer/>
      <span v-if="user.fname">{{ user.fname }}</span>

      <v-app-bar-nav-icon icon="mdi-account-circle" @click.stop="changeHomeNavDrawerState(currRouteLocation.params.homepageNavDrawer)"/>
    </v-app-bar>
    <v-navigation-drawer
      v-model="homepageNavDrawer"
      temporary
      location="right"
      :color="user.darkTheme ? '#202c33':''"   
    >
      <v-list density="compact">
        <v-list-item>
          <v-switch @click="switchTheme()" prepend-icon="mdi-theme-light-dark" v-model="theme" color="blue-lighten-1" inset/>
        </v-list-item>
        <v-list-item :disabled="chatInvite === false" class="mt-n7" prepend-icon="mdi-account-plus" @click="showInvitation=!showInvitation">
          <div class="d-flex justify-space-between">
            <span class="text-body-2 mt-1">Invites</span>
            <v-btn
            v-if="chatInvite"
            icon
            size="x-small"
            density="compact"
            class="justify-center"
            variant="flat"
            color="cancel"
            text=""
          />


          </div>
        </v-list-item>
        <v-list-item prepend-icon="mdi-school" title="Learn" @click=""/>
        <v-list-item prepend-icon="mdi-account-group" title="Friends" @click=""/>
        <v-list-item prepend-icon="mdi-help" title="Support" @click=""/>
        <v-list-item prepend-icon="mdi-cog" title="Settings" @click=""/>
        <v-divider class="border-opacity-100"/>
        <v-list-item class="mt-5" prepend-icon="mdi-logout" title="Sign Out" @click="logout()"/>
      </v-list>
    </v-navigation-drawer>
    <Home 
      :theme="user.darkTheme"
      @resetInvite="declineClickHandler()"
    />
    <InviteCard
      v-if="chatInvite && showInvitation"
      @close="closeInviteCardHandler()"
      @decline="declineClickHandler()"
      :theme="user.darkTheme"
      :chatInviteMetaData="user.inviteMetaData"
      />
  </v-app>
</template>

<script setup lang="ts">
  import Home from '../components/Home.vue'
  import InviteCard from '~/components/InviteCard.vue'
  import {useUserProfile} from '~/store/store'
  import { onChildAdded, ref as dbRef, onChildChanged } from 'firebase/database'
  import { db } from "@/utils/firebase"
  import { nextTick } from 'vue'



const user: any=useUserProfile()
// const {username,chatSessionInviteeStatus,chatSessionParticipant,
//       chatInviteMeta,
//       chatSessionId,
//       chatSessionInvite,
//       showSessionInvite
//       } = metaData()
const {userTheme} = colorTheme()
const {homepageNavDrawer,changeHomeNavDrawerState} = navStates()
const {username,chatSessionInvite} = metaData()

const currRouteLocation: any=useRoute()
const showInvitation = ref(false)
const chatInvite = ref(false)
// chatSessionInvite.value = false
const routerInstance = useRouter()
const theme = ref(user.darkTheme)
const newInvite = ref({})
// const sessionInvite = useCookie<Boolean>('sessionInvite', () => false)
// onMounted(() =>{
//   // user.fname = username.value
//   // user.darkTheme = userTheme.value
//   // console.log(chatInvite.value,showInvitation.value)
//   // user.darkTheme = userTheme.value
//   // user.chatParticipant = chatSessionParticipant.value
//   // user.sessionInviteeStatus = chatSessionInviteeStatus.value
//   // user.inviteMetaData = chatInviteMeta.value
//   // user.sessionId = chatSessionId.value
//   // chatInvite.value =  chatSessionInvite.value 
//   // console.log(user.inviteMetaData)
// })


function isObject(variable : object) {
    return variable !== null && typeof variable === 'object';
}

const inviteRef = dbRef(db, `/users/${user.email}`)
const sessionStatusRef = dbRef(db, `/sessions/${user.sessionId}`)
/**
 * This db listener listens for brand new changes to the provided node reference.
 * It only listens ONCE for changes.
 * If a new change happens, the state variables are updated accordingly.
 */
  onChildAdded(sessionStatusRef, (snapshot) => {
    const statusObj = snapshot.val()
    if(statusObj.hasOwnProperty('participants')){
      const arr = Object.values(statusObj.participants)
      arr.forEach((data : any) => {
        if(data.name != user.fname){
          if(data.status){
            user.chatParticipant = data.name
            // chatSessionParticipant.value = user.chatParticipant
            user.sessionInviteeStatus = true
            // chatSessionInviteeStatus.value = user.sessionInviteeStatus

          }
          else{
            user.sessionInviteeStatus = false
            // chatSessionInviteeStatus.value = user.sessionInviteeStatus
          }
        }
      })

    }
  })     
  /**
   * This db istener listens for mutations to the existing node provided.
   * If mutaions occur the state variables are updates accordingly.
   */
  onChildChanged(sessionStatusRef, (snapshot) => {
    const statusObj = snapshot.val()
    if(statusObj.hasOwnProperty('participants')){
      const arr = Object.values(statusObj.participants)
      arr.forEach((data : any) => {
        if(data.name != user.fname){
          if(data.status){
            user.chatParticipant = data.name
            // chatSessionParticipant.value = user.chatParticipant
            user.sessionInviteeStatus = true
            // chatSessionInviteeStatus.value = user.sessionInviteeStatus

          }
          else{
            user.sessionInviteeStatus = false
            // chatSessionInviteeStatus.value = user.sessionInviteeStatus
          }
        }
      })
    }
  })     

  onChildAdded(inviteRef, (snapshot) => {
      newInvite.value = snapshot.val()
      if(isObject(newInvite.value)){
        user.inviteMetaData = newInvite.value
        // chatInviteMeta.value = user.inviteMetaData
        user.sessionId = user.inviteMetaData.sessionId
        // chatSessionId.value = user.sessionId
        chatInvite.value = true
        // chatSessionInvite.value = chatInvite.value
      }
  })
  
  onChildChanged(inviteRef,(snapshot) => {
    newInvite.value = snapshot.val()
    if(isObject(newInvite.value)){
      user.inviteMetaData = newInvite.value
      // chatInviteMeta.value = user.inviteMetaData
      user.sessionId = user.inviteMetaData.sessionId
      // chatSessionId.value = user.sessionId
      chatInvite.value = true
      // chatSessionInvite.value = chatInvite.value

    }
  })
  /**
   * This function handles an emitted event from the InviteCard component.
   * Its job is to reset the showInvitation state variable to close the dialog component.
   */
  function closeInviteCardHandler(){
    showInvitation.value = false
  }
/**
 * This function handles an emitted event from the InviteCard component.
 * Its job is to reset the chatInvite state variable and close the dialog component
 * whenever the user declines an invite.  
 */
  function declineClickHandler(){
    chatInvite.value = false

  }


async function logout(){
  await user.signOutClient()
  routerInstance.push("/")

}

async function switchTheme(){
  theme.value = !theme.value
  return await user.changeTheme(theme.value)

}
async function endSession(){
        
        await user.endSession()
        return await user.removeChatLog()
    }


</script>
<style>
.body{
  background-color: #0b141a;
}
</style>
