import { createApp } from 'vue';
import VueNavigationBar from 'vue-navigation-bar';
import 'vue-navigation-bar/dist/vue-navigation-bar.css';

const app = createApp(App);

app.component('vue-navigation-bar', VueNavigationBar);