import { createApp } from 'vue';
import App from './App.vue';
import AnimateOnScroll from 'primevue/animateonscroll';
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const app = createApp(App);

// Registra la directiva
app.directive('animateonscroll', AnimateOnScroll);
app.use(PrimeVue)
app.mount('#app');
