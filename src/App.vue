<script setup>
import { RouterLink, RouterView } from 'vue-router'
//import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
    <header>
      <h1>Bienvenido</h1>
      <div class="nav">
        <RouterLink to="/">Login&nbsp;&nbsp;</RouterLink>
        <RouterLink to="/todo">To Do's</RouterLink>
      </div>
  </header>
  <RouterView />
</template>