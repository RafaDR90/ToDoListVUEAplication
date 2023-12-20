<script setup>
import cabecera from './components/cabecera.vue'
import cuerpo from './components/cuerpo.vue'
import { ref } from 'vue';
var ultimoId=ref(0);
var arrayNotas=ref([]);


function obtenerSiguienteId() {
  while (true) {
    ultimoId.value++;
    // Verificar si el ID ya existe en arrayNotas
    if (!arrayNotas.value.some(nota => nota.id === ultimoId.value)) {
      return ultimoId.value;
    }
  }
}

function reciboNota(nota) {
  arrayNotas.value.push({titulo: ref(nota),
                        prioridad:'media',
                        id:obtenerSiguienteId(),
                        editando:false})
}

function borranotas(id){
  
  arrayNotas.value.forEach(element => {
    if(element.id==id)
    arrayNotas.value.splice(element,1)
  });
}
//ESTOY EDITANDO
function editaNota(id){
  arrayNotas.value.forEach(element => {
    if(element.id==id)
    element.titulo=prompt("Introduce el nuevo titulo")
  });
}
</script>

<template>
  <header>
      <div class="wrapper">
          <cabecera @nuevasnota="reciboNota"></cabecera>
          <cuerpo :listanotas="arrayNotas" @borra="borranotas" @edita="editaNota"></cuerpo>
      </div>
  </header>
</template>