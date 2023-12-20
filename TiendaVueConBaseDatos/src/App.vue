<script setup>

import { useCollection } from 'vuefire'
import { collection,addDoc,doc,deleteDoc,updateDoc} from 'firebase/firestore'
import {useFirestore} from 'vuefire'
import { ref } from 'vue'
import cabecera from './components/cabecera.vue'
import cuerpo from './components/cuerpo.vue'
let db = useFirestore()
const todos = useCollection(collection(db, 'todos'))



let contenidoNota = ref('')
function altaNota(){
  const docRef = addDoc(collection(db, "todos"), {
  texto: contenidoNota.value,
  prioridad: "medio"
});
contenidoNota.value = ''
}
function eliminarNota(id){
  console.log('eliminando nota')
  deleteDoc(doc(db, 'todos', id));
}
function editarNota(id){
  console.log('editando nota')
  updateDoc(doc(db, 'todos', id), {
  texto: 'nota editada'
  });

}
</script>

<template>
    <input v-model="contenidoNota" type="text">
    <button @click="altaNota">Alta</button>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <span>{{ todo.texto }}</span>
      <div class="prioridadsContainer"><p>Prioridad</p><div class="prioridades__buttons"><button>Alta</button><button>Media</button><button>Baja</button></div></div>
      <div class="botonesEB"><button @click="editarNota(todo.id)">Editar</button><button @click="eliminarNota(todo.id)">Eliminar</button></div>
    </li>
  </ul>
</template>