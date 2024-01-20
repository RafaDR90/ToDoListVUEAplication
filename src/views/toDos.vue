<script setup>
import { query, where } from 'firebase/firestore'
import { useCollection } from 'vuefire'
import { collection,addDoc,doc,deleteDoc,updateDoc} from 'firebase/firestore'
import {useFirestore} from 'vuefire'
import { ref } from 'vue'
import cabecera from '../components/cabecera/cabecera.vue'
import cuerpo from '../components/cuerpo/cuerpo.vue'
import { getStorage,getDownloadURL,uploadBytes,ref as storageRef } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
let db = useFirestore()
const coleccion = collection(db, 'todos')
let todos = useCollection(collection(db, 'todos')) // Instancia nombre de la colección
let usuarioAutenticado=ref(false);
const auth = getAuth();
let usuario=ref(getAuth().currentUser);
onAuthStateChanged(getAuth(), (user) => {
      usuario.value = user; // Actualizar la variable usuario cuando cambie el estado de autenticación
      //if(usuario.value.uid!="")
      todos = useCollection(query(coleccion,where("uid", "==", usuario.value.uid)))

    });



let contenidoNota = ref('')

function nuevanota(valor, imagen) {
  if (valor.trim().length > 0) {
    if (imagen) {
      // Si hay una imagen, subirla primero
      const storage = getStorage();
      const fileRef = storageRef(storage, 'imagenes/' + imagen.name);
      uploadBytes(fileRef, imagen).then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      }).then(downloadURL => {
        console.log('Imagen subida con URL ' + downloadURL);
        agregarNota(valor, downloadURL);
      });
    } else {
      // Si no hay imagen, agregar la nota directamente
      agregarNota(valor, null);
    }
  }
  contenidoNota.value = '';
}

function agregarNota(texto, imgUrl) {
  const uid = usuario.value.uid; // Obtén el UID del usuario actual

  addDoc(collection(db, "todos"), {
    texto: texto,
    prioridad: "media",
    editando: false,
    completada: false,
    verImg: false,
    img: imgUrl, // Será null si no hay imagen
    uid: uid // Almacena el UID en el campo "uid"
  });
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
    <main>
      <div class="wrapper">
          <cabecera @nuevasnota="nuevanota"></cabecera>
          <cuerpo :listanotas="todos" @borra="borranota" @actualizar="editaNota" @actualizarPrioridad="cambiaPrioridad" @actualizarCompletado="actualizaCompletado" @borraCompletado="borranota"></cuerpo>
      </div>
    </main>
</template>