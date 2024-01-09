<script setup>
    import {ref} from 'vue';

    const fileInput = ref(null);


    const lanzaEvento=defineEmits(['nuevasnota']);
    let nota=ref("");
    let imagen=ref(null);

    function alta() {
        lanzaEvento('nuevasnota',nota.value,imagen.value)
        nota.value="";
        imagen.value=null;
        if(fileInput.value){
            fileInput.value.value=null;
        }
    }

    function subirArchivo(file) {
        imagen.value=file.target.files[0];
    }
</script>
<template>
    <h3>Cabecera</h3>
    <input type="text" v-model="nota">
    <input type="file" @change="subirArchivo($event)" ref="fileInput">
    <button @click="alta">Alta de Nota</button>
    <br>
</template>
    
<script>
</script>