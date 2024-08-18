<template>
  <div id="app" class="justify-center align-center">
    <form v-if="!showSignUpWindow" @submit.prevent="submitForm" class="signup-form mt-10 mb-5">
      <v-row class="justify-center mt-n12">
          <v-avatar image="IslandSigns-logo.png" size="150"/>
      </v-row>
      <v-row align="center" class="mt-n10">
        <v-btn icon="mdi-arrow-left" variant="tonal" class="mb-2" color="#61be61" @click="goBack"/>
        <v-card-text class="font-weight-bold text-h6 text-center mr-5">Welcome Back!</v-card-text>
      </v-row>
      <div class="form-group mt-10">
        <v-text-field variant="outlined" id="bankName" label="username" v-model="bankName"></v-text-field>
      </div>
      <div class="form-group">
        <v-text-field variant="outlined" id="bankBranch" label="password" v-model="bankBranch"></v-text-field>
      </div>
      <v-btn
          size="x-large"
          style="text-transform: none;"
          variant="tonal"
        >
        Sign in
        </v-btn>


      <v-row class="justify-center mt-5">
        <v-col>
          <v-divider class="border-opacity-100"/>
        </v-col>
        <span>or continue with</span>
        <v-col>
          <v-divider class="border-opacity-100"/>
        </v-col>
      </v-row>
        <v-btn
          size="x-large"
          prepend-icon="mdi-google"
          style="text-transform: none;"
          color="primary"
          variant="flat"
          class="mt-5"
        >
          Google
        </v-btn>

      <!-- <div class="form-group">
        <v-text-field variant="outlined" id="tellerStationNumber" label="Teller Station Number" v-model="tellerStationNumber"></v-text-field>
      </div>
      <div class="form-group">
        <v-text-field variant="outlined" id="passcode" label="Passcode" v-model="passcode" type="password"></v-text-field>
      </div> -->
      <div>
        <v-card-text v-if="isRegistered">
          You are now a registered user.
        </v-card-text>
      </div>
      <!-- <v-btn @click=submitForm class="submit-button" style="text-transform: none;" :disabled="isEmpty()">Register</v-btn> -->
    </form>
    <form v-if="showSignUpWindow" @submit.prevent="submitForm" class="signup-form mt-10 mb-5">
      <v-row class="justify-center mt-n12">
          <v-avatar image="IslandSigns-logo.png" size="150"/>
      </v-row>
      <v-row align="center" class="mt-n10">
        <v-btn icon="mdi-arrow-left" variant="tonal" class="mb-2" color="#61be61" @click="goBack"/>
        <v-card-text class="font-weight-bold text-h6 text-center mr-16">Register!</v-card-text>
      </v-row>
      <div class="form-group mt-10">
        <v-text-field variant="outlined" id="bankName" label="email" v-model="bankName"></v-text-field>
      </div>
      <div class="form-group">
        <v-text-field variant="outlined" id="bankName" label="username" v-model="bankName"></v-text-field>
      </div>
      <div class="form-group">
        <v-text-field variant="outlined" id="bankBranch" label="password" v-model="bankBranch"></v-text-field>
      </div>
      <v-btn
          size="x-large"
          style="text-transform: none;"
          variant="flat"
          color="primary"
        >
          Continue
        </v-btn>

      <!-- <div>
        <v-card-text v-if="isRegistered">
          You are now a registered user.
        </v-card-text>
      </div> -->
      <!-- <v-btn @click=submitForm class="submit-button" style="text-transform: none;" :disabled="isEmpty()">Register</v-btn> -->
    </form>
    <v-row v-if="!showSignUpWindow" class="mb-5">
      <span class="text-body-1">
      Don't have an account?
    </span>
    <v-btn
      size="x-small"
      style="text-transform: none;"
      variant="tonal"
      color="secondary_a"
      class="mt-1"
      @click="showSignUpWindow = !showSignUpWindow"
    >
      Sign up
    </v-btn>
    </v-row>
    <v-row v-if="showSignUpWindow" class="mb-5">
      <span class="text-body-1">
      Already have an account?
    </span>
    <v-btn
      size="x-small"
      style="text-transform: none;"
      variant="tonal"
      color="secondary_a"
      class="mt-1"
      @click="showSignUpWindow = !showSignUpWindow"
    >
      Login
    </v-btn>
    </v-row>
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
  const showSignUpWindow = ref(false)

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
  border:1px solid;
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
