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
                  <router-link :to="{ name: 'ModuloUsers', params: { id: modulo._id } }" class="nav-link">
                    <font-awesome-icon :icon="['fas', 'folder']" /> {{ modulo.name }}
                  </router-link>
                </li>
                <li class="nav-item bordered-link">
                  <router-link :to="{ name: 'DocumentsModules', params: { id: id } }" class="nav-link">
                    <font-awesome-icon :icon="['fas', 'folder']" /> Contenidos Adicionales
                  </router-link>
                </li>
              </ul>
            </nav>
          </div>
          <div class="col-md-10">
            <div class="d-flex flex-column align-items-left bordered-column" style="height: 100%;margin-right: 20px;">
              <h3 style="margin-left: 20px;margin-top: 20px;">Contenidos Adicionales</h3>
              <div v-if="modulos.length === 0" style="margin-left: 20px;">
                <p>No hay documentos disponibles.</p>
              </div>
              <div v-else>
                <div v-for="(modulo, index) in modulos" :key="index" style="margin-left: 20px;">
                  <br>
                  <h3 style="text-align: left;">☕️ <u><i>{{ modulo.name }}</i></u></h3>
                  <ul v-if="modulo.documents && modulo.documents.length > 0" class="list-unstyled custom-list">
                    <li v-for="(document, index2) in modulo.documents" :key="index2">
                      <font-awesome-icon :icon="['fas', 'file']" /> &nbsp;
                      <a :href="'http://localhost:5000/' + document.route" target="_blank">
                        {{ document.name }}
                      </a>
                    </li>
                  </ul>
                  <p class="custom-list" v-else>No hay documentos disponibles para este módulo.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
  <br>
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
      modulos: [],
      curso: {},
    };
  },
  async mounted() {
    await this.cargarDocumentos(this.id);
    // También puedes cargar información sobre el curso si lo necesitas utilizando this.idcurso
  },
  methods: {
    async cargarDocumentos(id) {
      try {
        const response = await axios.get(`http://localhost:5000/courses/documents/${id}`);
        this.curso = response.data.curso;
        this.modulos = response.data.modulosCurso;
        console.log("lecciones ------->", response.data);
      } catch (error) {
        console.error('Error al cargar las lecciones:', error);
      }
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

.custom-list {
  padding-left: 0; /* Eliminar el espacio izquierdo en la lista */
  margin-left: 50px;
}
</style>
