<script setup>
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut } from "firebase/auth";


function iniciaSesion(){
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log('sesion iniciada');
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
function cerrarSesion(){
    const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
  console.log('sesion cerrada');
}).catch((error) => {
  // An error happened.
}); 
}
</script>

<template>
    <button  @click="iniciaSesion">Inicia sesion</button>
    <button  @click="cerrarSesion">Cerrar sesion</button>
</template>