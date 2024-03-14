import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Modal from 'vue3-modal';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './firebase.js'
import VueQuillEditor from 'vue3-quill-editor';
import 'quill/dist/quill.snow.css'

library.add(fas)
const app = createApp(App)
app.use(router)
app.use(VueQuillEditor)

// Registra el componente FontAwesomeIcon para usar en toda la aplicación
app.component('font-awesome-icon', FontAwesomeIcon)

// Monta la aplicación en el elemento con el id 'app'
app.mount('#app')


