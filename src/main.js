import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Modal from 'vue3-modal';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './firebase.js'

library.add(fas)
const app = createApp(App)
app.use(router)

// Registra el componente FontAwesomeIcon para usar en toda la aplicación
app.component('font-awesome-icon', FontAwesomeIcon)

// Monta la aplicación en el elemento con el id 'app'
app.mount('#app')


