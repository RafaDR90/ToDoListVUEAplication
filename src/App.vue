<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {ref} from 'vue';
const auth = getAuth();
let usuario=ref(getAuth().currentUser);
onAuthStateChanged(getAuth(), (user) => {
      usuario.value = user; // Actualizar la variable usuario cuando cambie el estado de autenticación
    });
    

</script>

<template>
    <header>
      <h1>Bienvenido {{ usuario ? usuario.displayName : '' }}</h1>
      <div class="nav">
        <RouterLink to="/">Home&nbsp;&nbsp;</RouterLink>
        <template v-if="usuario">
          <RouterLink to="/login">Cerrar sesion&nbsp;&nbsp;</RouterLink>
        </template>
        <template v-else>
          <RouterLink to="/login">Login&nbsp;&nbsp;</RouterLink>
          <RouterLink to="/register">Register&nbsp;&nbsp;</RouterLink>
        </template>
        <RouterLink to="/todo">To Do's</RouterLink>
      </div>
  </header>
  <RouterView />
</template>