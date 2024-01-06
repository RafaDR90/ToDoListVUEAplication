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

    function cambiaPrioridad(prioridad,id) {
        emit('actualizarPrioridad', prioridad, id);
    }
    
    function cambiaEstado(item) {
        emit('actualizarCompletado', item);
    }

    function BorrarCompletadas(){ //Hay que usar props para que detecte listanotas
        for (let i = 0; i < props.listanotas.length; i++) {
            if(props.listanotas[i].completada){
                emit('borraCompletado', props.listanotas[i].id);
            }
        }
    }
 
    function tareasPendientes(){
        let contador=0;
        for (let i = 0; i < props.listanotas.length; i++) {
            if(!props.listanotas[i].completada){
                contador++;
            }
        }
        return contador;
    }




</script>

<template>
    <div>
        <div class="HeaderCuerpo">
            <div class="tareasPendientes">Tienes {{tareasPendientes()}} tareas pendientes</div>
            <button class="BorrarTareasCompletadas" @click="BorrarCompletadas">Borrar Completadas</button>
        </div>
        <br>
        <ul>
            <li v-for="item in listanotas" :key="item.id">
                <div class="liContainer" v-if="item != itemEditando">
                    <div class="nombreNota">{{ item.texto }}</div>
                    <div>
                        <input type="checkbox" v-model="item.completada" @change="cambiaEstado(item)">
                        <label>Completada</label>
                    </div>
                    <div class="prioridadContainer">
                        <button @click="cambiaPrioridad('alta',item.id)" :class="{'botonSeleccionado':item.prioridad=='alta'}">Alta</button>
                        <button @click="cambiaPrioridad('media',item.id)" :class="{'botonSeleccionado':item.prioridad=='media'}">Media</button>
                        <button @click="cambiaPrioridad('baja',item.id)" :class="{'botonSeleccionado':item.prioridad=='baja'}">Baja</button>
                    </div>
                    <div class="botonesAccionContainer">
                        <button class="editar" @click="edita(item)">Editar</button>
                        <button class="borrar" @click="borrar(item.id)">Borrar</button>
                    </div>
                </div>
                <div class="editandoContainer" v-else>
                    <input type="text" v-model="textoEditado" >
                    <button @click="confirmaEdicion">Confirmar edicion</button>
                </div>
            </li>
        </ul> 
    </div>
</template>

<style scoped>
/* Estilos generales para la lista */
ul {
    list-style-type: none;
    padding: 0;
    color: #E0E0E0; /* Texto claro sobre fondo oscuro */
}

li {
    margin-bottom: 10px;
    background-color: #2C3E50; /* Fondo oscuro para cada elemento de la lista */
    padding: 15px;
    border-radius: 5px;
    border: 1px solid #34495E; /* Borde sutil */
}

/* Contenedor de cada elemento de la lista */
.liContainer, .editandoContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* Estilos para los botones */
button {
    margin: 0 5px;
    padding: 8px 12px;
    border: 1px solid #34495E; /* Borde que combina con el fondo */
    border-radius: 4px;
    cursor: pointer;
    background-color: #34495E; /* Color de fondo para botones */
    color: #FFF; /* Texto claro para contraste */
    transition: background-color 0.3s, transform 0.2s;
}

button:hover {
    background-color: #4A6572; /* Color ligeramente más claro al pasar el ratón */
    transform: translateY(-2px); /* Efecto de elevación sutil */
}

/* Estilos para el botón seleccionado */
.botonSeleccionado {
    background-color: #16A085; /* Color distintivo para botones seleccionados */
    color: white;
    border: 1px solid #1ABC9C; /* Borde que combina con el botón seleccionado */
}

/* Estilos para el área de edición */
.editandoContainer input {
    flex-grow: 1;
    margin-right: 10px;
    padding: 8px;
    border: 1px solid #7F8C8D; /* Borde que combina con el estilo oscuro */
    border-radius: 4px;
    background-color: #34495E; /* Fondo que combina con el estilo del botón */
    color: #FFF; /* Texto claro para contraste */
}

.editandoContainer input:focus {
    outline: none;
    border-color: #1ABC9C; /* Resalta el borde cuando está enfocado */
}

</style>