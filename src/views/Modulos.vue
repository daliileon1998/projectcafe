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
                <th>Descripcion</th>
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
              <tr v-for="(modulo, index) in filteredModulos" :key="modulo.id">
                <td>{{ index + 1 }}</td>
                <td>{{ modulo.code }}</td>
                <td>{{ modulo.name }}</td>
                <td>{{ modulo.description }}</td>
                <td>{{ modulo.course }}</td>
                <td></td>
                <td>
                <td>
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                    @click="openModal(modulo)">Abrir modal</button>
                </td>
                </td>
                <td>{{ modulo.estado === '1' ? 'Activo' : 'Inactivo' }}</td>
                <td>
                  <!-- Botones de acción -->
                  <router-link :to="{ name: 'AddModulos', params: { id: modulo.id } }" class="btn btn-warning">
                    <font-awesome-icon :icon="['fas', 'pen-to-square']" size="xl" />
                  </router-link>
                  <button :class="['btn', modulo.estado === '0' ? 'btn-success' : 'btn-danger']"
                    @click="editarEstado(modulo.id, modulo.estado)">
                    <font-awesome-icon :icon="modulo.estado === '0' ? ['fas', 'toggle-on'] : ['fas', 'toggle-off']" />
                    <span v-if="modulo.estado === '1'" style="color: white"> Inactivar</span>
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
    <div ref="exampleModal" class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Título del modal</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Este es el contenido del modal en español.</p>
            <ul>
              <li v-for="(lesson, index) in lessons" :key="index">{{ lesson.name }}</li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary">Guardar cambios</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { getModulosFromFirebase, updateEstadoModulo } from '@/firebase';

export default {
  name: 'Modulos',
  setup() {
    const modulos = ref([]);
    const lessons = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = 10;
    const search = ref('');

    // Llama a getModulos FromFirebase cuando el componente se ha montado
    const cargarModulos = async () => {
      try {
        modulos.value = await getModulosFromFirebase();
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
      lessons.value = modulo.lessons; // Asigna las lecciones del módulo al ref lecciones
      console.log("Lecciones -------->", lessons);
    };

    // Método para cambiar el estado del modulo
    const editarEstado = async (id, estado) => {
      // Mostrar mensaje de confirmación antes de editar el estado
      if (window.confirm('¿Estás seguro de que deseas cambiar el estado del modulo?')) {
        const newEstado = estado === '0' ? '1' : '0';
        await updateEstadoModulo(id, newEstado);
        console.log('Estado del modulo actualizado correctamente');
        // Recargar los modulo después de editar el estado
        await cargarModulos();
      }
    };

    return { modulos, filteredModulos, search, currentPage, totalPages, pages, prevPage, nextPage, changePage, editarEstado, openModal,lessons };
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
