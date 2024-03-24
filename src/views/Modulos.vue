<template>
  <div class="center">
    <h1>Modulos</h1>
  </div>
  <div class="container-fluid mt-3 bg-white border rounded p-3">
    <div class="row">
      <!-- Agrega el campo de búsqueda -->
      <div class="col-md-3">
        <input type="text" class="form-control" v-model="search" placeholder="Buscar..."
          style="border: 1px solid #000000;" />
      </div>
      <div class="col-md-7"></div>
      <!-- Botón para agregar un nuevo Modulo -->
      <div class="col-md-2">
        <div class="d-grid">
          <router-link :to="{ name: 'AddModulos', params: { id: null } }" class="btn btn-success">
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
                <th>Curso</th>
                <th>Imagen</th>
                <th>Lecciones</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <!-- Cuerpo de la tabla -->
            <tbody>
              <!-- Filas de la tabla, aplicando el filtro de búsqueda -->
              <tr v-if="filteredModulos.length > 0" v-for="(modulo, index) in filteredModulos" :key="modulo._id">
                <td>{{ index + 1 }}</td>
                <td>{{ modulo.code }}</td>
                <td>{{ modulo.name }}</td>
                <td>{{ modulo.course.name }}</td>
                <td><img v-if="modulo.image" :src="'http://localhost:5000/' + modulo.image" alt="Imagen de curso"
                    style="max-width: 100px; max-height: 100px;"></td>
                <td>
                <td>
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                    @click="openModal(modulo)">Abrir modal</button>
                </td>
                </td>
                <td>{{ modulo.state === '1' ? 'Activo' : 'Inactivo' }}</td>
                <td>
                  <!-- Botones de acción -->
                  <router-link :to="{ name: 'AddModulos', params: { id: modulo._id } }" class="btn btn-warning">
                    <font-awesome-icon :icon="['fas', 'pen-to-square']" size="xl" />
                  </router-link>
                  <button :class="['btn', modulo.state === '0' ? 'btn-success' : 'btn-danger']"
                    @click="editarEstado(modulo.id, modulo.state)">
                    <font-awesome-icon :icon="modulo.state === '0' ? ['fas', 'toggle-on'] : ['fas', 'toggle-off']" />
                    <span v-if="modulo.state === '1'" style="color: white"> Inactivar</span>
                    <span v-else style="color: white"> Activar</span>
                  </button>
                </td>
              </tr>
              <tr v-else>
                <td colspan="9">No hay datos almacenados en el sistema</td>
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
    <div ref="exampleModal" class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"><font-awesome-icon :icon="['fas', 'chalkboard']" /> Modulo</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h3>Informacion del Modulo</h3>
            <br>
            <div class="container-fluid">
              <!-- Primera fila: Código y Nombre -->
              <div class="row mb-3">
                <div class="col-md-6">
                  <div class="row">
                    <div class="col-md-1">
                      <font-awesome-icon :icon="['fas', 'code']" style="font-size: 25px;" class="text-info"/>
                    </div>
                    <div class="col-md-10">
                      <strong>Código:</strong> {{ module.code }}
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="row">
                    <div class="col-md-1">
                      <font-awesome-icon :icon="['fas', 'signature']" style="font-size: 25px;" class="text-warning"/>
                    </div>
                    <div class="col-md-10">
                      <strong>Nombre:</strong> {{ module.name }}
                    </div>
                  </div>
                </div>
              </div>
              <!-- Segunda fila: Imagen y Estado -->
              <div class="row mb-3">
                <div class="col-md-6">
                  <div class="row">
                    <div class="col-md-1">
                      <font-awesome-icon :icon="['fas', 'image']"  style="font-size: 25px;" class="text-secondary"/>
                    </div>
                    <div class="col-md-10">
                      <strong>Imagen: </strong> <a target="_blank" :href="'http://localhost:5000/' + module.image">
                        Ver</a>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="row">
                    <div class="col-md-1">
                      <font-awesome-icon :icon="['fas', 'toggle-on']" style="font-size: 25px;" :class="module.state === '1' ? 'text-success' : 'text-danger'"/>
                    </div>
                    <div class="col-md-10">
                      <strong>Estado:</strong> {{ module.state === '1' ? 'Activo' : 'Inactivo' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br>
            <h3>Lecciones</h3>
            <br>
            <div class="table-responsive">
              <table class="table table-bordered table-hover">
                <thead class="table-primary">
                  <tr>
                    <th scope="col">Código</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(lesson, index) in lessons" :key="index">
                    <td>{{ lesson.code }}</td>
                    <td>{{ lesson.name }}</td>
                    <td> <span v-if="lesson.state === '1'">Activo</span>
                         <span v-else="lesson.state === '0'">Inactivo</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
//import { getModulosFromFirebase, updateEstadoModulo } from '@/firebase';

export default {
  name: 'Modulos',
  setup() {
    const modulos = ref([]);
    const lessons = ref([]);
    const module = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = 10;
    const search = ref('');

    // Llama a getModulos FromFirebase cuando el componente se ha montado
    const cargarModulos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/modules');
        modulos.value = await response.data.Modules;
        console.log("modulos -------->", modulos);
      } catch (error) {
        console.error('Error al obtener modulos desde Firebase:', error);
      }
    };

    onMounted(cargarModulos);

    // Filtro computado para aplicar búsqueda
    const filteredModulos = computed(() => {
      return modulos.value.filter(modulo =>
        modulo.name.toLowerCase().includes(search.value.toLowerCase())
      );
    });

    // Métodos para la paginación
    const totalPages = computed(() => Math.ceil(filteredModulos.value.length / itemsPerPage));

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

    const openModal = (modulo) => {
      lessons.value = JSON.parse(modulo.lessons); // Asigna las lecciones del módulo al ref lecciones
      module.value = modulo;
      console.log("Lecciones -------->", lessons, module);
    };

    // Método para cambiar el state del modulo
    const editarEstado = async (id, state) => {
      // Mostrar mensaje de confirmación antes de editar el state
      if (window.confirm('¿Estás seguro de que deseas cambiar el state del modulo?')) {
        const newEstado = state === '0' ? '1' : '0';
        //await updateEstadoModulo(id, newEstado);
        console.log('Estado del modulo actualizado correctamente');
        // Recargar los modulo después de editar el state
        // await cargarModulos();
      }
    };

    return { modulos, filteredModulos, search, currentPage, totalPages, pages, prevPage, nextPage, changePage, editarEstado, openModal, lessons, module };
  },
};
</script>

<style scoped>
/* Estilos personalizados para la tabla */
.custom-table {
  width: 100%;
}

.custom-table th {
  background-color: #f8f9fa;
  /* Color de fondo del encabezado */
}

.custom-table td {
  vertical-align: middle;
  /* Alineación vertical del contenido de las celdas */
}

.custom-table th,
.custom-table td {
  border: 1px solid #dee2e6;
  /* Borde de las celdas */
}

.custom-table th,
.custom-table td,
.custom-table button {
  text-align: center;
  /* Alineación del texto en el centro */
}

.custom-table button {
  padding: 6px 12px;
  /* Espaciado interno del botón */
  font-size: 14px;
  /* Tamaño de la fuente del botón */
}
</style>
