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
  
        <!-- Botones -->
        <div class="row justify-content-center">
          <div class="col-lg-6 d-flex justify-content-center align-items-center">
            <button type="button" class="btn btn-primary btn-lg me-2" @click="guardarCurso">
  <font-awesome-icon :icon="['fas', 'save']" class="me-2"/>Guardar
</button>
           <button type="button" class="btn btn-secondary btn-lg" @click="cancelar">
              <font-awesome-icon :icon="['fas', 'times']" class="me-2"/> 
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
  import { getCursosFromFirebaseId,guardarCursosFromFirebase,updateCursoEnFirebase} from '@/firebase';

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
      const estado = ref('activo');

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
      estado.value = '';
      // Limpiar imagen si es necesario
    };

  const cargarCurso = async (id) => {
    try {
      const cursoDoc = await getCursosFromFirebaseId(id);
      if (cursoDoc) {
        codigo.value = cursoDoc.code || '';
        nombre.value = cursoDoc.name || '';
        descripcion.value = cursoDoc.description || '';
        estado.value = cursoDoc.estado || '';
        // Asignar otros campos según sea necesario
      } else {
        console.log("No existe ningún curso con el ID proporcionado");
      }
    } catch (error) {
      console.error('Error al cargar el curso:', error);
    }
  };

  const guardarCurso = async () => {
    console.log("props --------------->", props);
    //GUARDAR LA IMAGEN EN PUBLIC Y LUEGO PASAR LA URL AL OBJETO cursoData
    const cursoData = {
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
        console.log(cursoData);
        const cursoId = await updateCursoEnFirebase(props.id, cursoData);
        alert('Curso actualizado correctamente');
      } else {
        // Si no hay ID, crea un nuevo documento
        console.log(cursoData);
        const cursoId = await guardarCursosFromFirebase(cursoData); // Aquí deberías capturar el ID devuelto por la función
        alert('Curso creado correctamente'); // Utiliza console.log para mostrar el mensaje de éxito
      }
      router.push('/cursos');
    } catch (error) {
      console.log('Error al guardar el curso:', error);
    }
  };
  // Cargar el curso al montar el componente si se proporciona un ID
   onMounted(() => {
    console.log("props.id ------>",props.id);
    if (props.id !== null) {
      cargarCurso(props.id);
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
    guardarCurso
  };
},

  };
</script>

  
  <style scoped>
  .center {
    text-align: center;
  }
  </style>