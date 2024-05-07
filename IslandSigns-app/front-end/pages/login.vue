<template>
    <!--<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    -->
    
      <v-container style="justify-content: center; width: 700px" class="mt-5">
    
        <div class="r-container">
          <router-link :to="{ path: '/landingpage' }"><v-btn class="back-btn"> ← Back</v-btn></router-link>
    
        <div class="register-page">
          <div class="logo-img">
            <img src="~/assets/IslandSignslogo.png" alt="Island Signs Logo">
          </div>
    
          <h2><b>Login</b></h2>
          <br>
          <p></p>
    
          <v-form @submit.prevent="registerUser">
            <v-row>
              <v-col cols="12"  class="form-group">
                <v-label for="bankname">Bank Name</v-label>
                <v-text-field id="bankname" v-model="formData.bankname" required></v-text-field>
              </v-col>
              <v-col cols="12" class="form-group">
                <v-label for="bankbranch">Bank Branch</v-label>
                <v-text-field id="bankbranch" v-model="formData.bankbranch" required></v-text-field>
              </v-col>
              <v-col cols="12" class="form-group">
                <v-label for="tsnum">Teller Station Number</v-label>
                <v-text-field id="tsnum" v-model="formData.tsnum" required></v-text-field>
              </v-col>
              <v-col cols="12" class="form-group">
                <v-label for="password">Passcode</v-label>
                <v-text-field type="password" id="password" v-model="formData.password" required></v-text-field>
              </v-col>
            </v-row>
            <div class="s-btn">
              <v-btn type="submit" :disabled="passwordsMatch === false">Login</v-btn>
            </div>
          </v-form>
        </div>
      </div>
      </v-container>
      
    </template>
    
    <script>
    
    import { ref } from 'vue';
    
    export default {
      data() {
        return {
          formData: {
            bankname: '',
            bankbranch: '',
            tsnum: '',
            password: ''
          },
          confirmPassword: ''
        };
      },
      methods: {
        registerUser() {
          // Logic to register the user
        },
        passwordsMatch() {
          return this.formData.password === this.confirmPassword;
        }
      }
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
    
    form{
      width: 300px;
    }
    
    
    
    </style>
    