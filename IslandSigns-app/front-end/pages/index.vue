<template>
  <v-app>
    <v-app-bar app flat>
      <v-avatar href="/" image="IslandSigns-logo.png" size="100"/>
      <v-card-title class="text-h6" style="font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">IslandSigns</v-card-title>

      <v-btn
        style="text-transform:none;"
      >
        Support
      </v-btn>
      <v-btn
        style="text-transform:none;"
      >
        Research
      </v-btn>

      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>

      <v-btn 
        variant="outlined"
        @click="goToSignIn" 
        class="mr-2"
        width="30"
        style="text-transform:none;"
      >
        Log in
      </v-btn>

      <v-btn 
        variant="flat"
        @click="goToRegister" 
        color="blue-lighten-1"
        style="text-transform:none;"

      >
        Register
      </v-btn>
    </v-app-bar>
    <v-card style="width: 100%;" class="mt-16">
      <v-sheet color="blue-lighten-1" style="width: 100%;">
        <v-card-text align="center" class="text-h4" style="font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">
          What is IslandSigns?
        </v-card-text>

        <v-card-text align="left" class="text-h6" style="font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">
          IslandSigns serves as a pivotal communication solution between the deaf or hard-of-hearing community and hearing individuals when making banking transactions in Jamaica.
          We train our custom AI model on a variety of banking scenarios to capture JSL in real-time. Allowing for seamless communication and creating an inclusive space for deaf Jamaicans.
        </v-card-text>
      </v-sheet>
      </v-card>      

    <v-container class="mt-10">
      <v-row  class="mt-10">
        <v-col/>
        <v-col>
          <v-card-title class="text-h5 text-blue-lighten-1" style="font-family: Verdana, Geneva, Tahoma, sans-serif;">
            For those who Sign
          </v-card-title>
          <v-img src="sign.png" width="300"/>
        </v-col>
        <v-col>
          <v-card-title class="text-h5 text-blue-lighten-1" style="font-family: Verdana, Geneva, Tahoma, sans-serif;">
            For those who Speak
          </v-card-title>
          <v-img src="speak.png" width="300"/>
        </v-col>
        <v-col/>
      </v-row>
    </v-container>
    <v-row class="mt-10">
        <v-card class="rounded-sm" color="" variant="flat" style="width: 100%;">
          <v-row>
            <v-col/>
            <v-col>
            <v-row class="mt-2">
            <v-card-title class="text-h4 text-blue-lighten-1" style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            Redefining
          </v-card-title>
          </v-row>
          <v-row>
            <v-card-title class="text-h4 text mt-6"  style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            your banking experience
          </v-card-title>
          </v-row>
          <v-row>
            <v-card-title class="text-h4 mt-6"  style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              with
            </v-card-title>
            <v-card-title class="text-h4 text-green-lighten-1 mb-5 mt-6"  style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              Artificial Intelligence
            </v-card-title>
          </v-row>
          </v-col>
          <v-col>
            <v-img height="150" src="bank.png"/>
            <v-img height="150" src="artificial-intelligence.gif"/>

          </v-col>
          <v-col/>


          </v-row>
        </v-card>
    </v-row>
    <v-row class="mt-10">
      
      <v-col>
        <v-container class="mt-10">
          <v-card-text class="text-h4">How to Use</v-card-text>
          <br>
          <v-chip color="green">1</v-chip> <span>Create your account.</span>
          <v-chip color="green" class="ml-5">2</v-chip> <span>Start a session.</span>
          <v-chip color="green" class="ml-5">3</v-chip> <span>Begin your conversation and our app will do the rest.</span>      
        </v-container>
      </v-col>
      <!-- <v-col>
        <v-card variant="flat" class="rounded-xl mt-10" color="blue-lighten-4" style="max-width: 600px; margin: 0 auto;">
          <v-row>
        <v-col>
          <v-card-text align="left" class="text-h6" style="font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">
            IslandSigns serves as a pivotal communication solution between the deaf or hard-of-hearing community and hearing individuals when making banking transactions in Jamaica.
            We train our custom AI model on a variety of banking scenarios to capture JSL in real-time. Allowing for seamless communication and creating an inclusive space for deaf Jamaicans.

          </v-card-text>
        </v-col>
      </v-row><br>
        </v-card>
      </v-col> -->
    </v-row>
    <v-container>
      <v-card-text class="text-h4" style="font-family:'Lucida Sans';">
        Features
      </v-card-text>
    </v-container>
    <v-container>
      <v-row>
        <v-card variant="flat" style="width: 300px;">
          <v-sheet class="mt-2">
            <v-img src="webcam.png" height="80"/>
          </v-sheet>
          <v-sheet class="mt-5">
            <v-card-text class="text-center" style="font-family:Arial, Helvetica, sans-serif;">
            Real-time JSL-to-text transcriptions
          </v-card-text>
          </v-sheet>
        </v-card>
        <v-card variant="flat" style="width: 300px;">
          <v-sheet class="mt-2">
            <v-img src="microphone.png" height="80"/>
          </v-sheet>
          <v-sheet class="mt-5">
            <v-card-text class="text-center" style="font-family:Arial, Helvetica, sans-serif;">
            Automatic Speech Recognition
          </v-card-text>
          </v-sheet>
        </v-card>
        <v-card variant="flat" style="width: 300px;">
          <v-sheet class="mt-2">
            <v-img src="encrypted-data.png" height="80"/>
          </v-sheet>
          <v-sheet class="mt-5">
            <v-card-text class="text-center" style="font-family:Arial, Helvetica, sans-serif;">
            Encrypted Messaging
          </v-card-text>
          </v-sheet>
        </v-card>



      </v-row>
    </v-container>

    <v-container justify-content="center">
      <v-card-text class="text-h4" style="font-family:'Lucida Sans';">
        Why Choose IslandSigns?
      </v-card-text>
    </v-container>
    <v-container>
      <v-row>
        <v-card elevation="10" class="rounded-xl" variant="plain" style="width: 300px;">
          <v-sheet class="mt-2">
            <v-img src="jamaica.png" height="80"/>
          </v-sheet>
          <v-sheet color="yellow-lighten-2" class="mt-5">
            <v-card-text class="font-weight-bold text">
            Built by Jamaicans, For Jamaicans
          </v-card-text>
          </v-sheet>
        </v-card>
        <v-card elevation="10" class="ml-5 rounded-xl" variant="plain" style="width: 300px;">
          <v-sheet class="mt-2">
            <v-img src="unite.png" height="80"/>
          </v-sheet>
          <v-sheet color="blue-lighten-1" class="mt-5">
            <v-card-text class="font-weight-bold text-black">
            Promoting Inclusivity
          </v-card-text>
          </v-sheet>
        </v-card>
        <v-card elevation="10" class="ml-5 rounded-xl" variant="plain" style="width: 300px;">
          <v-sheet class="mt-2">
            <v-img src="communication.png" height="80"/>
          </v-sheet>
          <v-sheet color="green-lighten-1" class="mt-5">
            <v-card-text class="font-weight-bold text-black">
            Bridging the communication gap
          </v-card-text>
          </v-sheet>
        </v-card>

      </v-row>
      </v-container>
    <footer class="mt-10">
          <v-container fluid>
            <v-row>
              <v-container>
                <v-row>
                  <v-col>
                    <v-card-text class="text-blue-lighten-1 text-body-1">
                      Company
                    </v-card-text>
                    <v-card-text class="underline-link">
                      About
                    </v-card-text>
                    <v-card-text class="underline-link">
                      Contact Us
                    </v-card-text>
                  </v-col>
               <v-col>
                <v-card-text class="text-blue-lighten-1 text-body-1">
                  Blog
                </v-card-text>
                <v-card-text class="underline-link">
                  JSL
                </v-card-text>
                <v-card-text class="underline-link">
                  Resources
                </v-card-text>
               </v-col>
               <v-col>
                <v-card-text class="text-blue-lighten-1 text-body-1">
                  Learn
                </v-card-text>
                <v-card-text class="underline-link">
                  Help Center
                </v-card-text>
               </v-col>
            </v-row>
              </v-container>
            </v-row>
            <v-row>            
              
                <span 
                  class="text-center text-caption grey--text"
                >
                  &copy; ISLANDSIGNS 2024
                </span>            
                <span class="ml-2 mt-n2">
                  <a class="text-center grey--text" style="text-decoration: underline; font-size: small">Privacy</a>
                </span>
                <span class="ml-2 mt-n2">
                  <a class="text-center grey--text" style="text-decoration: underline; font-size: small">Terms</a>
                </span>
              <v-col/>
              <v-col/>
              <v-col/>
              <v-col/>
              <v-col/>
            </v-row>
          </v-container>
        </footer>

  </v-app>
</template>
  
  <script setup>

  const route = useRouter()
  

    // Handle register button click
    const goToRegister = () => {
    // Implement your register logic here
    route.push( '/register' )
  };
  const goToSignIn = () => {
    // Implement your register logic here
    route.push( '/SigninPage' )
  };


</script>

  
  <style scoped>
  /* General styles */
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }
  .underline-link {
    text-decoration: none; /* Remove underline by default */
  }

  .underline-link:hover {
    text-decoration: underline; /* Add underline on hover */
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  /* Header styles */
  /* header {
    background-color: #e2dfdf;
    padding: 1rem;
  } */

  /* .hdimg-logo{
    width: 75px;
    margin-right: 20px;
  } */
  
  nav ul {
    list-style: none;
    padding: 0;
  }
  
  nav ul li {
    display: inline-block;
    margin-right: 1rem;
  }
  
  nav ul li:last-child {
    margin-right: 0;
  }

  li a {
    display: block;
    color: black;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}


  li a:hover {
    background-color: #7c7c7c;
 }
  
  /* Hero section styles */
  .hero {
    background-image: url('https://via.placeholder.com/1500x500');
    background-size: cover;
    background-position: center;
    color: #fff;
    padding: 5rem 1rem;
    text-align: center;
  }
  
  .head {
    max-width: 600px;
    margin: 0 auto;
  }

  .head-content {
    display: flex;

  }
  
  .head-content h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  /* .head-content img {
    width: 60px;
    height: auto;
  } */
  
  .head-content p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  
  .hero button {
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  /* Features section styles */
  .type-options {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    /*padding: 4rem 0;*/
    padding: 10px;
  }
  
  .language-option{
    flex: 1 1 300px;
    padding: 0 1rem;
    text-align: center;
  }
  
  .language-option h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  
  .language-option p {
    font-size: 1.2rem;
  }

  /* .language-option img {
    width: 300px;
    height: 250px;
  } */

  .button-options{
    display: flex;

  }

  .con-btn{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  

  .button-options button {
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .button-options .login-btn {
    padding: 20px;
    width: 200px;
  }

  .button-options .register-btn {
    padding: 20px;
    width: 200px;
  }


  .about{
    display: block;
    max-width: 600px;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    padding: 30px;
    background-color: rgb(255, 142, 142);
    max-width: 100%;

  }

  .how-to {
    display: block;
    max-width: 100%;
    margin: 0 auto;
    justify-content: center;
    padding: 30px;

  }

  .about-one{
    max-width: 70%;
  }

  .how-one{
    max-width: 80%;
  }

  .start{
    background-color: rgb(215, 255, 155);
    width: 30px;

    border-radius: 100%;
    text-align: center;
    margin-right: 10px;
  }

  .use{
    display: flex;
    padding: 10px;
  }



  
  /* Footer styles */
  footer {
    background-color: #7c7c7c;
    color: #fff;
    font-size: 20px;
    padding: 1rem;
    text-align: center;
  }

  .social-media{
    display: flex;
    justify-content: center;
    align-items: center;
  }


  /* footer img{
    width: 50px;
    height: auto;
    margin: 7px;

  } */
  </style>