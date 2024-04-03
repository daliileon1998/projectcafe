<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from './components/Navbar.vue';
import NavbarAdmin from './components/NavbarAdmin.vue';
import Footer from './components/Footer.vue';

const isAuthenticated = ref(false);
const router = useRouter();

const checkAuthentication = () => {
  const token = localStorage.getItem('token');
  isAuthenticated.value = !!token;
};

// Verificar la autenticación al cargar el componente
onMounted(() => {
  checkAuthentication();
});

</script>

<template>
  <div>
    <NavbarAdmin v-if="isAuthenticated" />
    <Navbar v-else />
    <Footer />
  </div>
</template>
