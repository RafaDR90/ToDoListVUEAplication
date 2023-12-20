<script setup>
    import {ref} from 'vue';
    const lanzaEvento=defineEmits(['nuevasnota']);
    let nota=ref("");
    function alta() {
        lanzaEvento('nuevasnota',nota.value)
        nota.value="";
    }
</script>
<template>
    <h3>Cabecera</h3>
    <input type="text" v-model="nota">
    <button @click="alta">Alta de Nota</button>
    <br>
</template>
    
<script>
</script>