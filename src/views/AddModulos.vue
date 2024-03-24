<template>
  <div class="center">
    <h1>Agregar Modulos</h1>
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
            <input type="text" class="form-control" id="codigo" v-model="codigo" required>
          </div>
        </div>
        <div class="col-lg-6">
          <!-- Contenedor del campo Nombre -->
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nombre" v-model="nombre" required>
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
            <select class="form-control" id="estado" v-model="estado" required>
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
            <label for="curso" class="form-label">Curso</label>
            <select class="form-control" id="curso" v-model="curso" required>
              <option value="">Seleccionar</option>
              <option v-for="(course, index) in activeCourses" :value="course._id" :key="index">{{ course.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-lg-6">
          <!-- Contenedor del campo Imagen -->
          <div class="mb-3">
            <label for="imagen" class="form-label">Imagen</label>
            <input type="file" class="form-control" id="imagen" accept="image/*" @change="onFileChange" required>
          </div>
        </div>
      </div>
    </form>
  </div>

  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Añadir
    Leccion</button>

  <div class="row mt-3">
      <div class="col-md-12">
        <div class="table-responsive">
          <table id="comitesTable" class="table table-striped table-bordered custom-table">
            <!-- Encabezados de la tabla -->
            <thead>
              <tr>
                <th>#</th>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <!-- Cuerpo de la tabla -->
            <tbody>
              <!-- Filas de la tabla, aplicando el filtro de búsqueda -->
              <tr v-for="(leccion, index) in lecciones" :key="leccion.code">
                <td>{{ index + 1 }}</td>
                <td>{{ leccion.code }}</td>
                <td>{{ leccion.name }}</td>
                <td>{{ leccion.state === '1' ? 'Activo' : 'Inactivo' }}</td>
                <td>
                  <!-- Botones de acción -->
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                  @click="openModal(leccion, index)"> <font-awesome-icon :icon="['fas', 'pen-to-square']"
                    size="xl" /></button>
                  <button :class="['btn', leccion.state === '0' ? 'btn-success' : 'btn-danger']"
                    @click="editarEstado(index, leccion.state)">
                    <font-awesome-icon :icon="leccion.state === '0' ? ['fas', 'toggle-on'] : ['fas', 'toggle-off']" />
                    <span v-if="leccion.state === '1'" style="color: white"> Inactivar</span>
                    <span v-else style="color: white"> Activar</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div ref="exampleModal" class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Lección</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="container mt-3">
    <form>
      <!-- Campos del formulario -->
      <div class="row">
        <!-- Código y Nombre -->
        <div class="col-lg-6">
<input type="text" class="form-control" id="idLession" v-model="idLesson" hidden="hidden">
          <!-- Contenedor del campo Código -->
          <div class="mb-3">
            <label for="codigo" class="form-label">Código</label>
            <input type="text" class="form-control" id="codigoL" v-model="codigoL" required>
          </div>
        </div>
        <div class="col-lg-6">
          <!-- Contenedor del campo Nombre -->
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nombreL" v-model="nombreL" required>
          </div>
        </div>
      </div>

      <!-- Descripción y Estado -->
      <div class="row">
                <div class="col-lg-6">
          <!-- Contenedor del campo Estado -->
          <div class="mb-3">
            <label for="estado" class="form-label">Estado</label>
            <select class="form-control" id="estadoL" v-model="estadoL" required>
              <option value="">Seleccionar</option>
              <option value="1">Activo</option>
              <option value="0">Inactivo</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Imagen -->
      <div class="row">
        <div class="col-lg-12">
          <label>Editor</label>
      <ckeditor :editor="editor" v-model="contenidoL" :config="config"></ckeditor>
        </div>
      </div>
    </form>
  </div>
                      </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" @click="guardarLeccion">Guardar</button>
          </div>
        </div>
      </div>
    </div>

      <!-- Botones -->
      <div class="row justify-content-center">
        <div class="col-lg-6 d-flex justify-content-center align-items-center">
          <button type="button" class="btn btn-primary btn-lg me-2" @click="guardarModulo">
<font-awesome-icon :icon="['fas', 'save']" class="me-2" />Guardar
</button>
         <button type="button" class="btn btn-secondary btn-lg" @click="cancelar">
            <font-awesome-icon :icon="['fas', 'times']" class="me-2" /> 
            Cancelar
          </button>
        </div>
      </div>

</template>



<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; 
import axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue';

export default {
  name: 'AddModulos',
  props: {
    id: {
      type: String,
      default: null
    },
  },
components: {
    CKEditor
  },
  setup(props) {
    const router = useRouter();
    const codigo = ref('');
    const nombre = ref('');
    const descripcion = ref('');
        const estado = ref('activo');
const imagen = ref('');
    const codigoL = ref('');
    const nombreL = ref('');
    const estadoL = ref('activo');
    const idLesson = ref('');
    const contenidoL = ref('');
    const lecciones = ref([]); // Array para almacenar las lecciones
    const activeCourses = ref([]);
    const curso = ref('');

    const editor = ClassicEditor
    const config = {
      // Configuración del editor CKEditor
    }

    const cargarModulo = async (id) => {
      try {
        const response = await axios.get(`http://localhost:5000/modules/${id}`);
        const moduleDoc = response.data;
console.log(moduleDoc);
        if (moduleDoc) {
          codigo.value = moduleDoc.code || '';
          nombre.value = moduleDoc.name || '';
          descripcion.value = moduleDoc.description || '';
          estado.value = moduleDoc.state || '';
          imagen.value = moduleDoc.image || '';
          // Asignar otros campos según sea necesario
        } else {
          console.log("No existe ningún modulo con el ID proporcionado");
        }
      } catch (error) {
        console.error('Error al cargar el modulo:', error);
      }
    };

    const openModal = (lession, index) => {

      if (lession) {
        codigoL.value = lession.code || '';
        nombreL.value = lession.name || '';
        estadoL.value = lession.state || '';
        contenidoL.value = lession.content || '';
        idLesson.value = index;
      }
      console.log(index);
    };


const onFileChange = (event) => {
  const file = event.target.files[0];
    imagen.value = file;
// Aquí puedes manejar la carga de la imagen si es necesario
};

const cancelar = () => {
  limpiarFormulario();
  router.push('/modulos');
  };

const limpiarFormulario = () => {
    codigo.value = '';
    nombre.value = '';
    descripcion.value = '';
    estado.value = 'activo'; // Reiniciar el estado a 'activo' al limpiar el formulario
      imagen.value = '';
    };

    const limpiarFormularioLeccion = () => {
      codigoL.value = '';
      nombreL.value = '';
      estadoL.value = 'activo'; // Reiniciar el estado a 'activo' al limpiar el formulario
      contenidoL.value = '';
    };

    const guardarLeccion = async () => {
      const leccionData = {
        code: codigoL.value,
        name: nombreL.value,
        state: estadoL.value,
        content: contenidoL.value
      };
      try {
        // Agregar la lección al array local
        console.log("idLesson ---------------->", idLesson, "-----------", (idLesson.value !== ""));
        if (idLesson.value !== "") {
          lecciones.value[idLesson.value] = leccionData;
    } else {
      lecciones.value.push(leccionData); // Utiliza lecciones.value para acceder al array
    }
console.log("lecciones ----------->", lecciones);
        // Limpiar el formulario después de guardar
        limpiarFormularioLeccion();
  } catch (error) {
    console.error('Error al guardar la lección:', error);
      }
    };

    // Método para cambiar el state del modulo
    const editarEstado = async (id, state) => {
      // Mostrar mensaje de confirmación antes de editar el state
      if (window.confirm('¿Estás seguro de que deseas cambiar el state del modulo?')) {
        const newEstado = state === '0' ? '1' : '0';
        lecciones.value[id]["state"] = newEstado;
        console.log("lecciones ----------->", lecciones, newEstado, state);
        // Recargar los modulo después de editar el state
        // await cargarModulos();
  }
};

const guardarModulo = async () => {
  console.log("props --------------->", props);
  const formData = new FormData(); // Crear un objeto FormData
      const cursoSeleccionado = activeCourses.value.find(c => c._id === curso.value);
      delete cursoSeleccionado._id;
      delete cursoSeleccionado.image;
      console.log("cursoSeleccionado ----------->", cursoSeleccionado);
      // Asignar los valores al FormData
      formData.append('code', codigo.value);
      formData.append('name', nombre.value);
      formData.append('description', descripcion.value);
      formData.append('state', estado.value);
      formData.append('course', JSON.stringify(cursoSeleccionado.value));
      formData.append('lessons', JSON.stringify(lecciones.value));

      // Verificar si se ha seleccionado una imagen
      if (imagen && imagen.value) {
        console.log("holaaaaa", imagen.value);
        formData.append('image', imagen.value); // Agregar el archivo de imagen al FormData
      } else {
        formData.append('image', ''); // Asignar el atributo image como "" si no se ha seleccionado una imagen
      }

      console.log(formData);

      try {
    if (props.id !== null && props.id != '') {
      // Si hay un ID, actualiza el documento existente
      console.log(formData);
      await axios.put(`http://localhost:5000/modules/${props.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data' // Especificar el tipo de contenido como 'multipart/form-data'
            }
          });
      alert('Modulo actualizado correctamente');
    } else {
      // Si no hay ID, crea un nuevo documento
      console.log(formData);
      await axios.post(`http://localhost:5000/modules`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data' // Especificar el tipo de contenido como 'multipart/form-data'
            }
          });
      alert('Modulo creado correctamente'); // Utiliza console.log para mostrar el mensaje de éxito
    }
    //router.push('/modulos');
  } catch (error) {
    console.log('Error al guardar el Modulo:', error);
  }
};

 onMounted(() => {
  // Cargar la lección si se proporciona un ID
  if (props.id !== null) {
    cargarModulo(props.id);
      }
      axios.get('http://localhost:5000/courses')
        .then(response => {
          // Filtrar los cursos activos
          console.log(response.data.Courses);
          console.log(typeof response.data);
          activeCourses.value = response.data.Courses.filter(course => course.state === '1');

        })
        .catch(error => {
          console.error('Error al cargar los cursos activos:', error);
        });

    });

    return { codigo, nombre, descripcion, estado, imagen, codigoL, nombreL, estadoL, contenidoL, onFileChange, cancelar, guardarLeccion, editor, config, lecciones, openModal, idLesson, editarEstado, guardarModulo, activeCourses, curso };
  }
};
</script>

<style scoped>
.center {
  text-align: center;
}
</style>