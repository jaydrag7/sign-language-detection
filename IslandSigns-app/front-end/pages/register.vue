<template>
  <div id="app">
    <v-avatar image="IslandSigns-logo.png" size="120" class="mb-n7"/>
    <form @submit.prevent="submitForm" class="signup-form">
      <v-row align="center" class="mb-2">
        <v-btn icon="mdi-arrow-left" variant="tonal" class="mb-2" color="#61be61" @click="goBack"/>
        <v-card-text class="ml-10 font-weight-bold text-h6">Register</v-card-text>
      </v-row>

      <div class="form-group">
        <v-text-field variant="outlined" id="bankName" label="Bank Name" v-model="bankName"></v-text-field>
      </div>
      <div class="form-group">
        <v-text-field variant="outlined" id="bankBranch" label="Bank Branch" v-model="bankBranch"></v-text-field>
      </div>
      <div class="form-group">
        <v-text-field variant="outlined" id="tellerStationNumber" label="Teller Station Number" v-model="tellerStationNumber"></v-text-field>
      </div>
      <div class="form-group">
        <v-text-field variant="outlined" id="passcode" label="Passcode" v-model="passcode" type="password"></v-text-field>
      </div>
      <div>
        <v-card-text v-if="isRegistered">
          You are now a registered user.
        </v-card-text>
      </div>
      <v-btn @click=submitForm class="submit-button" style="text-transform: none;" :disabled="isEmpty()">Register</v-btn>
    </form>
  </div>
</template>
<script setup>
  import { ref } from 'vue';
  import {useUserProfile} from '~/store/store';
  import base64 from 'base-64'


  const user= useUserProfile()
  const route = useRouter()
  const bankName = ref('')
  const bankBranch = ref('')
  const tellerStationNumber = ref('')
  const passcode = ref('')
  const formData= ref({
    bankName : '',
    bankBranch: '',
    tellerStationNumber : '',
    passcode : '',

  })
  const isRegistered = ref(false)

  const goBack = () => {
    isRegistered.value=false
    route.push("/")
};



  async function submitForm() {
    formData.bankName = bankName.value
    formData.bankBranch = bankBranch.value
    formData.tellerStationNumber = tellerStationNumber.value
    formData.passcode = base64.encode(encodeURI(passcode.value))
    
    await user.register(formData) 
    isRegistered.value=true
   
  }

  function isEmpty(){
  return bankName.value === '' || bankBranch.value === '' || tellerStationNumber.value === '' || passcode.value === ''
}
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.header {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 20px;
}

.back-button {
  top: 120px;
  right: 250px;
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

.sign-in-image {
  width: 180px;
  height: 180px;
  object-fit: cover;
  margin-bottom: 3px;
}

.signup-form {
  width: 330px;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
}

.submit-button {
  width: 50%; 
  left:70px;
  padding: 10px;
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
</style>
