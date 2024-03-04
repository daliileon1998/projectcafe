<template>
    <div>
      <h2 style="text-align: center;padding-top: 20px;">✏️Conoce Nuestros Cursos📚</h2>
      <div class="container" style="margin-top: 40px; margin-bottom: 20px;">
        <div class="row text-center">
          <div class="col-md-4" v-for="(course, index) in paginatedCourses" :key="index">
            <div class="card" style="margin-bottom: 20px;">
              <div class="card-header">
                <p class="card-text" style="font-weight: bold; font-size: 1.2em;">{{ course.name }}</p>
              </div>
              <img :src="course.image" class="card-img-top mx-auto mt-3" style="width: 300px; height: 150px;">
              <div class="card-body">
                <p class="card-text">{{ course.description }}</p>
              </div>
            </div>
          </div>
        </div>
        <nav aria-label="Navegación de páginas">
          <ul class="pagination justify-content-center mt-4">
            <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
              <button class="page-link" @click="prevPage">Anterior</button>
            </li>
            <li class="page-item" v-for="page in totalPages" :key="page" :class="{ 'active': page === currentPage }">
              <button class="page-link" @click="changePage(page)">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
              <button class="page-link" @click="nextPage">Siguiente</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CardBox',
    data() {
      return {
        currentPage: 1,
        coursesPerPage: 6,
        courses: [
          { name: 'Curso 1', image: 'https://via.placeholder.com/150', description: 'Descripción de la tarjeta 1.' },
          { name: 'Curso 2', image: 'https://via.placeholder.com/150', description: 'Descripción de la tarjeta 2.' },
          { name: 'Curso 3', image: 'https://via.placeholder.com/150', description: 'Descripción de la tarjeta 3.' },
          { name: 'Curso 4', image: 'https://via.placeholder.com/150', description: 'Descripción de la tarjeta 4.' },
          { name: 'Curso 5', image: 'https://via.placeholder.com/150', description: 'Descripción de la tarjeta 5.' },
          { name: 'Curso 6', image: 'https://via.placeholder.com/150', description: 'Descripción de la tarjeta 6.' },
          { name: 'Curso 7', image: 'https://via.placeholder.com/150', description: 'Descripción de la tarjeta 7.' },
          { name: 'Curso 8', image: 'https://via.placeholder.com/150', description: 'Descripción de la tarjeta 8.' },
          { name: 'Curso 9', image: 'https://via.placeholder.com/150', description: 'Descripción de la tarjeta 9.' },
          { name: 'Curso 10', image: 'https://via.placeholder.com/150', description: 'Descripción de la tarjeta 10.' }
          // Agrega más cursos según sea necesario
        ]
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.courses.length / this.coursesPerPage);
      },
      paginatedCourses() {
        const startIndex = (this.currentPage - 1) * this.coursesPerPage;
        const endIndex = startIndex + this.coursesPerPage;
        return this.courses.slice(startIndex, endIndex);
      }
    },
    methods: {
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      changePage(page) {
        this.currentPage = page;
      }
    }
  }
  </script>
  
  <style scoped>
  /* Agrega estilos personalizados aquí si es necesario */
  </style>
  