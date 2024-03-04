<template>
  <div class="d-flex" id="wrapper">

    <!-- Sidebar -->
    <div class="bg-light border-right" id="sidebar-wrapper">
      <div class="sidebar-heading"><router-link class="navbar-brand mb-3" to="/">
          <img src="../../public/icono.ico" alt="Logo" width="50" height="50">&nbsp;&nbsp;Project Café
        </router-link> </div>
      <div class="list-group list-group-flush">
        <li class="nav-item list-group-item list-group-item-action bg-light">
            <router-link class="nav-link" to="/admin">
              <font-awesome-icon :icon="['fas', 'house']" size="xl" />
              <span class="ms-2 d-none d-md-inline">Inicio</span>
            </router-link>
          </li>
          <li class="nav-item list-group-item list-group-item-action bg-light">
            <router-link class="nav-link" to="/cursos">
              <font-awesome-icon :icon="['fas', 'certificate']" size="xl" />
              <span class="ms-2 d-none d-md-inline">Cursos</span>
            </router-link>
          </li>
          <li class="nav-item list-group-item list-group-item-action bg-light">
            <router-link class="nav-link" to="/modulo">
              <font-awesome-icon :icon="['fas', 'book']" size="xl" />
              <span class="ms-2 d-none d-md-inline">Módulo</span>
            </router-link>
          </li>
          <li class="nav-item list-group-item list-group-item-action bg-light">
            <a class="nav-link" href="#" @click="confirmLogout">
              <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" size="xl" />
              <span class="ms-2 d-none d-md-inline">Salir</span>
            </a>
          </li>
      </div>
    </div>
    <!-- /#sidebar-wrapper -->

    <!-- Page Content -->
    <div id="page-content-wrapper">

      <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <button class="btn btn-primary" id="menu-toggle"><font-awesome-icon :icon="['fas', 'bars']" /></button>
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
import { logout } from '@/firebase'; // Importa la función para cerrar sesión desde tu archivo firebase.js
import { useRouter } from 'vue-router'; // Importar el enrutador de Vue Router

export default {
  setup() {
    const router = useRouter(); // Obtiene el enrutador
    const confirmLogout = (event) => {
      event.preventDefault(); // Prevenir el comportamiento predeterminado del evento de clic

      if (confirm('¿Estás seguro de cerrar sesión?')) {
        logout(); // Llama a la función para cerrar sesión
        router.push('/home'); // Redirige al usuario a la página de inicio
        console.log('Sesión cerrada');
      }
    };

    return {
      confirmLogout // Retorna la función confirmLogout
    };
  },
  mounted() {
    document.getElementById('menu-toggle').addEventListener('click', this.toggleSidebar);
  },
  methods: {
    toggleSidebar() {
      document.getElementById('wrapper').classList.toggle('toggled');
    }
  }
}
</script>

<style>
/* Estilos personalizados para el sidebar */
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
  font-size: 1.2rem;
}

#sidebar-wrapper .list-group {
  width: 15rem;
}

#sidebar-wrapper .list-group-item {
  margin-bottom: 20px; /* Ajusta el valor según tu preferencia */
}

#page-content-wrapper {
  min-width: 100vw;
}

#wrapper.toggled #sidebar-wrapper {
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

  #wrapper.toggled #sidebar-wrapper {
    margin-left: -15rem;
  }
}

.bg-light {
  background-color: lightyellow !important;
}

</style>
