<template>
  <v-container class="mt-14">

    <v-row justify="center" class="pa-12">
      <v-sheet color="grey-lighten-1" style="width:75%" class="text-center" height="100">
        <v-card-text class="text-h6" style="margin-bottom: -20px;">
          Sessions
        </v-card-text>
          <v-row justify-content="center">
            <v-card-text class="text-h7 mb-8" style="display: flex; align-items: center;">
              <span style="margin-right: 10px;">{{ sessionText() }}</span>
              <ChatsComponent v-if="sessionActive"/>
            </v-card-text>
          </v-row>
      </v-sheet>
    </v-row>

    <v-row justify="center" class="pa-10">
      <v-card variant="outlined" color="indigo-lighten-2" style="width:55%" class="text-center" rounded>
        <v-card-text class="text-h6 text-black">
          <v-icon color="indigo-lighten-2" size="30">mdi-alert-circle</v-icon>
          For best results, ensure that live feed can be taken from a well-lit area and limit background noise as best as possible for JSL-to-text and speech-to-text translations.
        </v-card-text>
      </v-card>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" sm="6" class="text-center">
        <v-btn color="green darken-2" @click="startSession" height="100" width="300" :disabled="sessionActive" style="font-weight: bold">Start Session</v-btn>
        <v-snackbar
          v-model="sessionBool"
          multi-line
        >
          {{ session }}
        </v-snackbar>
      </v-col>
    </v-row>
   
  </v-container>
</template>

<script setup>
  import {useUserProfile} from '~/store/store'
  import ChatsComponent from './ChatsComponent.vue';
  const user = useUserProfile()
  const session = ref('')
  const sessionBool = ref(false)
  const sessionActive = ref(false)

  function startSession(){
    const sessionCreated = user.createSession()
    if (sessionCreated){
      session.value = "Session created successfully"
      sessionBool.value = sessionCreated
      sessionActive.value = true
    }
    else{
      session.value = "Session created unsuccessfully"
      sessionBool.value = true
    }
  }

  function sessionText() {
    return sessionActive.value ? "Session happening now" : "--Empty--";
  }
// export default {
//   data() {
//     return {
//       sessionActive: false,
//     };
//   },
//   computed: {
//     sessionText() {
//       return this.sessionActive ? "Session happening now" : "--Empty--";
//     },
//     sessionIcon() {
//       return this.sessionActive ? "mdi-check-circle" : "mdi-checkbox-blank-circle-outline";
//     }
//   },
//   methods: {
//     joinSession() {
//       // Handle join session button click
//     },
//     startSession() {
//       this.sessionActive = true;
//     }
//   }
//}
</script>

<style>
.session-button {
  margin-top: 20px;
}
</style>

