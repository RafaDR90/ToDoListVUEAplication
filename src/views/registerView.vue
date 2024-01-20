<script setup>
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import router from "@/router";

    function register(email,password){
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
            console.log('exito',user);
            router.push('/todo')
          
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log('error',errorCode,errorMessage)
        });
    }
    
</script>

<template>
    <div>
        <h2>Register</h2>
        <form @submit.prevent="register(email,password)">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" v-model="email">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" v-model="password">
            <button type="submit" @click="register">Register</button>
        </form>
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
