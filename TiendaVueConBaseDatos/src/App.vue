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
  const docRef = addDoc(collection(db, "todos"), {
  texto: valor,
  prioridad: "medio",
  editando:false
});
contenidoNota.value = ''
}
function borranota(id){
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
    <header>
      <div class="wrapper">
          <cabecera @nuevasnota="nuevanota"></cabecera>
          <cuerpo :listanotas="todos" @borra="borranota" @edita="editaNota"></cuerpo>
      </div>
  </header>
</template>