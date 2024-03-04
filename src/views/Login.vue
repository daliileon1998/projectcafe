<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <img src="../../public/icono.ico" alt="Logo" width="100" height="100" style="display: block; margin: auto;">
        <h3 class="card-title text-center">Iniciar sesión</h3>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="username" class="form-label">Nombre de usuario</label>
            <input type="text" class="form-control" id="username" v-model="email">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <div class="input-group">
              <input type="password" class="form-control" :class="{ 'password-hidden': !showPassword }" id="password" v-model="password">
              <button class="btn btn-outline-secondary" type="button" @click="togglePasswordVisibility">
                <font-awesome-icon :icon="showPassword ? ['fas', 'eye-slash'] : ['fas', 'eye']" />
              </button>
            </div>
          </div>
          <button type="submit" class="btn btn-primary w-100">Iniciar sesión</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Importar el enrutador de Vue Router
import { loginWithEmailAndPassword } from '@/firebase'; 

export default {
  name: 'Login',
  setup() {
    const email = ref('');
    const password = ref('');
    const showPassword = ref(false);
    const router = useRouter(); // Instanciar el enrutador
    const showNavbar = ref(true);

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const login = async () => {
      try {
        console.log(email.value, password.value);
        await loginWithEmailAndPassword(email.value, password.value);
        // Redirigir al usuario al view de admin
        router.push('/admin');
        showNavbar.value = false;
      } catch (error) {
        alert('Error al iniciar sesión:', error.message);
        // Manejar el error de inicio de sesión (mostrar mensaje al usuario, etc.)
      }
    };

    return { email, password, showPassword, togglePasswordVisibility, login };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 83vh;
}

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
  -webkit-text-security: disc; /* Para navegadores basados en WebKit */
  text-security: disc; /* Para otros navegadores */
}
</style>
