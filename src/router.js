import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import About from './views/AboutUs.vue';
import Services from './views/Contact.vue';
import Login from './views/Login.vue';
import Cursos from './views/Cursos.vue';
import Admin from './views/Admin.vue';
import { auth } from '@/firebase';

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contact',
    name: 'Services',
    component: Services
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true }
  },
  {
    path: '/cursos',
    name: 'Cursos',
    component: () => Cursos,
    // Esperar a que la inicialización de Firestore esté completa antes de cargar el componente
   /* beforeEnter: async (to, from, next) => {
      try {
        await initializeFirestore(); // Inicializar Firestore
        next(); // Continuar con la navegación
      } catch (error) {
        console.error('Error al inicializar Firestore:', error);
        next(error); // Pasar el error a la siguiente función de middleware
      }
    }*/
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Guarda de navegación para verificar la autenticación del usuario antes de acceder a la ruta protegida
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth); // Verifica si la ruta requiere autenticación
  const isAuthenticated = auth.currentUser !== null; // Verifica si el usuario está autenticado
  
  if (!isAuthenticated) {
    next();
  }  else if (to.path === '/' && isAuthenticated) {
    // Si el usuario está autenticado y trata de acceder a la página de inicio, redirige a la página de administrador
    next('/admin');
  } else {
    // De lo contrario, permite que el usuario acceda a la ruta solicitada
    next();
  }
});

export default router;
