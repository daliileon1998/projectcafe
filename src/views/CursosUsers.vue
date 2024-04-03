<template>
  <div class="d-flex" id="wrapper">
    <!-- Page Content -->
    <div id="page-content-wrapper" class="col-md-12">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-md-6 text-center">
            <h1 class="text-center" style="font-size:60px;margin-top: 10px;">{{ cursoNombre }}</h1>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-md-2">
            <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3 rounded bordered-column">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-column navbar-nav-custom">
                <!-- Aplicar estilo personalizado -->
                <li class="nav-item">
                  <h3 class="nav-link mb-2"><font-awesome-icon :icon="['fas', 'graduation-cap']" /> <b>Modulos
                      Cursos</b></h3> <!-- Añadir espacio inferior -->
                </li>
                <li class="nav-item bordered-link" v-for="(modulo, index) in modulos" :key="index">
                  <router-link :to="{ name: 'ModuloUsers', params: { id: modulo._id } }" class="nav-link">
                    <font-awesome-icon :icon="['fas', 'folder']" /> {{ modulo.name
                    }}</router-link>
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
            <div class="d-flex flex-column justify-content-center align-items-left bordered-column"
              style="height: 100%;margin-right: 20px;">
              <br><br>
              <img :src="'http://localhost:5000/' + cursoimage" alt="Imagen"
                style="width:900px; height: 300px;margin: 0 auto; display: block;" class="bordered-image">
              <div style="text-align: center; padding: 20px;">
                <p>{{ cursoDescripcion }}</p>
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
  name: 'Curso',
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      modulos: [], // Almacenar los módulos del curso
      cursoNombre: '', // Variable para almacenar el nombre del curso
      cursoDescripcion: '', // Variable para almacenar la descripción del curso
      image: '',
      selectedId: '', // Variable para almacenar el ID del módulo seleccionado
      selectedIdcurso: '' // Variable para almacenar el ID del curso seleccionado
    };
  },
  async mounted() {
    if (this.id) {
      await this.cargarCurso(this.id); // Cargar los datos del curso al montar el componente
      await this.cargarModulos(this.id); // Cargar los módulos al montar el componente
    }
  },
  methods: {
    selectModule(id, idcurso) {
      this.selectedId = id;
      this.selectedIdcurso = idcurso;
    },
    async cargarCurso(id) {
      try {
        const response = await axios.get(`http://localhost:5000/courses/${id}`);
        this.cursoNombre = response.data.name; // Asignar el nombre del curso a la variable cursoNombre
        this.cursoDescripcion = response.data.description; // Asignar la descripción del curso a la variable cursoDescripcion
        this.cursoimage = response.data.image;
      } catch (error) {
        console.error('Error al cargar el curso:', error);
      }
    },
    async cargarModulos(id) {
      try {
        const response = await axios.get(`http://localhost:5000/modules/courses/${id}`); // Obtener los módulos del curso
        this.modulos = response.data; // Asignar los módulos obtenidos a la variable modulos
      } catch (error) {
        console.error('Error al cargar los módulos:', error);
      }
    }
  }
};
</script>

<style scoped>
.gold {
  background-color: #efb810 !important;
  border-color: #FFD700 !important;
}

.modulo-button {
  font-size: 20px !important;
}

.bordered-image {
  border: 1px solid #000;
  /* Definir el borde de la imagen */
  margin-left: 100px;
}
</style>
