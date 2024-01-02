<script setup>
    import { defineProps, defineEmits, ref } from 'vue';

    const props = defineProps(['listanotas']); // Para recibir la lista de notas
    const emit = defineEmits(['borra', 'edita', 'actualizar']); // Para emitir eventos al padre

    const itemEditando = ref(null); // Para almacenar el elemento que está siendo editado
    const textoEditado = ref(''); // Para almacenar el texto editado


    function borrar(id){
        emit('borra', id);
    }
    
    function edita(item) {
        itemEditando.value = item;
        textoEditado.value = item.texto;
    }

    function confirmaEdicion() {
        emit('actualizar', itemEditando.value.id,textoEditado.value);
        itemEditando.value = null; //sale del modo edicion
        textoEditado.value = ""; //resetea el texto editado
    }
 





</script>

<template>
    <div>
        <br>
        <ul>
            <li v-for="item in listanotas" :key="item.id">
                <div class="liContainer" v-if="item != itemEditando">
                    <span>{{ item.texto }}</span>
                    <button @click="edita(item)">Editar</button>
                    <button @click="borrar(item.id)">Borrar</button>
                </div>
                <div class="editandoContainer" v-else>
                    <input type="text" v-model="textoEditado" >
                    <button @click="confirmaEdicion">Confirmar edicion</button>
                </div>
            </li>
        </ul> 
    </div>
</template>

<style>

</style>