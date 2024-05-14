<template>
  <v-app>
    <v-app-bar app dark>
      <v-btn class="text-h8" @click="">Support</v-btn>
      <v-img src="IslandSigns-logo.png"/>
      <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-account-circle" v-bind="props"/>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                    <v-btn :style="{ textTransform: 'none' }" variant="text" prepend-icon="mdi-logout" @click="logout">
                        Sign Out
                    </v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list>
        </v-menu>

    </v-app-bar>

    <Home></Home>
  </v-app>
</template>

<script setup>
import Home from '../components/Home.vue'

const accountBtnOpen = ref(false)
const route = useRouter()

function logout(){
  // accountBtnOpen.value = true
  route.push("/")

}

</script>
