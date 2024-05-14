<template>
  <div id="app">
<<<<<<< HEAD
   <v-btn class="back-button" @click="goBack">← Back</v-btn>
   <img src="/Users/kobe/Desktop/Islandsigns/sign-language-detection/IslandSigns-app/front-end/public/logo1.png" alt="Logo" class="logo">
    <h1 class="header">Sign In</h1>
=======
    <h1 class="header"> <v-img src="IslandSigns-logo.png"/>Login</h1>
>>>>>>> a4a2d712532e044726d0a23a0822400425945cf8
    <form @submit.prevent="submitForm" class="signup-form">
      <div>
        <v-btn icon="mdi-arrow-left" variant="tonal" class="mb-2" color="#61be61" @click="goBack"/>
      </div>

      <div class="form-group">
        <label for="bankName"><b>Bank Name</b></label> 
        <v-text-field id="bankName" label="eg: NCB" v-model="bankName"></v-text-field>
      </div>
      <div class="form-group">
        <label for="bankBranch"><b>Bank Branch</b></label>
        <v-text-field id="bankBranch" label="eg: HWT2378" v-model="bankBranch"></v-text-field>
      </div>
      <div class="form-group">
        <label for="tellerStationNumber"><b>Teller Station Number</b></label>
        <v-text-field id="tellerStationNumber" label="eg: 2" v-model="tellerStationNumber"></v-text-field>
      </div>
      <div class="form-group">
        <label for="passcode"><b>Passcode</b></label>
        <v-text-field id="passcode" label="eg: #4892JyHG" v-model="passcode" type="password"></v-text-field>
      </div>
      <div>
        <v-card-text v-if="errormsg" class="error-message">
          {{response }}
        </v-card-text>
      </div>
      <v-btn @click=submitForm class="submit-button" style="text-transform: none;">Login</v-btn>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {useUserProfile} from '~/store/store';

const bankName = ref('');
const bankBranch = ref('');
const tellerStationNumber = ref('');
const passcode = ref('');
const user= useUserProfile()
const route =useRouter()
const goBack = () => {
  route.push("/")
};
const errormsg=ref(false)
const response=ref("")
async function submitForm() {
  
  response.value = await user.signIn(bankName.value,bankBranch.value,tellerStationNumber.value,passcode.value)
  if (response.value!="Password match"){
    errormsg.value=true

  }
  else{
    route.push("/chatsPage")
  }
  
};

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

#app {
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  height: 110vh;
  background-color: #fff;
}

.header {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 5px; 
  color: #333;
}

.signup-form {
  position: relative;
  max-width: 330px;
  width: 90%;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
}

.back-button {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #61be61;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 5px 15px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.back-button:hover {
  background-color: #008000;
}

.signup-form {
  max-width: 330px;
  width: 90%;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
}

.form-group {
  margin-bottom: 1em;
}

.submit-button {
  width: 100%; 
  padding: 5px; 
  background-color: #61be61; 
  color: white;
  border: none;
  border-radius: 50px; 
  cursor: pointer;
  margin-top: 20px; 
  display: flex;
  justify-content: center;
}

.submit-button:hover {
  background-color: #008000;
}

.error-message {
  color: red;
  font-size: 1.0em;
  margin-top: 0.5em;
}
.logo {
  width: 200px;
  height: 200px;
}


</style>
