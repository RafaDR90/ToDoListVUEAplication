<script setup>

import { useCollection } from 'vuefire'
import { collection,addDoc,doc,deleteDoc,updateDoc} from 'firebase/firestore'
import {useFirestore} from 'vuefire'
import { ref } from 'vue'
import cabecera from './components/cabecera/cabecera.vue'
import cuerpo from './components/cuerpo/cuerpo.vue'
let db = useFirestore()
const todos = useCollection(collection(db, 'todos'))



let contenidoNota = ref('')

function nuevanota(valor){
  if(valor.trim().length>0){
    const docRef = addDoc(collection(db, "todos"), {
    texto: valor,
    prioridad: "media",
    editando:false,
    completada:false
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

function cambiaPrioridad(prioridad,id) {
  console.log(prioridad)
  updateDoc(doc(db, 'todos', id), {
  prioridad: prioridad
  });
}

function actualizaCompletado(item) {
  updateDoc(doc(db, 'todos', item.id), {
  completada: item.completada
  });
}

</script>

<template>
    <header>
      <div class="wrapper">
          <cabecera @nuevasnota="nuevanota"></cabecera>
          <cuerpo :listanotas="todos" @borra="borranota" @actualizar="editaNota" @actualizarPrioridad="cambiaPrioridad" @actualizarCompletado="actualizaCompletado" @borraCompletado="borranota"></cuerpo>
      </div>
  </header>
</template>