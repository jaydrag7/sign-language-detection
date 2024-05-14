<template>
<!--<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>


  <v-container style="justify-content: center; width: 700px" class="mt-5">
      </v-container>
      -->
    <div class="r-container">
      <!--
      <div class="logo-img">
        <img src="~/public/IslandSigns-logo.png" alt="Island Signs Logo" class="logo-img"/>
      </div>
      -->
      <router-link :to="{ path: '/' }"><v-btn class="back-button"> ← Back</v-btn></router-link>
      <h1 class="header">Register</h1>

      <form class="register-form">
        
          <div class="form-group">
            <label>Bank Name</label>
            <v-text-field label="Bank Name" v-model="bankName" required></v-text-field>
          </div>
          <div class="form-group">
            <label>Bank Branch</label>
            <v-text-field label="Bank Branch" v-model="bankBranch" required></v-text-field>
          </div>
          <div class="form-group">
            <label>Teller Station Number</label>
            <v-text-field label="Teller Station Number" v-model="tellerStationNumber" required></v-text-field>
          </div>
          <div class="form-group">
            <label>Passcode</label>
            <v-text-field label="Passcode" type="password" v-model="passcode" required></v-text-field>
          </div>
          <!--
          <v-col cols="12" class="form-group">
            <v-label for="confirmPassword">Confirm Passcode</v-label>
            <v-text-field type="password" id="confirmPassword" v-model="confirmPassword" required></v-text-field>
            <span v-if="passwordsMatch === false" class="error">Passwords do not match</span>
          </v-col>
          -->
          <v-btn class="submit-button" @click="submitForm">Register</v-btn>
        

      </form>
    </div>

  
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
    route.push('/')

    
  };

</script>

<style scoped>

.form-group{
  margin-bottom: 1em;
}

/*
.r-container{
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
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
*/
/*
button {
  padding: 0.5rem 1rem;
  background-color: #82f0ac;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
/

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

 */
img{
  height: auto;
  width: 90px;
}

.logo-img{
  display: flex;
  flex-direction: row;
}

.back-btn{
  border-radius: 20px;
  width: 100px;
}

/* */
.r-container {
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  height: auto;
  background-color: #f5f5f5;
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

.logo-image {
  width: 180px;
  height: 180px;
  object-fit: cover;
  margin-bottom: 3px;
}

.register-form {
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
