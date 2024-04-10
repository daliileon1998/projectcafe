<template>
  <div class="d-flex justify-content-center align-items-center" style="padding-top: 50px">
    <div class="card">
      <div class="card-body">
        <img src="../../public/icono.ico" alt="Logo" width="100" height="100" style="display: block; margin: auto;">
        <h3 class="card-title text-center">Iniciar sesión</h3>
        <form>
          <div class="mb-3">
            <label for="usernameLogin" class="form-label">Correo electrónico</label>
            <input type="email" class="form-control" id="email" v-model="email">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <div class="input-group">
              <input :type="passwordFieldType" class="form-control" :class="{ 'password-hidden': !showPassword }"
                id="password" v-model="password">
              <button class="btn btn-outline-secondary" type="button" @click="togglePasswordVisibility">
                <font-awesome-icon :icon="showPassword ? ['fas', 'eye-slash'] : ['fas', 'eye']" />
              </button>
            </div>
          </div>
          <button type="button" class="btn btn-primary w-100" @click="login">Iniciar sesión</button>
        </form>
      </div>
    </div>
  </div>
  <br><br>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'Login',
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const showPassword = ref(false);
    const passwordFieldType = ref('password');
    const isAuthenticated = ref('');

    const login = async () => {
      try {
        const response = await axios.post('http://localhost:5000/users/login', { email: email.value, password: password.value });
        const token = response.data.token;
        localStorage.setItem('token', token);
        isAuthenticated.value = localStorage.getItem('token');
        // Redirigir al usuario después del inicio de sesión
        if (isAuthenticated.value!=="") {
          await router.push('/admin'); // Redirige a la página de administrador después del inicio de sesión
          Swal.fire({
            icon: 'success',
            title: 'Usuario Logueado exitosamente',
            timer: 1500
          });
          await location.reload();
        }
        // router.push('/admin');
      } catch (error) {
        console.log("Error:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.mensaje
        });
      }
    };

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
      passwordFieldType.value = showPassword.value ? 'text' : 'password';
    };

    return { email, password, showPassword, passwordFieldType, login, togglePasswordVisibility };
  }
};
</script>


<style scoped>
.card {
  width: 500px;
  height: 420px;
  border-radius: 10px;
}

.card-title {
  color: #495057;
}

.form-control {
  border-radius: 5px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.password-hidden {
  -webkit-text-security: disc;
  /* Para navegadores basados en WebKit */
  text-security: disc;
  /* Para otros navegadores */
}
</style>
