<template>
  <div class="center">
    <h1>Usuario</h1>
  </div>
  <div class="container-fluid mt-3 bg-white border rounded p-3">
    <div class="row">
      <!-- Agrega el campo de búsqueda -->
      <div class="col-md-3">
        <input type="text" class="form-control" v-model="search" placeholder="Buscar..."
          style="border: 1px solid #000000;" />
      </div>
      <div class="col-md-7"></div>
      <!-- Botón para agregar un nuevo user -->
      <div class="col-md-2">
        <div class="d-grid">
          <router-link :to="{ name: 'AddUser', params: { id: null } }" class="btn btn-success">
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
                <th>Nombre</th>
                <th>Username</th>
                <th>Email</th>
                <th>Telefono</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <!-- Cuerpo de la tabla -->
            <tbody>
              <!-- Filas de la tabla, aplicando el filtro de búsqueda -->
              <tr v-if="paginatedCursos.length > 0" v-for="(user, index) in paginatedCursos" :key="user._id">
                <td>{{ index + 1 }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.phone }}</td>
                <td>{{ user.state === '1' ? 'Activo' : 'Inactivo' }}</td>
                <td>
                  <!-- Botones de acción -->
                  <router-link :to="{ name: 'AddUser', params: { id: user._id } }" class="btn btn-warning">
                    <font-awesome-icon :icon="['fas', 'pen-to-square']" size="xl" />
                  </router-link>
                  <button :class="['btn', user.state === '0' ? 'btn-success' : 'btn-secondary']"
                    @click="editarEstado(user._id, user.state)">
                    <font-awesome-icon :icon="user.estado === '0' ? ['fas', 'toggle-on'] : ['fas', 'toggle-off']" />
                    <span v-if="user.state === '1'" style="color: white"> Inactivar</span>
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
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'Users',
  setup() {
    const users = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = 6;
    const search = ref('');

    const cargarUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        users.value = response.data.Usuarios;
      } catch (error) {
        console.error('Error al obtener users:', error);
      }
    };

    onMounted(cargarUsuarios);

    // Filtro computado para aplicar búsqueda
    const filteredUsers = computed(() => {
      if (Array.isArray(users.value) && users.value.length > 0) {
        return users.value.filter(user =>
          user.name.toLowerCase().includes(search.value.toLowerCase())
        );
      } else {
        return [];
      }
    });

    const paginatedCursos = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return filteredUsers.value.slice(startIndex, endIndex);
    });

    // Métodos para la paginación
    const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage));

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

    // Método para cambiar el estado del user
    const editarEstado = async (id, estado) => {
      // Mostrar mensaje de confirmación antes de editar el estado
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Estás seguro de que deseas cambiar el estado del Usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        const newEstado = estado === '0' ? '1' : '0';
        try {
          await axios.patch(`http://localhost:5000/users/${id}/state`, { state: newEstado });
          await cargarUsuarios();
          Swal.fire('¡Hecho!', 'El estado del Usuario ha sido actualizado correctamente.', 'success');
        } catch (error) {
          console.error('Error al cambiar el estado del Usuario:', error);
          Swal.fire('¡Error!', 'Hubo un error al cambiar el estado del Usuario.', 'error');
        }
      }
    };

    return { users, filteredUsers,paginatedCursos, search, currentPage, totalPages, pages, prevPage, nextPage, changePage, editarEstado };
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
