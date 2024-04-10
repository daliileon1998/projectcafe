// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import { CKEditor, ClassicEditor } from '@ckeditor/ckeditor5-vue';
// import CKFinderAdapter from '@ckeditor/ckeditor5-adapter-ckfinder'; // Cambio aquí
//import CustomCKFinderUploadAdapter from './CustomCKFinderUploadAdapter';

library.add(fas)
const app = createApp(App)
app.use(router)
app.use(CKEditor, {
    editor: ClassicEditor,
    plugins: ['Image', 'ImageResize', 'ImageToolbar', 'ImageCaption', 'ImageStyle', 'LinkImage'],
    config: {
      toolbar:  [ 'toggleImageCaption', 'imageTextAlternative', 'ckboxImageEdit' ],
      /*upload: {
        adapter: new CustomCKFinderUploadAdapter(CKFinderAdapter, {
          // Configuration options for CKFinderUploadAdapter
          uploadUrl: 'https://your-ckfinder-domain.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',
          // Other configuration options
        })
    }*/
    }
  })

// Registra el componente FontAwesomeIcon para usar en toda la aplicación
app.component('font-awesome-icon', FontAwesomeIcon)// Monta la aplicación en el elemento con el id 'app'
app.mount('#app')
