<template>
  <div class="d-flex" id="wrapper">

    <!-- Sidebar -->
    <div class="bg-light border-right" id="sidebar-wrapper">
      <div class="sidebar-heading"><router-link class="navbar-brand mb-3" to="/admin">
          <img src="../../public/icono.ico" alt="Logo" width="50" height="50">&nbsp;&nbsp;Project Café
        </router-link> </div>
      <div class="list-group list-group-flush">
        <li class="nav-item list-group-item list-group-item-action bg-light">
          <router-link class="nav-link" to="/admin">
            <font-awesome-icon :icon="['fas', 'house']" size="xl" />
            <span class="ms-2 d-md-inline">Inicio</span>
          </router-link>
        </li>
        <li class="nav-item list-group-item list-group-item-action bg-light">
            <router-link class="nav-link" to="/cursos">
              <font-awesome-icon :icon="['fas', 'certificate']" size="xl" />
              <span class="ms-2 d-md-inline">Cursos</span>
            </router-link>
          </li>
          <li class="nav-item list-group-item list-group-item-action bg-light">
            <router-link class="nav-link" to="/modulos">
              <font-awesome-icon :icon="['fas', 'book']" size="xl" />
              <span class="ms-2 d-md-inline">Módulo</span>
            </router-link>
          </li>
          <li class="nav-item list-group-item list-group-item-action bg-light">
            <router-link class="nav-link" to="/users">
              <font-awesome-icon :icon="['fas', 'user']" size="xl" />
              <span class="ms-2 d-md-inline">Usuario</span>
            </router-link>
          </li>
          <li class="nav-item list-group-item list-group-item-action bg-light">
            <a class="nav-link" href="#" @click="confirmLogout">
              <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" size="xl" />
              <span class="ms-2 d-md-inline">Salir</span>
            </a>
          </li>
      </div>
    </div>
    <!-- /#sidebar-wrapper -->

    <!-- Page Content -->
    <div id="page-content-wrapper">

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button class="btn btn-primary" id="menu-toggle" @click="toggleSidebar">
          <font-awesome-icon :icon="['fas', 'bars']" />
        </button>
      </nav>
      
      <div class="container-fluid">
        <router-view></router-view>
      </div>
    </div>
    <!-- /#page-content-wrapper -->

  </div>
  <!-- /#wrapper -->
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'; 

export default {
  setup() {
    const router = useRouter(); 
    const isSidebarOpen = ref(false); 
    const sessionClosed = ref(false);

    // Función para cerrar sesión
    const logout = () => {
      // Eliminar el token del almacenamiento local
      localStorage.removeItem('token');
    };

    // Confirmar el cierre de sesión y redirigir
    const confirmLogout = (event) => {
      event.preventDefault(); 
      Swal.fire({
        title: '¿Estás seguro de cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          logout(); // Cerrar sesión
          sessionClosed.value = true;
          location.reload();
        }
      });
    };

    // Función para alternar la visibilidad de la barra lateral
    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
      const wrapper = document.getElementById('wrapper');
      if (isSidebarOpen.value) {
        wrapper.classList.add('toggled');
      } else {
        wrapper.classList.remove('toggled');
      }
    };

    if (sessionClosed.value) { // Si se cerró la sesión, ejecutar la función de carga
      window.addEventListener('load', () => {
        // Redirigir al usuario al view de admin
        router.push('/home');
        // Mostrar mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: 'Sesión cerrada exitosamente',
          timer: 1500
        });
      });
    }

    return {
      isSidebarOpen,
      confirmLogout,
      toggleSidebar
    };
  }
}
</script>


<style>
body {
  overflow-x: hidden;
}

#sidebar-wrapper {
  min-height: 100vh;
  margin-left: -15rem;
  transition: margin .25s ease-out; 
}

#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.5rem; /* Aumentar el tamaño del texto del encabezado */
}

#sidebar-wrapper .list-group {
  width: 15rem;
}

#sidebar-wrapper .list-group-item {
  margin-bottom: 20px; 
  font-size: 1.1rem; /* Aumentar el tamaño del texto de los enlaces */
}

#page-content-wrapper {
  min-width: 100vw;
}

.toggled #sidebar-wrapper {
  margin-left: 0; 
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }

  .toggled #sidebar-wrapper {
    margin-left: -15rem; 
  }
}

.bg-light {
  background-color: lightyellow !important;
}

#menu-toggle {
  margin-top: 1rem; /* Ajustar el espacio entre el botón de menú y la barra de navegación */
}
</style>
