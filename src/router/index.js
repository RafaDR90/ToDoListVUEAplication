import { createRouter, createWebHistory } from 'vue-router'
import toDos from '../views/toDos.vue'
import LoginView from '../views/loginView.vue'
import Register from '../views/registerView.vue'
import landingPage from '../views/landingView.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";

var usuarioAutenticado=false;
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    usuarioAutenticado=true;
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    usuarioAutenticado=false;
    // User is signed out
    // ...
  }
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homePague',
      component: landingPage
    },
    {
      path: '/login',
      name: 'home',
      component: LoginView
    },
    {
      path: '/todo',
      name: 'todo',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/toDos.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})


router.beforeEach((to, from, next) => {
  // Aquí puedes agregar tu lógica personalizada.
  // Por ejemplo, comprobar si el usuario está autenticado.
  if (to.path == '/todo' && !usuarioAutenticado) {
    next('/'); // Redirigir al inicio de sesión si no está autenticado
  } else {
    next(); // Continuar con la ruta deseada si está autenticado o si es la página de inicio
  }
});


export default router
