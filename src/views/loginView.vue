<script setup>
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut,onAuthStateChanged,signInWithEmailAndPassword  } from "firebase/auth";
import {ref} from 'vue';
import { GithubAuthProvider } from "firebase/auth";
import router from "@/router";






//variable reactiva
let usuarioAutenticado=ref(false);
const auth = getAuth();
let usuario=ref(auth.currentUser);


function login(email,password){
  const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    usuario=auth.currentUser;
    console.log(usuario)
    router.push('/todo')
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('error',errorCode,errorMessage)
  });
}

function iniciaSesion(){
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    usuario.value=result.user;
    router.push('/todo')
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

function iniciaSesionGH(){
  const auth = getAuth();
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    
    // The signed-in user info.
    const user = result.user;
    usuario.value=user;
    console.log(user)
    router.push('/todo')
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GithubAuthProvider.credentialFromError(error);
    // ...
  });
}

function cerrarSesion(){
    const auth = getAuth();
signOut(auth).then(() => {
  usuario.value=null;
  console.log('sesion cerrada');
  router.push('/')
}).catch((error) => {
  // An error happened.
}); 
}
</script>

<template>
  <div>
    <h2>Login</h2>
    <form v-if="!usuario" @submit.prevent="login(email,password)">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" v-model="email">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" v-model="password">
      <button type="submit" @click="login">Login</button>
    </form>
      <button v-if="!usuario" @click="iniciaSesion">Inicia sesion con gmail</button>
      <button v-if="!usuario" @click="iniciaSesionGH">Inicia sesion con GitHub</button>
      <button v-else @click="cerrarSesion">Cerrar sesion</button>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 8px;
  background-color: #333; /* Fondo oscuro */
  color: #fff; /* Texto claro */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  max-width: 400px;
  margin: auto;
}

h2 {
  margin-bottom: 20px;
}

form {
  width: 100%;
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="email"], input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #555; /* Borde más claro */
  background-color: #222; /* Fondo de entrada más oscuro */
  color: #ddd; /* Texto de entrada más claro */
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007BFF; /* Color de botón principal */
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3; /* Color de botón al pasar el ratón por encima */
}

button:disabled {
  background-color: #555;
  cursor: default;
}
</style>
