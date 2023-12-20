<script setup>
    defineProps(['listanotas']);
    const lanzaEvento=defineEmits(['borra','edita']);

    function borrar(id){
        lanzaEvento('borra',id)
    }
    function edita(id){
        lanzaEvento('edita',id)
    }







</script>

<template>
    <br>
    <ul>
        <li v-for="(item, key) in listanotas" :key="key"><span v-if="!item.editando">{{ item.titulo }}</span><input v-else-if="item.editando" type="text"> <button @click="edita(item.id)">Editar</button><button @click="borrar(item.id)">Borrar</button></li>
</ul>
    
</template>

<style>

</style>