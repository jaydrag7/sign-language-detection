<template>
  <v-container class="mt-14">

    <v-row justify="center" class="pa-12">
      <v-sheet color="grey-lighten-1" style="width:75%" class="text-center" height="100">
        <v-card-text class="text-h6" style="margin-bottom: -20px;">
          Sessions
        </v-card-text>
        <v-card-text class="text-h7 mb-8" style="display: flex; align-items: center;">
          <span style="margin-right: 10px;">{{ sessionText }}</span>
          <v-btn color="red" @click="joinSession" v-if="sessionActive" style="margin-left: 10px;">Join</v-btn>
        </v-card-text>
      </v-sheet>
    </v-row>

    <v-row justify="center" class="pa-10">
      <v-sheet color="indigo-lighten-2" style="width:55%" class="text-center" rounded>
        <v-card-text class="text-h6">
          <v-icon color="black" size="30">mdi-alert-circle</v-icon>
          For best results, ensure that live feed can be taken from a well-lit area and limit background noise as best as possible for JSL-to-text and speech-to-text translations.
        </v-card-text>
      </v-sheet>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" sm="6" class="text-center">
        <v-btn color="green darken-2" @click="startSession" height="100" width="300" :disabled="sessionActive" style="font-weight: bold">Start Session</v-btn>
      </v-col>
    </v-row>
   
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      sessionActive: false,
    };
  },
  computed: {
    sessionText() {
      return this.sessionActive ? "Session happening now" : "--Empty--";
    },
    sessionIcon() {
      return this.sessionActive ? "mdi-check-circle" : "mdi-checkbox-blank-circle-outline";
    }
  },
  methods: {
    joinSession() {
      // Handle join session button click
    },
    startSession() {
      this.sessionActive = true;
    }
  }
}
</script>

<style>
.session-button {
  margin-top: 20px;
}
</style>

