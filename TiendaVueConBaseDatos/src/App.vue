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

function nuevanota(valor){
  if(valor.trim().length>0){
    const docRef = addDoc(collection(db, "todos"), {
    texto: valor,
    prioridad: "medio",
    editando:false
    });
  }
contenidoNota.value = ''
}
function borranota(id){
  deleteDoc(doc(db, 'todos', id));
}
function editaNota(id,nuevoTexto){
  updateDoc(doc(db, 'todos', id), {
  texto: nuevoTexto
  });

}
</script>

<template>
    <header>
      <div class="wrapper">
          <cabecera @nuevasnota="nuevanota"></cabecera>
          <cuerpo :listanotas="todos" @borra="borranota" @actualizar="editaNota"></cuerpo>
      </div>
  </header>
</template>