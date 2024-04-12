<template>
  <v-app>
    <v-app-bar app color="white" dark>
      <v-btn text class="text-h8" style="font-weight: bold" @click="openSupport" color="green">Support</v-btn>
      <v-spacer></v-spacer>
      <v-img src="IslandSigns-logo.png" width="400" height="300"></v-img>
      <v-spacer></v-spacer>
      <v-btn text class="text-h8" style="font-weight: bold" @click="openTeller" color="green">
        <v-icon left>mdi-bank</v-icon>
        Teller
      </v-btn>
    </v-app-bar>

    <Home></Home>
  </v-app>
</template>

<script>
import Home from '../components/Home.vue';

export default {
  components: {
    Home,
  },
  methods: {
    openSupport() {
      // Handle support button click
    },
    openTeller() {
      // Handle teller button click
    },
  }
}
</script>
