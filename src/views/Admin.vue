<template>
    <div class="welcome-container">
      <h1 class="welcome-title">¡Bienvenido, Usuario!</h1>
      <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <router-link :to="{ name: 'Cursos' }" class="carousel-item active">
            <img src="../../image_1.jpeg" class="d-block w-100" alt="Imagen 1" title="Añadir Cursos">
          </router-link>
          <router-link :to="{ name: 'Cursos' }" class="carousel-item">
            <img src="../../image_2.jpeg" class="d-block w-100" alt="Imagen 2" title="Añadir Modulos">
          </router-link>
          <router-link :to="{ name: 'Cursos' }" class="carousel-item">
            <img src="../../image_3.jpeg" class="d-block w-100" alt="Imagen 3" title="Añadir Usuarios">
          </router-link>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Siguiente</span>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Carousel'
  }
  </script>
  
  <style scoped>
  .welcome-container {
    text-align: center;
    margin-top: 20px;
  }
  
  .welcome-title {
    font-size: 2.5rem;
    margin-bottom: 30px;
    color: #333;
  }
  
  .carousel-inner {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    max-width: 1300px; /* Modifica este valor según tu preferencia */
    max-height: 450px; /* Modifica este valor según tu preferencia */
    margin: auto; /* Centra el carrusel horizontalmente */
  }
  
  .carousel-item img {
    border-radius: 10px;
    height: auto; /* Ajusta la altura de las imágenes automáticamente */
    width: 100%; /* Ajusta el ancho de las imágenes al 100% del contenedor */
  }
  
  .carousel-control-prev,
  .carousel-control-next {
    width: 50px;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.7);
    border: none;
    border-radius: 50%;
    outline: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .carousel-control-prev {
    left: 20px;
  }
  
  .carousel-control-next {
    right: 20px;
  }
  
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    width: 30px;
    height: 30px;
    background-color: transparent;
    border: none;
    outline: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .carousel-control-prev-icon::before {
    content: '';
    border-width: 0 2px 2px 0;
    border-color: #333;
    border-style: solid;
    transform: rotate(135deg);
    display: inline-block;
    padding: 3px;
  }
  
  .carousel-control-next-icon::before {
    content: '';
    border-width: 0 2px 2px 0;
    border-color: #333;
    border-style: solid;
    transform: rotate(-45deg);
    display: inline-block;
    padding: 3px;
  }
  </style>
  