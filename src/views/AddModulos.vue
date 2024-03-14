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
            <label for="imagen" class="form-label">Imagen</label>
            <input type="file" class="form-control" id="imagen" accept="image/*" @change="onFileChange" required>
          </div>
        </div>
      </div>
    </form>
  </div>

  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                    @click="openModal(modulo)">Añadir Leccion</button>

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
              <tr v-for="(modulo, index) in filteredModulos" :key="modulo.id">
                <td>{{ index + 1 }}</td>
                <td>{{ modulo.code }}</td>
                <td>{{ modulo.name }}</td>
                <td>{{ modulo.description }}</td>
                <td>{{ modulo.course }}</td>
                <td></td>
                <td>
                <td>
                </td>
                </td>
                <td>{{ modulo.estado === '1' ? 'Activo' : 'Inactivo' }}</td>
                <td>
                  <!-- Botones de acción -->
                  <router-link :to="{ name: 'AddModulos', params: { id: modulo.id } }" class="btn btn-warning">
                    <font-awesome-icon :icon="['fas', 'pen-to-square']" size="xl" />
                  </router-link>
                  <button :class="['btn', modulo.estado === '0' ? 'btn-success' : 'btn-danger']"
                    @click="editarEstado(modulo.id, modulo.estado)">
                    <font-awesome-icon :icon="modulo.estado === '0' ? ['fas', 'toggle-on'] : ['fas', 'toggle-off']" />
                    <span v-if="modulo.estado === '1'" style="color: white"> Inactivar</span>
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
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
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
          <label>Editor</label>
          <VueQuillEditor v-model="content" />
        </div>
      </div>
    </form>
  </div>
            <ul>
              <li v-for="(lesson, index) in lessons" :key="index">{{ lesson.name }}</li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary">Guardar cambios</button>
          </div>
        </div>
      </div>
    </div>

      <!-- Botones -->
      <div class="row justify-content-center">
        <div class="col-lg-6 d-flex justify-content-center align-items-center">
          <button type="button" class="btn btn-primary btn-lg me-2" @click="guardarModulo">
<font-awesome-icon :icon="['fas', 'save']" class="me-2"/>Guardar
</button>
         <button type="button" class="btn btn-secondary btn-lg" @click="cancelar">
            <font-awesome-icon :icon="['fas', 'times']" class="me-2"/> 
            Cancelar
          </button>
        </div>
      </div>

</template>



<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; 
import VueQuillEditor from 'vue3-quill-editor';
import { getModulosFromFirebase,guardarModulosFromFirebase,updateEstadoModulo} from '@/firebase';

export default {
  name: 'AddModulos',
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
    const estado = ref('activo');

const onFileChange = (event) => {
  const file = event.target.files[0];
  // Procesar la imagen aquí según sea necesario
  imagen.value = file;
};

const cancelar = () => {
  limpiarFormulario();
  router.push('/modulos');
  // Otra lógica de cancelación aquí si es necesario
};
const limpiarFormulario = () => {
    codigo.value = '';
    nombre.value = '';
    descripcion.value = '';
    estado.value = '';
    // Limpiar imagen si es necesario
  };

const cargarModulo = async (id) => {
  try {
    const moduloDoc = await getModulosFromFirebase(id);
    if (moduloDoc) {
      codigo.value = moduloDoc.code || '';
      nombre.value = moduloDoc.name || '';
      descripcion.value = moduloDoc.description || '';
      estado.value = moduloDoc.estado || '';
      // Asignar otros campos según sea necesario
    } else {
      console.log("No existe ningún modulo con el ID proporcionado");
    }
  } catch (error) {
    console.error('Error al cargar el modulo:', error);
  }
};

const guardarModulo = async () => {
  console.log("props --------------->", props);
  //GUARDAR LA IMAGEN EN PUBLIC Y LUEGO PASAR LA URL AL OBJETO moduloData
  const moduloData = {
    code: codigo.value,
    name: nombre.value,
    description: descripcion.value,
    estado: estado.value,
    image:''
    // Agregar otros campos según sea necesario
  };
  try {

    if (props.id !== null && props.id != '') {
      // Si hay un ID, actualiza el documento existente
      console.log(moduloData);
      const moduloId = await updateModuloEnFirebase(props.id, moduloData);
      alert('Modulo actualizado correctamente');
    } else {
      // Si no hay ID, crea un nuevo documento
      console.log(moduloData);
      const moduloId = await guardarModulosFromFirebase(moduloData); // Aquí deberías capturar el ID devuelto por la función
      alert('Modulo creado correctamente'); // Utiliza console.log para mostrar el mensaje de éxito
    }
    router.push('/modulos');
  } catch (error) {
    console.log('Error al guardar el modulo:', error);
  }
};
// Cargar el modulo al montar el componente si se proporciona un ID
 onMounted(() => {
  console.log("props.id ------>",props.id);
  if (props.id !== null) {
    cargarModulo(props.id);
  }
});

return {
  codigo,
  nombre,
  descripcion,
  imagen,
  estado,
  onFileChange,
  cancelar,
  guardarModulo
};
},
components:{
  VueQuillEditor
}

};
</script>


<style scoped>
.center {
  text-align: center;
}
</style>