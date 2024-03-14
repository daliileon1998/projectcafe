<script setup>
import Navbar from './components/Navbar.vue'
import NavbarAdmin from './components/NavbarAdmin.vue'
import Footer from './components/Footer.vue'
import { onMounted, ref } from 'vue';
import { auth } from '@/firebase';
import { useRouter } from 'vue-router';
const isAuthenticated = ref(false); 
const router = useRouter(); // Obtener el enrutador de Vue Router

auth.onAuthStateChanged(user => {
  isAuthenticated.value = !!user;
});

onMounted(() => {
  if (isAuthenticated.value==false) {
    console.log("isAuthenticated ----->",isAuthenticated);
    //router.push('/login'); // Redirigir al usuario a la página de inicio de sesión si no está autenticado
  }
});

/*// Variable reactiva para controlar si el usuario está autenticado
let logoutTimeout; // Variable para almacenar el temporizador de cierre de sesión


const handleUserInteraction = () => {
  if (isAuthenticated.value) {
    resetLogoutTimer(); // Reiniciar el temporizador de inactividad solo si el usuario está autenticado
  }
};

const resetLogoutTimer = () => {
  clearTimeout(logoutTimeout); // Limpiar el temporizador existente
  logoutTimeout = setTimeout(() => {
    // Mostrar una alerta personalizada en la interfaz de usuario
    const confirmation = window.confirm('Tu sesión se cerrará debido a la inactividad. ¿Deseas continuar?');
    if (confirmation) {
      // Cerrar sesión del usuario
      auth.signOut().then(() => {
        console.log('Sesión cerrada debido a inactividad');
        router.push('/home'); // Redirigir al usuario a la ruta /home
      }).catch(error => {
        console.error('Error al cerrar sesión:', error);
      });
    }
  }, 60000); // 60000 milisegundos = 1 minuto
};

window.addEventListener('mousemove', handleUserInteraction);
window.addEventListener('keypress', handleUserInteraction);*/
</script>

<template>
  <NavbarAdmin v-if="isAuthenticated" />
  <Navbar v-if="!isAuthenticated" />
  <Footer/>
</template>
