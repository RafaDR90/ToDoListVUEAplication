<script setup>
    defineProps(['listanotas']);
    const lanzaEvento=defineEmits(['borra','edita']);

    function borrar(id){
        lanzaEvento('borra',id)
    }
    function edita(item){
        item.editando=true;
    }

 





</script>

<template>
    <br>
    <ul>
        <li v-for="(item, key) in listanotas" :key="key">
            <div class="liContainer" v-if="!item.editando"><span>{{ item.texto }}</span><button @click="edita(item)">Editar</button><button @click="borrar(item.id)">Borrar</button></div><div class="editandoContainer" v-else><input type="text" :value="item.texto"><button>Confirmar edicion</button></div></li>
    </ul> 
</template>

<style>

</style>