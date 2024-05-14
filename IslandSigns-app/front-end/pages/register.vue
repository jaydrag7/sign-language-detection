<template>
<!--<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
-->

  <v-container style="justify-content: center; width: 700px" class="mt-5">

    <div class="r-container">
      <router-link :to="{ path: '/' }">
      <v-btn class="back-btn"> ← Back</v-btn>
    </router-link>

    <div class="register-page">
      <div class="logo-img">
        <v-img src="IslandSigns-logo.png" alt="Island Signs Logo"/>
      </div>

      <h2><b>Register</b></h2>
      <br>
      <p></p>

      <v-form >
        <v-row>
          <v-col cols="12"  class="form-group">
            <v-label>Bank Name</v-label>
            <v-text-field v-model="bankName" required></v-text-field>
          </v-col>
          <v-col cols="12" class="form-group">
            <v-label>Bank Branch</v-label>
            <v-text-field v-model="bankBranch" required></v-text-field>
          </v-col>
          <v-col cols="12" class="form-group">
            <v-label>Teller Station Number</v-label>
            <v-text-field v-model="tellerStationNumber" required></v-text-field>
          </v-col>
          <v-col cols="12" class="form-group">
            <v-label>Passcode</v-label>
            <v-text-field type="password" v-model="passcode" required></v-text-field>
          </v-col>
          <v-col cols="12" class="form-group">
            <!--<v-label for="confirmPassword">Confirm Passcode</v-label>
            <v-text-field type="password" id="confirmPassword" v-model="confirmPassword" required></v-text-field>
            <span v-if="passwordsMatch === false" class="error">Passwords do not match</span>-->
          </v-col>
        </v-row>
        <div class="s-btn">
          <v-btn @click="submitForm">Register</v-btn>
        </div>
      </v-form>
    </div>
  </div>
  </v-container>
  
</template>

<script setup>
  import { ref } from 'vue';
  import {useUserProfile} from '~/store/store';

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


  async function submitForm() {
    formData.bankName = bankName.value
    formData.bankBranch = bankBranch.value
    formData.tellerStationNumber = tellerStationNumber.value
    formData.passcode = passcode.value
    
    await user.register(formData)
    // route.push('/')

    
  };

</script>

<style scoped>

.form-group{
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}


.r-container{
  border-style: solid;
  border-color: rgb(161, 161, 161);
  border-width: 1px;
  padding: 30px;
}

.register-page{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
}

label {
  margin-bottom: 0.5rem;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: rgb(233, 233, 233);
}

button {
  padding: 0.5rem 1rem;
  background-color: #82f0ac;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: red;
}

.s-btn{
  display: flex;
  align-items: center;
  justify-content: center;
}


/* img{
  height: auto;
  width: 90px;
} */

/* .logo-img{
  display: flex;
  flex-direction: row;
} */

.back-btn{
  border-radius: 20px;
  width: 100px;
}

form{
  width: 300px;
}
</style>
