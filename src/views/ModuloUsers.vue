<template>
  <div class="d-flex" id="wrapper">
    <!-- Page Content -->
    <div id="page-content-wrapper" class="col-md-12">
      <div class="container-fluid">
        <div class="row justify-content-center"> <!-- Alinear el contenido al centro horizontalmente -->
          <div class="col-md-6 text-center"> <!-- Utilizar la mitad del ancho de la página para el texto -->
            <h1 style="font-size:60px;margin-top: 10px;">{{ curso.name }}</h1>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-md-2">
            <nav class="navbar navbar2 navbar-expand-lg navbar-light bg-light mb-3 rounded bordered-column">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-column navbar-nav-custom">
                <!-- Aplicar estilo personalizado -->
                <li class="nav-item">
                  <h3 class="nav-link mb-2"><font-awesome-icon :icon="['fas', 'graduation-cap']" /> <b>Modulos
                      Cursos</b></h3> <!-- Añadir espacio inferior -->
                </li>
                <li class="nav-item bordered-link" v-for="(modulo, index) in modulos" :key="index">
                  <router-link :to="{ name: 'ModuloUsers', params: { id: modulo._id } }" class="nav-link"
                    :class="{ 'active-nav-link': modulo._id === moduloSeleccionado._id }">
                    <font-awesome-icon :icon="['fas', 'folder']" /> {{ modulo.name }}
                  </router-link>
                </li>
                <li class="nav-item bordered-link">
                  <router-link :to="{ name: 'DocumentsModules', params: { id: curso._id } }" class="nav-link">
                    <font-awesome-icon :icon="['fas', 'folder']" /> Contenidos Adicionales
                  </router-link>
                </li>
              </ul>
            </nav>
          </div>
          <div class="col-md-10">
            <div class="d-flex flex-column justify-content-center align-items-left bordered-column"
              style="height: 100%;margin-right: 20px;">
              <h3 style="margin-left: 20px;margin-top: 20px;">{{ moduloSeleccionado.name }}</h3>
              <img :src="'http://localhost:5000/' + moduloSeleccionado.image" alt="Imagen"
                style="width: 800px; height: 161px; margin: 0 auto; display: block;" class="bordered-image text-center">
              <div v-for="(leccion, index) in lecciones" :key="index" style="margin-left: 20px;">
                <br><br>
                <h3 style="text-align: left;" v-if="leccion.state==1">☕️ <u><i>{{ leccion.name }}</i></u></h3>
                <div v-html="procesarContenido(leccion.content)" v-if="leccion.state==1"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <router-view></router-view>
    </div>
    <!-- /#page-content-wrapper -->
  </div>
  <br>
  <!-- /#wrapper -->
</template>

<script>
import axios from 'axios';
export default {
  name: 'ModuloUsers',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      lecciones: [],
      moduloSeleccionado: [],
      modulos: [],
      curso: {},
    };
  },
  watch: {
    '$route.params.id': {
      immediate: true, // Para que se ejecute el watcher al inicio
      handler(newId, oldId) {
        // Si el nuevo ID es diferente al anterior, cargar las lecciones
        if (newId !== oldId) {
          this.cargarLecciones(newId);
        }
      }
    }
  },
  async mounted() {
    await this.cargarLecciones(this.id);
    //await this.cargarModulos(this.idcurso);
    // También puedes cargar información sobre el curso si lo necesitas utilizando this.idcurso
  },
  methods: {
    async cargarLecciones(id) {
      try {
        const response = await axios.get(`http://localhost:5000/modules/coursesmodules/${id}`);
        this.lecciones = response.data.leccionesModulo;
        this.moduloSeleccionado = response.data.modulo;
        this.modulos = response.data.modulosCurso;
        this.curso = response.data.curso;
        console.log("lecciones ------->", response.data);
      } catch (error) {
        console.error('Error al cargar las lecciones:', error);
      }
    },
    procesarContenido(html) {
      // Replace <oembed> tags with <iframe> tags for YouTube videos
      html = html.replace(/<oembed url="([^"]+)"><\/oembed>/g, (match, url) => {
        const videoId = this.extractYoutubeId(url);
        const iframe = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style="margin: 0 auto; display: block;" class="text-center"></iframe>`;
        return iframe;
      });

      // Replace <img> tags with <img> tags for images
      html = html.replace(/<img .*?src="([^"]+)" .*?>/g, '<img src="$1" style="width: 600px; height: 250px; margin: 0 auto; display: block;" class="bordered-image text-center">');

      // Replace Google Forms links with embedded forms
      html = html.replace(/<p>(https:\/\/docs\.google\.com\/forms\/[^\s<]+)<\/p>/g, '<iframe src="$1" width="70%" height="400"  style="margin: 0 auto; display: block;" frameborder="0" marginheight="0" marginwidth="0">Cargando...</iframe>');
      html = html.replace(/<p><br>(https:\/\/docs\.google\.com\/forms\/[^\s<]+)<\/p>/g, '<iframe src="$1" width="70%" height="400" style="margin: 0 auto; display: block;" frameborder="0" marginheight="0" marginwidth="0">Cargando...</iframe>');

      return html;
    },
    extractYoutubeId(url) {
      const regExp = /^.*(v=|v%3D|&v=|&v%3D|youtu.be\/)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    }
  }
};

</script>

<style>
.gold {
  background-color: #efb810 !important;
  /* Código hexadecimal para el color dorado */
  border-color: #FFD700 !important;
  /* Puedes ajustar el color del borde si es necesario */
}

.modulo-button {
  font-size: 20px !important;
}

.bordered-image {
  border: 1px solid #000;
  /* Definir el borde de la imagen */
}

.bordered-column {
  border: 1px solid #D0D3D4;
}

.navbar-nav-custom {
  margin-left: 20px;
  /* Ajusta según sea necesario */
  margin-right: 20px;
  /* Ajusta según sea necesario */
}

.bordered-link {
  border-top: 1px solid #D0D3D4;
  padding: 8px 15px;
  border-radius: 0;
}

.navbar2 {
  border: 1px solid #D0D3D4;
  border-radius: 5px;
  padding: 10px;
}

.active-nav-link {
  background-color: #007bff;
  /* Color de fondo cuando el enlace está activo */
  color: #fff;
  cursor: pointer;
  color: inherit;
  text-decoration: inherit;
  /* Color del texto cuando el enlace está activo */
}
</style>
