<template>
  <v-app :class="{'light-theme':!theme,'dark-theme':theme}">
    <v-app-bar :color="theme ? 'secondaryDarkBtnColor':''" app flat>
      <a href="/" class="mt-2">
        <v-avatar image="IslandSigns.png" size="300" class="mt-16"/>
      </a>
      <v-btn
        v-if="!$vuetify.display.mobile"
        style="text-transform:none;font-weight: bold;"
        variant="text"
        class="text-h6 ml-2"
      >
        Support
      </v-btn>
      <v-btn
        v-if="!$vuetify.display.mobile"
        style="text-transform:none;font-weight: bold;"
        variant="text"
        class="text-h6"

      >
        Research
      </v-btn>
      
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-app-bar-nav-icon v-if="$vuetify.display.mobile" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>

      <v-btn
        icon="mdi-theme-light-dark"
        @click="theme=!theme"
      />

      <v-btn
        v-if="!$vuetify.display.mobile"
        variant="outlined"
        @click="goToSignIn" 
        class="mr-2"
        width="30"
        style="text-transform:none;"
      >
        Log in
      </v-btn>

      <v-btn
        v-if="!$vuetify.display.mobile" 
        variant="flat"
        @click="goToRegister" 
        color='primary'
        style="text-transform:none;"
      >
        Get started
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-if="$vuetify.display.mobile"
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'top' : undefined"
        temporary
      >
        <v-list lines="two">
          <v-list-item>
            <v-btn
              style="text-transform:none;font-weight: bold;width: 90%;"
              variant="text"
              append-icon="mdi-chevron-right"
            >
              Support
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              style="text-transform:none; font-weight: bold;width: 90%;"
              variant="text"
              append-icon="mdi-chevron-right"
            >
              Research
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              variant="outlined"
              @click="goToSignIn" 
              class="mr-2"
              style="text-transform:none;width: 90%;"
            >
              Log in
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              variant="flat"
              @click="goToRegister" 
              color="blue-lighten-1"
              style="text-transform:none;width: 90%;"

            >
              Register
            </v-btn>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-container class="justify-center">
    <v-row class="justify-center mt-16">
      <v-card-text class="text-h4 text-center" style="font-family: Verdana;font-weight: bold;">
      <span :class="{'text-color-light':theme,'text-color-dark':!theme}">Creating Connections.</span> <span class="text-blue-lighten-1">One Sign at a Time</span>
      </v-card-text>
    </v-row>
  </v-container>
    <v-row class="justify-center mt-16" align="center">
      <v-avatar image="sign.png" size="200" draggable="false"/>
    </v-row>
    <v-row ref="animateLeft" class="justify-start mt-16 slide-in-left">
      <v-card elevation="10" variant="flat" class="rounded-te-pill rounded-be-pill" color="primary">
        <v-card-text class="text-left text-black font-weight-bold" style="font-size:x-large;font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">For those who sign</v-card-text>
      <v-card-text class="text-left text-white" style="font-size: large;font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">        
        Communicate seamlessly
        with others who may not know Jamaican Sign Language.
      </v-card-text>
      </v-card>
    </v-row>
    <v-row class="justify-center mt-16" align="center">
      <v-avatar image="speak.png" size="200" draggable="false"/>
    </v-row>
    <v-row class="justify-end mt-16">
      <v-card elevation="10" variant="flat" class="rounded-ts-pill rounded-bs-pill slide-in-left" color="secondary_a">
        <v-card-text class="text-right text-black font-weight-bold" style="font-size:x-large;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">For those who speak</v-card-text>
      <v-card-text class="text-right text-white" style="font-size: large;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">        
        Connect and Engage in conversations with persons from the deaf/hard-of-hearing community.
      </v-card-text>
      </v-card>
    </v-row>
    <v-row class="justify-center mt-16">
      <v-avatar image="artificial-intelligence.gif" size="200"/>
    </v-row>
    <v-row class="justify-start">
      <v-card elevation="10" variant="flat" class="rounded-te-pill rounded-be-pill" color="secondary_b">
        <v-card-text class="text-left text-black" style="font-size:large;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
          Redefining Communication with <span class="text-blue-lighten-1" style="font-size: x-large;">Artificial Intelligence</span>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row class="justify-center mt-16">
      <v-card elevation="10" variant="flat" class="rounded-pill" color="#4a154b">
        <v-card-text class="text-left text-white" style="font-size:x-large;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
        Why choose IslandSigns?
        </v-card-text>
      </v-card>
    </v-row>
    <v-row class="justify-center" no-gutters>      
      <div class="pa-5">
        <v-card class="mt-16" variant="" style="width: 300px;">
          <v-sheet class="mt-2" :color="theme ? 'primaryDarkBgColor':'bckgrnd'">
            <v-img src="jamaica.png" height="80"/>
          </v-sheet>
        <v-sheet color="green-lighten-1" class="mt-5">
          <v-card-text class="font-weight-bold text-black">
          Built by Jamaicans, for Jamaicans
        </v-card-text>
        </v-sheet>
        </v-card>
      </div>
      <div class="pa-5">
          <v-card class="mt-16" variant="" style="width: 300px;">
            <v-sheet class="mt-2" :color="theme ? 'primaryDarkBgColor':'bckgrnd'">
              <v-img src="unite.png" height="80"/>
            </v-sheet>
          <v-sheet color="blue-lighten-1" class="mt-5">
            <v-card-text class="font-weight-bold text-black">
            Promoting Inclusivity
          </v-card-text>
          </v-sheet>
          </v-card>
      </div>
      <div class="pa-5">
        <v-card class="mt-16" variant="" style="width: 300px;">
          <v-sheet class="mt-2" :color="theme ? 'primaryDarkBgColor':'bckgrnd'">
            <v-img src="communication.png" height="80"/>
          </v-sheet>
        <v-sheet color="orange-lighten-1" class="mt-5">
          <v-card-text class="font-weight-bold text-black">
          Bridging the communication gap
        </v-card-text>
        </v-sheet>
        </v-card>
      </div>
    </v-row>
    <v-row class="justify-center mt-16">
      <v-card elevation="10" variant="flat" class="rounded-pill" color="#4a154b">
        <v-card-text class="text-left text-white" style="font-size:x-large;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
        Features
        </v-card-text>
      </v-card>
    </v-row>

    <v-row class="justify-center mt-16">
      <v-avatar image="webcam.png" size="150"/>
    </v-row>
    <v-row class="justify-end mt-7">
      <v-card elevation="10" variant="flat" class="rounded-ts-pill rounded-bs-pill" color="blue-lighten-1">
        <v-card-text class="text-right text-white" style="font-size:x-large;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
          Real-time Jamaican Sign Language to Text Translations
        </v-card-text>
      </v-card>
    </v-row>
    <v-row class="justify-center mt-16">
      <v-avatar image="microphone.png" size="150"/>
    </v-row>
    <v-row class="justify-start">
      <v-card elevation="10" variant="flat" class="rounded-te-pill rounded-be-pill" color="green-lighten-1">
        <v-card-text class="text-left text-white" style="font-size:x-large;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
          Automatic Speech Recognition
        </v-card-text>
      </v-card>
    </v-row>
    <v-row class="justify-center mt-16">
      <v-avatar image="encrypted-data.png" size="150"/>
    </v-row>
    <v-row class="justify-end">
      <v-card elevation="10" variant="flat" class="rounded-ts-pill rounded-bs-pill" color="orange-lighten-1">
        <v-card-text class="text-right text-white" style="font-size:x-large;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
          Encrypted Text Messaging
        </v-card-text>
      </v-card>
    </v-row>
  <v-footer class="mt-16" :color="theme ? 'secondaryDarkBtnColor':'primary'">
        <v-container fluid>
          <v-row>
            <v-container>
              <v-row>
                <v-col>
                  <v-card-text class="text-body-1">
                    Company
                  </v-card-text>
                  <v-card-text class="underline-link" href="">
                    About
                  </v-card-text>
                  <v-card-text class="underline-link">
                    Contact Us
                  </v-card-text>
                </v-col>
              <v-col>
              <v-card-text class="text-body-1">
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
              <v-card-text class="text-body-1">
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
  </v-footer>

  </v-app>

</template>
  
<script setup>
  import { ref } from 'vue'

  const route = useRouter()
  const drawer = ref(false)
  const theme = ref(false)
  const animateLeft = ref(null)

  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  const onScroll = () => {
    if (animateLeft.value && isElementInViewport(animateLeft.value)) {
      animateLeft.value.classList.add('slide-in-left');
      window.removeEventListener('scroll', onScroll);  // Remove listener after animation triggers
    }
  }

  onMounted(()=>{
    window.addEventListener('scroll',onScroll)
  })
  

    // Handle register button click
    const goToRegister = () => {
    // Implement your register logic here
    route.push( '/register' )
  };
  const goToSignIn = () => {
    // Implement your register logic here
    route.push( '/login' )
  };


</script>

  
  <style scoped>
  /* General styles */
  .light-theme {
    background-color: #e9eef2;
  }
  .dark-theme {
    background-color: #0b141a;
  }
  .text-color-light{
    color: #fff;
  }
  .text-color-dark{
    color: #000000;
  }
  @keyframes slideInFromLeft {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .slide-in-left{
    animation: slideInFromLeft 1s ease-out forwards;
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