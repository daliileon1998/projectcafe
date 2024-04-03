<template>
  <div>
    <h2 style="text-align: center;padding-top: 20px;">✏️Conoce Nuestros Cursos📚</h2>
    <div class="container" style="margin-top: 40px; margin-bottom: 20px;">
      <div class="row text-center">
        <div class="col-md-4" v-for="(course, index) in paginatedCourses" :key="course._id">
          <router-link :to="{ name: 'CursosUsers', params: { id: course._id } }" style="color: #F5F5DC;">
            <div class="card" style="margin-bottom: 20px;">
              <div class="card-header">
                <p class="card-text" style="font-weight: bold; font-size: 1.2em;">{{ course.name }}</p>
              </div>
              <img :src="'http://localhost:5000/' +course.image" class="card-img-top mx-auto mt-3" style="width: 300px; height: 150px;">
              <div class="card-body">
                <p class="card-text">{{ course.description }}</p>
              </div>
            </div>
          </router-link>
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
import axios from 'axios'; // Importa Axios para hacer la solicitud HTTP

export default {
  name: 'CardBox',
  data() {
    return {
      currentPage: 1,
      coursesPerPage: 6,
      courses: []
    };
  },
  mounted() {
    this.fetchCourses(); // Llama a la función para obtener los cursos cuando el componente se monta
  },
  methods: {
    async fetchCourses() {
      try {
        const response = await axios.get('http://localhost:5000/courses'); // Realiza una solicitud GET a tu servidor Node.js
        this.courses = response.data.Courses; // Asigna los cursos obtenidos de la respuesta a la propiedad courses
      } catch (error) {
        console.error('Error al obtener los cursos:', error);
      }
    },
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
  }
};
</script>

<style scoped>
/* Agrega estilos personalizados aquí si es necesario */
</style>
