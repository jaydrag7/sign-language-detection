<template>
  <v-app :class="{'body':user.darkTheme}">
    <v-app-bar :color="user.darkTheme ? 'secondaryDarkBtnColor':''">
      <v-avatar image="IslandSigns-logo.png" size="120"/>
      <v-spacer/>
      <span v-if="user.fname">{{ user.fname }}</span>

      <v-app-bar-nav-icon icon="mdi-account-circle" @click.stop="drawer=!drawer"/>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      location="right"
      :color="user.darkTheme ? '#202c33':''"   
    >
      <v-list density="compact" nav>
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

<script setup>
  import Home from '../components/Home.vue'
  import InviteCard from '~/components/InviteCard.vue'
  import {useUserProfile} from '~/store/store'
  import { onChildAdded, ref as dbRef, onChildChanged } from 'firebase/database'
  import { db } from "@/utils/firebase"



const user = useUserProfile()
const drawer = ref(false)
const showInvitation = ref(false)
const chatInvite = ref(false)
const route = useRouter()
const theme = ref(user.darkTheme)
const newInvite = ref({})

function isObject(variable) {
    return variable !== null && typeof variable === 'object';
}


const inviteRef = dbRef(db, `/users/${user.email}`)
const sessionStatusRef = dbRef(db, `/sessions/${user.sessionId}`)
  onChildAdded(sessionStatusRef, (snapshot) => {
    const statusObj = snapshot.val()
    if(statusObj.hasOwnProperty('participants')){
      const arr = Object.values(statusObj.participants)
      arr.forEach((data) => {
        if(data.name != user.fname){
          if(data.status){
            user.chatParticipant = data.name
            user.sessionInviteeStatus = true

          }
          else{
            user.sessionInviteeStatus = false
          }
        }
      })

    }
  })     
  onChildChanged(sessionStatusRef, (snapshot) => {
    const statusObj = snapshot.val()
    if(statusObj.hasOwnProperty('participants')){
      const arr = Object.values(statusObj.participants)
      arr.forEach((data) => {
        if(data.name != user.fname){
          if(data.status){
            user.chatParticipant = data.name
            user.sessionInviteeStatus = true

          }
          else{
            user.sessionInviteeStatus = false
          }
        }
      })
    }
  })     

  onChildAdded(inviteRef, (snapshot) => {
      newInvite.value = snapshot.val()
      if(isObject(newInvite.value)){
        user.inviteMetaData = newInvite.value
        user.sessionId = user.inviteMetaData.sessionId
        chatInvite.value = true
      }
  })
  
  onChildChanged(inviteRef,(snapshot) => {
    newInvite.value = snapshot.val()
    if(isObject(newInvite.value)){
      user.inviteMetaData = newInvite.value
      user.sessionId = user.inviteMetaData.sessionId
      chatInvite.value = true


    }
  })
  
  function closeInviteCardHandler(){
    showInvitation.value = false
  }

  function declineClickHandler(){
    chatInvite.value = false

  }


async function logout(){
  await user.signOutClient()
  route.push("/")

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
