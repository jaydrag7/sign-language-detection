<template>
  <v-app :class="{'body':user.darkTheme}">
    <v-app-bar :color="user.darkTheme ? '#202c33':''">
      <v-btn style="text-transform: none;" class="text-h8" @click="">Support</v-btn>
      <v-img src="IslandSigns-logo.png"/>
      <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-account-circle" v-bind="props"/>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <v-switch @click="switchTheme()" prepend-icon="mdi-theme-light-dark" v-model="theme" color="blue-lighten-1" inset/>
                </v-list-item-title>
                <v-list-item-title>
                    <v-btn :style="{ textTransform: 'none' }" variant="text" prepend-icon="mdi-logout" @click="endSession(),logout()">
                        Sign Out
                    </v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list>
        </v-menu>

    </v-app-bar>

    <Home :theme="user.darkTheme"></Home>
  </v-app>
</template>

<script setup>
import Home from '../components/Home.vue'
import {useUserProfile} from '~/store/store'

const user = useUserProfile()
const accountBtnOpen = ref(false)
const route = useRouter()
const theme = ref(false)

function logout(){
  // accountBtnOpen.value = true
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
