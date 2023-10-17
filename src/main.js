import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { initializeApp } from 'firebase/app'

import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-dark-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'  



const firebaseConfig = {
    apiKey: "AIzaSyC0Lxu9uQZkRovxhw5MLRuGXGgkiN7xDu8",
    authDomain: "diplomatima-2ecca.firebaseapp.com",
    projectId: "diplomatima-2ecca",
    storageBucket: "diplomatima-2ecca.appspot.com",
    messagingSenderId: "416229570140",
    appId: "1:416229570140:web:29c2571779671f0ffc1899"
  };

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(router)
app.use(PrimeVue);


app.mount('#app')
