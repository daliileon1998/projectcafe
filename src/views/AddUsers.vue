<template>
  <div class="center">
    <h1>Agregar Usuario</h1>
  </div>
  <div class="container mt-3">
    <form>
      <!-- Campos del formulario -->
      <div class="row">
        <!-- Username y Nombre -->
        <div class="col-lg-6">
          <!-- Contenedor del campo Nombre -->
          <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="name" v-model="name" :class="campoFaltanteClass(name)" required>
          </div>
        </div>
        <div class="col-lg-6">
          <!-- Contenedor del campo Username -->
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" v-model="username"
              :class="campoFaltanteClass(username)" required autocomplete="off">
          </div>
        </div>
      </div>

      <div class="row">
        <!-- Email y Contraseña -->
        <div class="col-lg-6">
          <!-- Contenedor del campo Email -->
          <div class="mb-3">
            <label for="email" class="form-label">Correo</label>
            <input type="email" class="form-control" id="email" v-model="email" @input="validateEmail"
              :class="campoFaltanteClass(email)" required>
            <small v-if="emailError" class="text-danger">Formato de correo electrónico inválido</small>
          </div>
        </div>
        <div class="col-lg-6">
          <!-- Contenedor del campo Contraseña -->
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <div class="input-group">
              <input class="form-control" :type="passwordFieldType" id="password" v-model="password"
                :class="campoFaltanteClass(password)" required autocomplete="new-password">
              <button class="btn btn-outline-secondary" type="button" @click="togglePasswordVisibility">
                <span v-if="showPassword">Ocultar</span>
                <span v-else>Mostrar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Telefono y Estado -->
      <div class="row">
        <div class="col-lg-6">
          <!-- Contenedor del campo Telefono -->
          <div class="mb-3">
            <label for="phone" class="form-label">Telefono</label>
            <input type="text" class="form-control" id="phone" v-model="phone" @input="limitPhone"
              :class="campoFaltanteClass(phone)" required>
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
      <!-- Botones -->
      <div class="row justify-content-center">
        <div class="col-lg-6 d-flex justify-content-center align-items-center">
          <button type="button" class="btn btn-primary btn-lg me-2" @click="guardarUser">
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
  name: 'AddUsers',
  props: {
    id: {
      type: String,
      default: null
    },
  },
  setup(props) {
    const router = useRouter();
    const username = ref('');
    const name = ref('');
    const phone = ref('');
    const email = ref('');
    const password = ref('');
    const state = ref('activo');
    const showPassword = ref(false);
    const passwordFieldType = ref('password');
    const emailError = ref(false);
    const guardarClicado = ref(false);

    const limitPhone = () => {
      // Filtrar los caracteres no numéricos
      phone.value = phone.value.replace(/\D/g, '');
      // Limitar a 10 caracteres
      if (phone.value.length > 10) {
        phone.value = phone.value.slice(0, 10);
      }
    };

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
      passwordFieldType.value = showPassword.value ? 'text' : 'password';
    };

    const validateEmail = () => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      emailError.value = !regex.test(email.value);
    };

    const cancelar = () => {
      limpiarFormulario();
      router.push('/users');
    };

    const limpiarFormulario = () => {
      username.value = '';
      name.value = '';
      phone.value = '';
      email.value = '';
      password.value = '';
      state.value = '';
    };

    const cargarUser = async (id) => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        const userDoc = response.data;
        if (userDoc) {
          username.value = userDoc.username || '';
          name.value = userDoc.name || '';
          phone.value = userDoc.phone || '';
          state.value = userDoc.state || '';
          email.value = userDoc.email || '';
          password.value = userDoc.password2 || '';
        } else {
          console.log("No existe ningún Usuario con el ID proporcionado");
        }
      } catch (error) {
        console.error('Error al cargar el Usuario:', error);
      }
    };

    const guardarUser = async () => {
      try {

        guardarClicado.value = true;
        if (!username.value || !name.value || !phone.value || !state.value || !password.value || !email.value) {
          // Mostrar un mensaje de error si algún campo obligatorio está vacío
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, completa todos los campos obligatorios.'
          });
          return; // Detener el proceso de guardar la lección si falta algún campo obligatorio
        }

        const userData = {
          username: username.value,
          name: name.value,
          phone: phone.value,
          state: state.value,
          password: password.value,
          password2: password.value,
          email: email.value,
        };

        const url = props.id ? `http://localhost:5000/users/${props.id}` : 'http://localhost:5000/users';

        const response = await axios({
          method: props.id ? 'put' : 'post',
          url: url,
          data: userData,
        });

        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: props.id ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          router.push('/users');
        } else {
          throw new Error('Error al guardar el Usuario');
        }

        /* if (response.status === 200) {
           alert(props.id ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente');
           //router.push('/users');
         } else {
           throw new Error('Error al guardar el Usuario');
         }*/
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al guardar el usuario. Por favor, inténtalo de nuevo más tarde.'
        });
        console.error('Error al guardar el usuario:', error);
        // console.log('Error al guardar el Usuario:', error);
      }
    };

    const campoFaltanteClass = (campo) => {
      const campoVacio = !campo || (typeof campo === 'string' && campo.trim() === '');
      console.log("campo vacío:", campoVacio); // Agrega este console.log para verificar
      return {
        'campo-faltante': guardarClicado.value && campoVacio
      };
    };


    onMounted(() => {
      limpiarFormulario();
      if (props.id !== null) {
        cargarUser(props.id);
      }
    });

    return {
      username,
      name,
      phone,
      email,
      password,
      state,
      showPassword,
      passwordFieldType,
      emailError,
      guardarClicado,
      limitPhone,
      togglePasswordVisibility,
      validateEmail,
      cancelar,
      guardarUser,
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
