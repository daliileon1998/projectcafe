<template>
    <div class="center">
      <h1>Cursos</h1>
    </div>
    <div class="container-fluid mt-3 bg-white border rounded p-3">
      <div class="row">
        <div class="col-md-3">
          <div class="d-grid">
            <button class="btn btn-success"><i class="fa-solid fa-circle-plus"></i> Añadir</button>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-12">
          <div class="table-responsive">
            <table id="comitesTable" class="table table-striped table-bordered custom-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Codigo</th>
                  <th>Nombre</th>
                  <th>Descripcion</th>
                  <th>Imagen</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(curso, index) in cursos" :key="curso.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ curso.codigo }}</td>
                  <td>{{ curso.nombre }}</td>
                  <td>{{ curso.descripcion }}</td>
                  <td>{{ curso.imagen }}</td>
                  <td>{{ curso.estado }}</td>
                  <td>
                    <!-- Aquí van los botones de acciones para cada curso -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { getCursosFromFirebase,db } from '@/firebase';
  
  export default {
    name: 'Cursos',
    setup() {
      const cursos = ref([]);
  
      // Llama a getCursosFromFirebase cuando el componente se ha montado
      onMounted(async () => {
        try {
          const cursosSnapshot = await getCursosFromFirebase(db);
          cursos.value = cursosSnapshot.docs.map(doc => doc.data());
        } catch (error) {
          console.error('Error al obtener cursos desde Firebase:', error);
        }
      });
  
      return { cursos };
    }
  };
  </script>
  
  
  <style scoped>
  /* Estilos personalizados para la tabla */
  .custom-table {
    width: 100%;
  }
  
  .custom-table th {
    background-color: #f8f9fa; /* Color de fondo del encabezado */
  }
  
  .custom-table td {
    vertical-align: middle; /* Alineación vertical del contenido de las celdas */
  }
  
  .custom-table th,
  .custom-table td {
    border: 1px solid #dee2e6; /* Borde de las celdas */
  }
  
  .custom-table th,
  .custom-table td,
  .custom-table button {
    text-align: center; /* Alineación del texto en el centro */
  }
  
  .custom-table button {
    padding: 6px 12px; /* Espaciado interno del botón */
    font-size: 14px; /* Tamaño de la fuente del botón */
  }
  </style>
  