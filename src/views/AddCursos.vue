<template>
  <div class="center">
    <h1>Agregar Curso</h1>
  </div>
  <div class="container mt-3">
    <form>
      <!-- Campos del formulario -->
      <div class="row">
        <!-- Código y Nombre -->
        <div class="col-lg-6">
          <!-- Contenedor del campo Código -->
          <div class="mb-3">
            <label for="codigo" class="form-label">Código</label>
            <input type="text" class="form-control" id="codigo" v-model="codigo" :class="campoFaltanteClass(codigo)"
              required>
          </div>
        </div>
        <div class="col-lg-6">
          <!-- Contenedor del campo Nombre -->
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nombre" v-model="nombre" :class="campoFaltanteClass(nombre)"
              required>
          </div>
        </div>
      </div>

      <!-- Descripción y Estado -->
      <div class="row">
        <div class="col-lg-6">
          <!-- Contenedor del campo Descripción -->
          <div class="mb-3">
            <label for="descripcion" class="form-label">Descripción</label>
            <textarea class="form-control" id="descripcion" rows="3" v-model="descripcion" required></textarea>
          </div>
        </div>
        <div class="col-lg-6">
          <!-- Contenedor del campo Estado -->
          <div class="mb-3">
            <label for="estado" class="form-label">Estado</label>
            <select class="form-control" id="state" v-model="state" :class="campoFaltanteClass(state)" required>
              <option value="">Seleccionar</option>
              <option value="1">Activo</option>
              <option value="0">Inactivo</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Imagen -->
      <div class="row">
        <div class="col-lg-6">
          <!-- Contenedor del campo Imagen -->
          <div class="mb-3">
            <label for="imagen" class="form-label">Imagen</label>
            <input type="file" class="form-control" id="imagen" accept="image/*" @change="onFileChange"
              :class="campoFaltanteClass(imagen)" required>
          </div>
          <p v-if="imagen"><a :href="'http://localhost:5000/' + imagen" target="_blank">Imagen</a></p>
        </div>
      </div>

      <!-- Botones -->
      <div class="row justify-content-center">
        <div class="col-lg-6 d-flex justify-content-center align-items-center">
          <button type="button" class="btn btn-primary btn-lg me-2" @click="guardarCurso">
            <font-awesome-icon :icon="['fas', 'save']" class="me-2" />Guardar
          </button>
          <button type="button" class="btn btn-secondary btn-lg" @click="cancelar">
            <font-awesome-icon :icon="['fas', 'times']" class="me-2" />
            Cancelar
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'AddCursos',
  props: {
    id: {
      type: String,
      default: null
    },
  },
  setup(props) {
    const router = useRouter(); // Instanciar el enrutador
    const codigo = ref('');
    const nombre = ref('');
    const descripcion = ref('');
    const imagen = ref('');
    const state = ref('');
    const guardarClicado = ref(false);

    const onFileChange = (event) => {
      const file = event.target.files[0];
      // Procesar la imagen aquí según sea necesario
      imagen.value = file;
    };


    const cancelar = () => {
      limpiarFormulario();
      router.push('/cursos');
      // Otra lógica de cancelación aquí si es necesario
    };
    const limpiarFormulario = () => {
      codigo.value = '';
      nombre.value = '';
      descripcion.value = '';
      state.value = '';
      imagen.value = '';
      // Limpiar imagen si es necesario
    };

    const cargarCurso = async (id) => {
      try {
        const response = await axios.get(`http://localhost:5000/courses/${id}`);
        const cursoDoc = response.data;
        if (cursoDoc) {
          codigo.value = cursoDoc.code || '';
          nombre.value = cursoDoc.name || '';
          descripcion.value = cursoDoc.description || '';
          state.value = cursoDoc.state || '';
          imagen.value = cursoDoc.image || '';
          // Asignar otros campos según sea necesario
        } else {
          console.log("No existe ningún curso con el ID proporcionado");
        }
      } catch (error) {
        console.error('Error al cargar el curso:', error);
      }
    };

    const guardarCurso = async () => {
      try {
        const formData = new FormData(); // Crear un objeto FormData
        guardarClicado.value = true;
        if (!codigo.value || !nombre.value || !state.value || !imagen.value) {
          // Mostrar un mensaje de error si algún campo obligatorio está vacío
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, completa todos los campos obligatorios.'
          });
          return; // Detener el proceso de guardar la lección si falta algún campo obligatorio
        }
        // Asignar los valores al FormData
        formData.append('code', codigo.value);
        formData.append('name', nombre.value);
        formData.append('description', descripcion.value);
        formData.append('state', state.value);

        // Verificar si se ha seleccionado una imagen
        if (imagen && imagen.value) {
          formData.append('image', imagen.value); // Agregar el archivo de imagen al FormData
        } else {
          formData.append('image', ''); // Asignar el atributo image como "" si no se ha seleccionado una imagen
        }

        // Determinar si es una solicitud de creación o actualización
        const url = props.id ? `http://localhost:5000/courses/${props.id}` : 'http://localhost:5000/courses';

        const response = await axios({
          method: props.id ? 'put' : 'post',
          url: url,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data' // Especificar el tipo de contenido como 'multipart/form-data'
          }
        });

        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: props.id ? 'Curso actualizado correctamente' : 'Curso creado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          router.push('/cursos');
        } else {
          throw new Error('Error al guardar el curso');
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al guardar el curso. Por favor, inténtalo de nuevo más tarde.'
        });
        console.error('Error al guardar el curso:', error);
      }
    };

    const campoFaltanteClass = (campo) => {
      const campoVacio = !campo || (typeof campo === 'string' && campo.trim() === '');
      console.log("campo vacío:", campoVacio); // Agrega este console.log para verificar
      return {
        'campo-faltante': guardarClicado.value && campoVacio
      };
    };


    // Cargar el curso al montar el componente si se proporciona un ID
    onMounted(() => {
      console.log("props.id ------>", props.id);
      if (props.id !== null) {
        cargarCurso(props.id);
      }
    });

    return {
      codigo,
      nombre,
      descripcion,
      imagen,
      state,
      guardarClicado,
      onFileChange,
      cancelar,
      guardarCurso,
      campoFaltanteClass
    };
  },

};
</script>


<style scoped>
.center {
  text-align: center;
}

.campo-faltante {
  border-color: red !important;
}
</style>