<template>
     <div class="container">
    <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div v-for="(image, index) in images" :key="index" :class="{ 'carousel-item': true, 'active': index === 0 }">
          <img :src="image.src" class="d-block w-100" :alt="'Banner'">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Banner',
    data() {
      return {
        images: [
          { src: "/../banner3.jpg" },
          { src: "/../banner2.jpg" },
          { src: "/../banner1.jpg" }
        ]
      };
    }
  }
  </script>
  
  <style scoped>
  /* Establece un tamaño fijo para las imágenes */
  .carousel-item img {
    height: 350px; /* Alto fijo en píxeles */
    padding-right: 60px !important;
    padding-left: 60px !important;
    padding-top: 15px;
  }

  </style>
  