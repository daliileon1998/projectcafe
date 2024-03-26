<template>
  <div class="center">
    <h1>Cursos</h1>
  </div>
  <div class="container-fluid mt-3 bg-white border rounded p-3">
    <div class="row">
      <!-- Agrega el campo de búsqueda -->
      <div class="col-md-3">
        <input type="text" class="form-control" v-model="search" placeholder="Buscar..." style="border: 1px solid #000000;" />      </div>
      <div class="col-md-7"></div>
       <!-- Botón para agregar un nuevo curso -->
       <div class="col-md-2">
        <div class="d-grid">
          <router-link :to="{ name: 'AddCursos', params: { id:null} }" class="btn btn-success">
            <font-awesome-icon :icon="['fas', 'plus']" size="xl" /> Añadir
          </router-link>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-12">
        <div class="table-responsive">
          <table id="comitesTable" class="table table-striped table-bordered custom-table">
            <!-- Encabezados de la tabla -->
            <thead>
              <tr>
                <th>#</th>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Imagen</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <!-- Cuerpo de la tabla -->
            <tbody>
              <!-- Filas de la tabla, aplicando el filtro de búsqueda -->
              <tr v-for="(curso, index) in filteredCursos" :key="curso._id">
                <td>{{ index + 1 }}</td>
                <td>{{ curso.code }}</td>
                <td>{{ curso.name }}</td>
                <td>{{ curso.description }}</td>
                <td><img v-if="curso.image" :src="'http://localhost:5000/' + curso.image" alt="Imagen de curso" style="max-width: 100px; max-height: 100px;"></td>
                <td>{{ curso.state === '1' ? 'Activo' : 'Inactivo' }}</td>
                <td>
                  <!-- Botones de acción -->
                  <router-link :to="{ name: 'AddCursos', params: { id: curso._id } }" class="btn btn-warning">
                    <font-awesome-icon :icon="['fas', 'pen-to-square']" size="xl"/>
                  </router-link>
                  <button :class="['btn',curso.state === '0' ? 'btn-success' : 'btn-secondary']" @click="editarEstado(curso._id,curso.state)">
                    <font-awesome-icon :icon="curso.estado === '0' ? ['fas', 'toggle-on'] : ['fas', 'toggle-off']" />
                    <span v-if="curso.state === '1'" style="color: white"> Inactivar</span>
                    <span v-else style="color: white"> Activar</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Paginación -->
    <div class="row mt-3">
      <div class="col-md-12">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="#" @click="prevPage">Anterior</a>
            </li>
            <li class="page-item" v-for="page in pages" :key="page" :class="{ active: currentPage === page }">
              <a class="page-link" href="#" @click="changePage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link" href="#" @click="nextPage">Siguiente</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
//import { getCursosFromFirebase, updateEstadoCurso } from '@/firebase';

export default {
  name: 'Cursos',
  setup() {
    const cursos = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = 10;
    const search = ref('');

    // Llama a getCursosFromFirebase cuando el componente se ha montado
    const cargarCursos = async () => {
      try {
        //cursos.value = await getCursosFromFirebase();
        const response = await axios.get('http://localhost:5000/courses');
        cursos.value = response.data.Courses;
        console.log("cursos ------->",cursos);
      } catch (error) {
        console.error('Error al obtener cursos desde Firebase:', error);
      }
    };

    onMounted(cargarCursos);

    // Filtro computado para aplicar búsqueda
    const filteredCursos = computed(() => {
      return cursos.value.filter(curso =>
        curso.name.toLowerCase().includes(search.value.toLowerCase())
      );
    });

    // Métodos para la paginación
    const totalPages = computed(() => Math.ceil(filteredCursos.value.length / itemsPerPage));

    const pages = computed(() => {
      const pagesArray = [];
      for (let i = 1; i <= totalPages.value; i++) {
        pagesArray.push(i);
      }
      return pagesArray;
    });

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const changePage = (page) => {
      currentPage.value = page;
    };

    // Método para cambiar el estado del curso
    const editarEstado = async (id, estado) => {
      // Mostrar mensaje de confirmación antes de editar el estado
      if (window.confirm('¿Estás seguro de que deseas cambiar el estado del curso?')) {
        const newEstado = estado === '0' ? '1' : '0';
        console.log(id);
        let resultado = await axios.patch(`http://localhost:5000/courses/${id}/state`, { state: newEstado });
        //await updateEstadoCurso(id, newEstado);

        console.log("resultado ------->",resultado);
        console.log('Estado del curso actualizado correctamente');
        // Recargar los cursos después de editar el estado
        await cargarCursos();
      }
    };

    return { cursos, filteredCursos, search, currentPage, totalPages, pages, prevPage, nextPage, changePage, editarEstado };
  },
};
</script>

<style scoped>
/* Estilos personalizados para la tabla */
.custom-table {
  width: 100%;
}

.custom-table th {
  background-color: #f8f9fa; /* Color de fondo del encabezado */
}

.custom-table td {
  vertical-align: middle; /* Alineación vertical del contenido de las celdas */
}

.custom-table th,
.custom-table td {
  border: 1px solid #dee2e6; /* Borde de las celdas */
}

.custom-table th,
.custom-table td,
.custom-table button {
  text-align: center; /* Alineación del texto en el centro */
}

.custom-table button {
  padding: 6px 12px; /* Espaciado interno del botón */
  font-size: 14px; /* Tamaño de la fuente del botón */
}
</style>
