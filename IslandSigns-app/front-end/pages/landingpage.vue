<template>




  <v-app>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <v-main>
      <v-container fluid class="landing-page">
        <header>
          <v-app-bar app flat color="#e2dfdf">
            <img src="~/assets/IslandSignslogo.png" alt="Island Signs Logo" max-width="60px" class="hdimg-logo">
      
            <h4>IslandSigns - Jamaican Sign Language Translator</h4>
            <v-spacer></v-spacer>
            <v-btn text to="/">Home</v-btn>
            <v-btn text to="/about">About</v-btn>
            <v-btn text to="/contact">Contact</v-btn>
          </v-app-bar>
        </header>

        <main>
          <section class="head">
            <v-container fluid class="max-w-1000 mx-auto">
              <v-row class="head-content">
                
                <h1>IslandSigns - Jamaican Sign Language Translator</h1>
              </v-row>
              <br>
              <p>Translate Jamaican Sign Language into text and speech to text.</p>
            </v-container>
          </section>

          <section class="type-options">
            <v-container fluid>
              <v-row justify="space-around" wrap>
                <v-col cols="12" md="6">
                  <div class="language-option">
                    <h2>For those who sign</h2>
                    <br>
                    <img src="~/assets/sign.png" alt="Sign Language Option" width="300px">
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="language-option">
                    <h2>For those who speak</h2>
                    <br>
                    <img src="~/assets/speak.png" alt="Speak Language Option" width="300px">
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </section>

          <section class="button-options" justify-content="center">
           
            <v-container fluid class="con-btn">
                <div class="login-btn">
                  <v-btn block color="green" @click="handleLogin">Login</v-btn>
                </div>
                <div class="register-btn">
                  <router-link :to="{ path: '/register' }"><v-btn block color="green">Register</v-btn></router-link>
                </div>
              
            </v-container>
          </section>

         <section class="how-to" justify-content="center">
            <v-container fluid class="how-one">
              <h2>How to Use</h2>
              <ul>
                <li>Start a Session</li>
                <li>Begin your conversation and our app will do the rest.</li>
              </ul>
            </v-container>
          </section>

          <section class="about" justify-content="center">
            <v-container fluid class="about-one" >
              <h2>About</h2>
              <p>
                IslandSigns serves as a pivotal communication solution between the deaf or hard-of-hearing community and hearing individuals when making banking transactions in Jamaica.
              </p>
              <br>
              <p>
                We train our custom AI model on a variety of banking scenarios to capture JSL in real-time. Allowing for seamless communication and creating an inclusive space for deaf Jamaicans.
              </p>
            </v-container>
          </section>

        </main>


        <footer>
          <v-container fluid class="pa-0">
            <v-row justify="center">
              <v-col cols="12" class="text-center text-caption grey--text">&copy; 2024 ISLANDSIGNS</v-col>
              <v-col cols="12" class="mt-4">
                <v-row justify="center">
                  <img src="~/assets/insta.png" alt="Insta Logo" width="50px">
                  <img src="~/assets/twit.png" alt="Twitter Logo" width="50px">
                  <img src="~/assets/fb.png" alt="Facebook Logo" width="50px">
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </footer>
      </v-container>
    </v-main>
  </v-app>
</template>
  
  <script>
  import { ref } from 'vue';
  

  export default {
    setup() {
      // Handle login button click
      const handleLogin = () => {
        // Implement your login logic here

        console.log('Login clicked');
      };

      // Handle register button click
      const handleRegister = () => {
        // Implement your register logic here
        router.push({ path: 'register' })
        console.log('Register clicked');
      };

      return {
        handleLogin,
        handleRegister
      };
    }
  };
</script>

  
  <style scoped>
  /* General styles */
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  /* Header styles */
  header {
    /*background-color: #e2dfdf;
    padding: 1rem;*/
  }

  .hdimg-logo{
    width: 75px;
  }
  
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

  .head-content img {
    width: 60px;
    height: auto;
  }
  
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
    padding: 4rem 0;
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

  .language-option img {
    width: 300px;
    height: 250px;
  }

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



  
  /* Footer styles */
  footer {
    background-color: #7c7c7c;
    color: #fff;
    padding: 1rem;
    text-align: center;
  }

  .social-media{
    display: flex;
    justify-content: center;
    align-items: center;
  }


  footer img{
    width: 50px;
    height: auto;

  }
  </style>