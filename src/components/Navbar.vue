<template>
  <nav class="navbar navbar-expand-lg navbar-light"> <!-- Cambia bg-light a bg-primary -->
    <div class="container">
      <router-link class="navbar-brand" to="/home" style="color: #F5F5DC;">
        <img src="../../public/icono.ico" alt="Logo" width="50" height="50">&nbsp;&nbsp;Project Café</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/home" style="color: #F5F5DC;">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about" style="color: #F5F5DC;">Nosotros</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact" style="color: #F5F5DC;">Contacto</router-link>
          </li>
        </ul>
        <router-link to="/login" class="btn btn-outline-primary ms-auto custom-btn">Iniciar sesión</router-link>
      </div>
    </div>
  </nav>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'Navbar',
  
}
</script>

<style scoped>
/* Estilos específicos del componente Navbar */
.navbar {
  background-color: #a46c44; /* Cambia el color de fondo a marrón */
  color: #F5F5DC;
}

.custom-btn {
  background-color: #F5F5DC; /* Define el color de fondo del botón */
  color: black;
  border-color: gold;
}

.custom-btn:hover {
  background-color: gold; /* Cambia el color de fondo al pasar el mouse */
  border-color: gold; /* Cambia el color del borde al pasar el mouse */
  color: #fff; /* Cambia el color del texto al pasar el mouse */
}
</style>
