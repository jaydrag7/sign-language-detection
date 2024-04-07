import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from '~/App.vue'
import MessagePage from '~/components/Message.vue'
import IndexPage from '~/components/index.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/startmessage', component: MessagePage},
        { path: '/index', component: IndexPage },
    ]
});

const app = createApp(App)

app.use(router);

app.mount('#app')