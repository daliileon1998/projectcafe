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
                        <input type="text" class="form-control" id="codigo" v-model="codigo"
                            :class="campoFaltanteClass2(codigo)" required>
                    </div>
                </div>
                <div class="col-lg-6">
                    <!-- Contenedor del campo Nombre -->
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="nombre" v-model="nombre"
                            :class="campoFaltanteClass2(nombre)" required>
                    </div>
                </div>
            </div>

            <!-- Descripción y Estado -->
            <div class="row">
                <div class="col-lg-6">
                    <!-- Contenedor del campo Descripción -->
                    <div class="mb-3">
                        <label for="descripcion" class="form-label">Descripción</label>
                        <textarea class="form-control" id="descripcion" rows="3" v-model="descripcion"
                            required></textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                    <!-- Contenedor del campo Estado -->
                    <div class="mb-3">
                        <label for="estado" class="form-label">Estado</label>
                        <select class="form-control" id="estado" v-model="estado" :class="campoFaltanteClass2(estado)"
                            required>
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
                        <select class="form-control" id="curso" v-model="curso" :class="campoFaltanteClass2(curso)"
                            required>
                            <option value="">Seleccionar</option>
                            <option v-for="(course, index) in activeCourses" :value="course._id" :key="index">{{
                            course.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-6">
                    <!-- Contenedor del campo Imagen -->
                    <div class="mb-3">
                        <label for="imagen" class="form-label">Imagen</label>
                        <input type="file" class="form-control" id="imagen" accept="image/*" @change="onFileChange"
                            required>
                        <p v-if="imagen"><a :href="'http://localhost:5000/' + imagen" target="_blank">Imagen</a></p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6">

                    <div class="mb-3">
                        <label for="documento" class="form-label">Documento</label>
                        <input type="file" class="form-control" id="documento" accept=".pdf,.doc,.docx" multiple
                            ref="documentoInput" @change="onDocumentoChange">
                    </div>
                    <ul>
                        <li v-for="(document, index) in documents" :key="index">
                            <a :href="'http://localhost:5000/' + document.route" target="_blank">{{ document.name }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </form>
    </div>

    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
        @show.bs.modal="resetGuardarClicado">Añadir
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
                                <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal" @click="openModal(leccion, index)">
                                    <font-awesome-icon :icon="['fas', 'pen-to-square']" size="xl" /></button>
                                <button type="button" class="btn btn-danger" @click="eliminarLeccion(index)">
                                    <font-awesome-icon :icon="['fas', 'trash-alt']" size="lg" />
                                </button>
                                <button :class="['btn', leccion.state === '0' ? 'btn-success' : 'btn-secondary']"
                                    @click="editarEstado(index, leccion.state)">
                                    <font-awesome-icon
                                        :icon="leccion.state === '0' ? ['fas', 'toggle-on'] : ['fas', 'toggle-off']" />
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
                                    <input type="text" class="form-control" id="idLession" v-model="idLesson"
                                        hidden="hidden">
                                    <!-- Contenedor del campo Código -->
                                    <div class="mb-3">
                                        <label for="codigo" class="form-label">Código</label>
                                        <input type="text" class="form-control" id="codigoL" v-model="codigoL"
                                            :class="campoFaltanteClass(codigoL)" required>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <!-- Contenedor del campo Nombre -->
                                    <div class="mb-3">
                                        <label for="nombre" class="form-label">Nombre</label>
                                        <input type="text" class="form-control" id="nombreL" v-model="nombreL"
                                            :class="campoFaltanteClass(nombreL)" required>
                                    </div>
                                </div>
                            </div>

                            <!-- Descripción y Estado -->
                            <div class="row">
                                <div class="col-lg-6">
                                    <!-- Contenedor del campo Estado -->
                                    <div class="mb-3">
                                        <label for="estado" class="form-label">Estado</label>
                                        <select class="form-control" id="estadoL" v-model="estadoL"
                                            :class="campoFaltanteClass(estadoL)" required>
                                            <option value="">Seleccionar</option>
                                            <option value="1">Activo</option>
                                            <option value="0">Inactivo</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <!-- Contenido -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <label>Contenido</label>
                                    <ckeditor :editor="editor" v-model="contenidoL"
                                        :class="campoFaltanteClass(contenidoL)" :config="config"></ckeditor>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="guardarLeccion">Guardar</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>

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
    <br><br>

</template>



<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue';
import Swal from 'sweetalert2';

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
        const estado = ref('');
        const imagen = ref('');
        const codigoL = ref('');
        const nombreL = ref('');
        const estadoL = ref('');
        const idLesson = ref('');
        const contenidoL = ref('');
        const lecciones = ref([]); // Array para almacenar las lecciones
        const activeCourses = ref([]);
        const curso = ref('');
        const documents = ref([]);
        const documentoInput = ref([]);
        const guardarClicado = ref(false);
        const guardarClicado2 = ref(false);


        const editor = ClassicEditor
        const config = {
            // Configuración del editor CKEditor
        }

        const eliminarLeccion = (index) => {
            // Mostrar mensaje de confirmación antes de eliminar la lección
            if (window.confirm('¿Estás seguro de que deseas eliminar esta lección?')) {
                // Eliminar la lección del array local
                lecciones.value.splice(index, 1);
                console.log(lecciones);
            }
        };

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
                    lecciones.value = moduleDoc.lessons || '';
                    imagen.value = moduleDoc.image || '';
                    documents.value = moduleDoc.documents || '';
                    const cursoSeleccionado = activeCourses.value.find(course => course._id === moduleDoc.course.id);

                    if (cursoSeleccionado) {
                        curso.value = cursoSeleccionado._id || '';
                    } else {
                        console.error("No se pudo encontrar el curso correspondiente.");
                    }
                    imagen.value = moduleDoc.image || '';
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
        };

        const onFileChange = (event) => {
            const file = event.target.files[0];
            imagen.value = file;
        };


        const onDocumentoChange = () => {
            const files = documentoInput.value.files; // Obtener los archivos seleccionados
            // Iterar sobre los archivos y guardarlos en el atributo documents
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                // Agregar el objeto FormData creado al arreglo de documentos
                documents.value.push(file);
                console.log('Documento seleccionado:', documents);
            }
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
            guardarClicado.value = true;
            if (!codigoL.value || !nombreL.value || !estadoL.value || !contenidoL.value) {
                // Mostrar un mensaje de error si algún campo obligatorio está vacío
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Por favor, completa todos los campos obligatorios.'
                });
                return; // Detener el proceso de guardar la lección si falta algún campo obligatorio
            }

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

        const resetGuardarClicado = () => {
            guardarClicado.value = false;
        };

        const campoFaltanteClass = (campo) => {
            const campoVacio = !campo || (typeof campo === 'string' && campo.trim() === '');
            return {
                'campo-faltante': guardarClicado.value && campoVacio
            };
        };

        const campoFaltanteClass2 = (campo) => {
            const campoVacio = !campo || (typeof campo === 'string' && campo.trim() === '');
            return {
                'campo-faltante': guardarClicado2.value && campoVacio
            };
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

        function agregarLecciones(data, lecciones) {
            lecciones.forEach((leccion, index) => {
                data.append(`lessons[${index}][code]`, leccion.code);
                data.append(`lessons[${index}][name]`, leccion.name);
                data.append(`lessons[${index}][content]`, leccion.content);
                data.append(`lessons[${index}][state]`, leccion.state);
            });
        }

        const guardarModulo = async () => {
            try {
                guardarClicado2.value = true;
                if (!codigo.value || !nombre.value || !estado.value || !curso.value) {
                    // Mostrar un mensaje de error si algún campo obligatorio está vacío
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Por favor, completa todos los campos obligatorios.'
                    });
                    return; // Detener el proceso de guardar la lección si falta algún campo obligatorio
                } else if (lecciones.value.length == 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Por favor, Agrega las lecciones correspondientes al modulo.'
                    });
                    return;
                }
                let data = new FormData();
                const cursoSeleccionado = activeCourses.value.find(c => c._id === curso.value);

                // Agregar datos del módulo al FormData
                data.append('code', codigo.value);
                data.append('name', nombre.value);
                data.append('description', descripcion.value);
                data.append('state', estado.value);
                data.append('course[id]', cursoSeleccionado._id);
                data.append('course[code]', cursoSeleccionado.code);
                data.append('course[name]', cursoSeleccionado.name);
                data.append('course[state]', cursoSeleccionado.state);
                data.append('course[description]', cursoSeleccionado.description);

                // Agregar lecciones al FormData
                agregarLecciones(data, lecciones.value);
                // Verificar si se han seleccionado documentos y agregarlos al FormData
                if (documents.value.length > 0) {
                    for (let i = 0; i < documents.value.length; i++) {
                        data.append('documentos', documents.value[i]);
                    }
                } else {
                    data.append(`documentos`, []);
                }

                // Verificar si se ha seleccionado una imagen y agregarla al FormData
                if (imagen && imagen.value instanceof File) {
                    data.append('imagen', imagen.value); // 'imagen' debe coincidir con el nombre del campo en el backend
                }

                // Determinar si es una solicitud de creación o actualización
                const url = props.id ? `http://localhost:5000/modules/${props.id}` : 'http://localhost:5000/modules';

                // Enviar la solicitud HTTP utilizando Axios
                const response = await axios({
                    method: props.id ? 'put' : 'post',
                    url: url,
                    data: data,
                    headers: {
                        'Content-Type': 'multipart/form-data' // Especificar el tipo de contenido como 'multipart/form-data'
                    }
                });

                // Manejar la respuesta
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: props.id ? 'Módulo actualizado correctamente' : 'Módulo creado correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    router.push('/modulos');
                } else {
                    throw new Error('Error al guardar el módulo');
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al guardar el módulo. Por favor, inténtalo de nuevo más tarde.'
                });
                console.error('Error al guardar el módulo:', error);
            }
        };

        onMounted(() => {
            axios.get('http://localhost:5000/courses/activos')
                .then(response => {
                    // Filtrar los cursos activos
                    console.log(response.data.Courses);
                    //console.log(typeof response.data);
                    activeCourses.value = response.data.Courses;
                    if (props.id !== null) {
                        cargarModulo(props.id);
                    }

                })
                .catch(error => {
                    console.error('Error al cargar los cursos activos:', error);
                });

        });

        return { codigo, nombre, descripcion, estado, imagen, codigoL, nombreL, estadoL, contenidoL, config, lecciones, idLesson, activeCourses, curso, documentoInput, documents, editor, onFileChange, cancelar, guardarLeccion, eliminarLeccion, openModal, editarEstado, guardarModulo, onDocumentoChange, guardarClicado, campoFaltanteClass, guardarClicado2, campoFaltanteClass2, resetGuardarClicado };
    }
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