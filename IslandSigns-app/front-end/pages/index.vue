<template>
  <v-app :class="{'light-theme':!theme,'dark-theme':theme}">
    <v-app-bar :color="theme ? 'secondaryDarkBtnColor':''" app flat>
      <a v-if="!$vuetify.display.mobile" href="/" class="mt-2">
        <v-avatar image="IslandSigns.png" size="300" class="mt-16"/>
      </a>
      <a v-if="$vuetify.display.mobile" href="/" class="mt-5">
        <v-avatar image="IslandSigns.png" size="250" class="mt-10"/>
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

      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>

      <v-btn
        icon="mdi-theme-light-dark"
        @click="theme=!theme"
        class="mr-2"
      />
      <v-app-bar-nav-icon v-if="$vuetify.display.mobile" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>


      <!-- <v-btn
        v-if="!$vuetify.display.mobile"
        variant="outlined"
        @click="goToSignIn" 
        class="mr-2"
        width="30"
        style="text-transform:none;"
      >
        Log in
      </v-btn> -->

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
              size="large"
            >
              Support
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              style="text-transform:none; font-weight: bold;width: 90%;"
              variant="text"
              append-icon="mdi-chevron-right"
              size="large"
            >
              Research
            </v-btn>
          </v-list-item>
            <!-- <v-btn
              variant="outlined"
              @click="goToSignIn" 
              class="mr-2"
              style="text-transform:none;width: 90%;"
            >
              Log in
            </v-btn> -->
          <v-list-item>
            <v-btn
              variant="flat"
              @click="goToRegister" 
              color="blue-lighten-1"
              style="text-transform:none;width: 90%;"
              size="x-large"
            >
              Get Started
            </v-btn>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    <v-row class="justify-center mt-16">
      <v-card-text class="text-h4 text-center" style="font-family: Verdana;font-weight: bold;">
      <span :class="{'text-color-light':theme,'text-color-dark':!theme}">Creating Connections.</span> <span class="text-blue-lighten-1">One Sign at a Time</span>
      </v-card-text>
    </v-row>
    <v-row class="justify-center mt-16" align="center">
      <v-avatar image="sign.png" size="200" draggable="false"/>
    </v-row>
    <v-row class="mt-16">
      <v-card ref="animateLeft_1" elevation="10" variant="flat" class="rounded-te-pill rounded-be-pill" color="primary">
        <v-card-text class="text-left text-black font-weight-bold" style="font-size:x-large;font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
          For those who sign
        </v-card-text>
      <v-card-text class="text-left text-white" style="font-size: large;font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">        
        Communicate seamlessly
        with others who may not know Jamaican Sign Language.
      </v-card-text>
      </v-card>
    </v-row>
    <v-row class="justify-center mt-16" align="center">
      <v-avatar image="speak.png" size="200" draggable="false"/>
    </v-row>
    <v-row  class="justify-end mt-16">
      <v-card ref="animateRight_1"  elevation="10" variant="flat" class="rounded-ts-pill rounded-bs-pill" color="secondary_a">
        <v-card-text class="text-right text-black font-weight-bold" style="font-size:x-large;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
          For those who speak
        </v-card-text>
      <v-card-text class="text-right text-white" style="font-size: large;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">        
        Connect and Engage in conversations with persons from the deaf/hard-of-hearing community.
      </v-card-text>
      </v-card>
    </v-row>
    <v-row class="justify-center mt-16">
      <v-avatar image="artificial-intelligence.gif" size="200"/>
    </v-row>
    <v-row class="justify-start mt-10">
      <v-card ref="animateLeft_2" elevation="10" variant="flat" class="rounded-te-pill rounded-be-pill" color="secondary_b">
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
        <v-card class="mt-16" variant="text" style="width: 300px;">
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
          <v-card class="mt-16" variant="text" style="width: 300px;">
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
        <v-card class="mt-16" variant="text" style="width: 300px;">
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
      <v-card ref="animateRight_2" elevation="10" variant="flat" class="rounded-ts-pill rounded-bs-pill" color="blue-lighten-1">
        <v-card-text class="text-right text-white" style="font-size:x-large;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
          Real-time Jamaican Sign Language to Text Translations
        </v-card-text>
      </v-card>
    </v-row>
    <v-row class="justify-center mt-16">
      <v-avatar image="microphone.png" size="150"/>
    </v-row>
    <v-row class="justify-start">
      <v-card ref="animateLeft_3" elevation="10" variant="flat" class="rounded-te-pill rounded-be-pill" color="green-lighten-1">
        <v-card-text class="text-left text-white" style="font-size:x-large;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
          Automatic Speech Recognition
        </v-card-text>
      </v-card>
    </v-row>
    <v-row class="justify-center mt-16">
      <v-avatar image="encrypted-data.png" size="150"/>
    </v-row>
    <v-row class="justify-end">
      <v-card ref="animateRight_3" elevation="10" variant="flat" class="rounded-ts-pill rounded-bs-pill" color="orange-lighten-1">
        <v-card-text class="text-right text-white" style="font-size:x-large;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
          Encrypted Text Messaging
        </v-card-text>
      </v-card>
    </v-row>
  <v-footer class="mt-16" :color="theme ? 'secondaryDarkBtnColor':'primary'">
        <v-container>
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
              <span class="ml-2 mt-n1">
                <a class="text-center grey--text" style="text-decoration: underline; font-size: small">Privacy</a>
              </span>
              <span class="ml-2 mt-n1">
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
  import { useMotion } from '@vueuse/motion';

  const route = useRouter()
  const drawer = ref(false)
  const theme = ref(false)
  const animateRight_1 = ref()
  const animateRight_2 = ref()
  const animateRight_3 = ref()
  const animateLeft_1 = ref()
  const animateLeft_2 = ref()
  const animateLeft_3 = ref()

  const rightmotionInstance_1 = useMotion(animateRight_1,{
    initial:{
      opacity: 0,
      y: -100
    },
    visible:{
      y: 0,
      opacity: 1,
      transition: {
        y: {
          duration: 2000,
        },
        type: 'keyframes',
        ease:'easeIn'
      },
    }
  })
  const rightmotionInstance_2 = useMotion(animateRight_2,{
    initial:{
      opacity: 0,
      y: -100
    },
    visible:{
      y: 0,
      opacity: 1,
      transition: {
        y: {
          duration: 2000,
        },
        type: 'keyframes',
        ease:'easeIn'
      },
    }
  })
  const rightmotionInstance_3 = useMotion(animateRight_3,{
    initial:{
      opacity: 0,
      y: -100
    },
    visible:{
      y: 0,
      opacity: 1,
      transition: {
        y: {
          duration: 2000,
        },
        type: 'keyframes',
        ease:'easeIn'
      },
    }
  })
  const leftmotionInstance_1 = useMotion(animateLeft_1,{
    initial:{
      opacity: 0,
      y: 100
    },
    visible:{
      y: 0,
      opacity: 1,
      transition: {
        y: {
          duration: 2000,
        },
        type: 'keyframes',
        ease:'easeIn'
      },
    }
  })
  const leftmotionInstance_2 = useMotion(animateLeft_2,{
    initial:{
      opacity: 0,
      y: 100
    },
    visible:{
      y: 0,
      opacity: 1,
      transition: {
        y: {
          duration: 2000,
        },
        type: 'keyframes',
        ease:'easeIn'
      },
    }
  })
  const leftmotionInstance_3 = useMotion(animateLeft_3,{
    initial:{
      opacity: 0,
      y: 100
    },
    visible:{
      y: 0,
      opacity: 1,
      transition: {
        y: {
          duration: 2000,
        },
        type: 'keyframes',
        ease:'easeIn'
      },
    }
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

  .underline-link {
    text-decoration: none; /* Remove underline by default */
  }

  .underline-link:hover {
    text-decoration: underline; /* Add underline on hover */
  }
</style>