import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import About from './views/AboutUs.vue';
import Services from './views/Contact.vue';
import Login from './views/Login.vue';
import Cursos from './views/Cursos.vue';
import AddCursos from './views/AddCursos.vue';
import Admin from './views/Admin.vue';
import CursosUsers from './views/CursosUsers.vue';
import ModuloUsers from './views/ModuloUsers.vue';
import Modulos from './views/Modulos.vue';
import AddModulos from './views/AddModulos.vue';
import Users from './views/Users.vue';
import AddUsers from './views/AddUsers.vue';
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
    path: '/CursosUsers',
    name: 'CursosUsers',
    component: CursosUsers
  },
  {
    path: '/ModuloUsers',
    name: 'ModuloUsers',
    component: ModuloUsers
  },
  // PANTALLA ADMIN
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
    meta: { requiresAuth: true }
  },
  {
    path: '/agregarcurso/:id?',
    name: 'AddCursos',
    component: AddCursos,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/modulos',
    name: 'modulos',
    component: () => Modulos,
    meta: { requiresAuth: true }
  },
  {
    path: '/AddModulos/:id?',
    name: 'AddModulos',
    component: AddModulos,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'Users',
    component: () => Users,
    meta: { requiresAuth: true }
  },
  {
    path: '/agregaruser/:id?',
    name: 'AddUser',
    component: AddUsers,
    props: true,
    meta: { requiresAuth: true }
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
