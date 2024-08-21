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
        <v-text-field variant="outlined" id="email" label="email" v-model="existingEmail"></v-text-field>
      </div>
      <div class="form-group">
        <v-text-field variant="outlined" id="password" label="password" type="password" v-model="existingPassword"></v-text-field>
      </div>
      <span class="text-green-lighten-1 text-body-2">{{ signinMsg }}.</span>
      <v-btn
          size="x-large"
          style="text-transform: none;"
          variant="tonal"
          :disabled="isSignInEmpty()"
          :loading="btnLoading"
          @click="EmPassClient()"
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
          @click="googleSignIn()"
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
        <v-text-field variant="outlined" id="email" label="email" v-model="newClientEmail"></v-text-field>
      </div>
      <div class="form-group">
        <v-text-field variant="outlined" id="username" label="username" v-model="newClientUsername"></v-text-field>
      </div>
      <div class="form-group">
        <v-text-field variant="outlined" id="password" label="password" type="password" v-model="newClientPassword"></v-text-field>
      </div>
      <span class="text-green-lighten-1 text-body-2">{{ registerMsg }}.</span>
      <v-btn
          size="x-large"
          style="text-transform: none;"
          variant="flat"
          color="primary"
          @click="newEmPassClient()"
          :disabled="isRegisterEmpty()"
          :loading="btnLoading"
        >
          Continue
        </v-btn>
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
  import base64 from 'base-64';
  import {auth} from '~/utils/firebase';
  import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';

  const user= useUserProfile()
  const route = useRouter()
  const bankName = ref('')
  const bankBranch = ref('')
  const tellerStationNumber = ref('')
  const passcode = ref('')
  const newClientEmail = ref('')
  const newClientUsername = ref('')
  const newClientPassword = ref('')
  const registerMsg = ref('')
  const signinMsg = ref('')
  const existingEmail = ref('')
  const existingPassword = ref('')
  const formData= ref({
    bankName : '',
    bankBranch: '',
    tellerStationNumber : '',
    passcode : '',

  })
  const isRegistered = ref(false)
  const showSignUpWindow = ref(false)
  const btnLoading = ref(false)

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

  function isRegisterEmpty(){
  return newClientEmail.value === '' || newClientUsername.value === '' || newClientPassword.value === ''
}
  function isSignInEmpty(){
  return existingEmail.value === '' || existingPassword.value === ''
}

async function googleSignIn(){
  const provider = new GoogleAuthProvider();
  try{
    const popUp = await signInWithPopup(auth,provider)
    const client = popUp.user
    const clientName = client.displayName
    const email = client.email
    const bytes = encodeURI(email)
    const encodedEmail = base64.encode(bytes)

    await user.getUsers()
    const existingClients = user.users
    const existingClientEmails =  Object.keys(existingClients)
    for (let i=0;i<existingClientEmails.length;i++){
      if(existingClientEmails.includes(encodedEmail)){
        const index = existingClientEmails.indexOf(encodedEmail)
        const clientsArr = Object.values(existingClients)
        const currentClient = clientsArr[index]
        const clientMetaData = {
          fname: currentClient.fname,
          lname: currentClient.lname,
          email: encodedEmail
        }
        await user.signInGoogleClient(clientMetaData)
        route.push('/home')

      }else{
        const newClientName = clientName.split(' ')
        const newClientfname = newClientName[0]
        const newClientlname = newClientName[1]
        const newClientMetaData = { 
          fname: newClientfname,
          lname: newClientlname,
          email: encodedEmail,
        }
        await user.createNewGoogleClient(newClientMetaData)
        route.push('/home')
      }
    }




  }
  catch(err){
    console.error(err)
  }
}

async function newEmPassClient(){
  try{
    btnLoading.value = true
    await createUserWithEmailAndPassword(auth,newClientEmail.value,newClientPassword.value)
    .then(async (userCredentials) => {
      const client = userCredentials.user
      const bytes = encodeURI(client.email)
      const encodedEmail = base64.encode(bytes)

      await user.getUsers()
      const existingClients = user.users
      const existingClientEmails =  Object.keys(existingClients)
      for (let i=0;i<existingClientEmails.length;i++){
        if(existingClientEmails.includes(encodedEmail)){
          registerMsg.value = 'This account already exists'
        }
        else{
          const clientMetaData = {
            fname: newClientUsername.value,
            email: encodedEmail,
            password: client.reloadUserInfo.passwordHash
          }
          await user.createNewEmPassClient(clientMetaData)
          setTimeout(() => (btnLoading.value = false), 3000)

          route.push('/home')
        }

      }
      console.log(client)

    })
  }
  catch(err){
    setTimeout(() => (btnLoading.value = false,registerMsg.value = 'This account already exists'), 3000)
    console.error(err.message)
  }
}

async function EmPassClient(){
  try{
    btnLoading.value = true
    await signInWithEmailAndPassword(auth,existingEmail.value,existingPassword.value)
    .then(async (userCredentials)=>{
      const client = userCredentials.user
      const bytes = encodeURI(client.email)
      const encodedEmail = base64.encode(bytes)
      const clientMetaData = {
        email:encodedEmail,
      }
      await user.signInEmPassClient(clientMetaData)
      setTimeout(() => (btnLoading.value = false), 3000)
      route.push('/home')

    })

  }
  catch(err){
    setTimeout(() => (btnLoading.value = false, signinMsg.value = 'Invalid Credential(s)'), 3000)
    console.error(err)
  }

}
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  background-color: #ffff;
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
</style>
