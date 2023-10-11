<template>
<!-- /* {
"fullName": "Mattsdfsdfsdhias",
"email": "faustfrank37sdfdfghh0@gmail.com",
"password" : "TUtef5"
} */-->  
  <div class="flex h-screen bg-white">
    <div class="w-1/2 bg-red-400 text-white flex flex-col justify-center items-center">
      <!-- Vous pouvez ajouter ici votre illustration -->
      <div class="w-64 h-64 bg-blue-300 rounded-full"></div>
      <h1 class="text-4xl mt-10">Welcome Back!</h1>
    </div>
    <div class="w-1/2 flex flex-col justify-center items-center">
      <h1 class="text-4xl mb-10">Login</h1>
      <form @submit.prevent="submitForm" class="w-64">
        <input type="email" v-model="email" placeholder="Email" class="w-full p-2 mb-4 border border-gray-200 rounded" required />
        <input type="password" v-model="password" placeholder="Password" class="w-full p-2 mb-4 border border-gray-200 rounded" required />
        <button type="submit" class="w-full p-2 bg-purple-500 text-white rounded">Login</button>
      </form>
      <a href="#" class="text-purple-500 mt-4">Forgot your password?</a>
      <!-- Message de confirmation après la connexion -->
      <div v-if="loginSuccess" class="text-green-500 mt-4">
        Login successful! Redirecting to <router-link to="/about" class="text-purple-500">About</router-link>...
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      loginSuccess: false, // Nouvelle donnée pour gérer la confirmation de connexion
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://localhost:5000/api/users/loginadmin', {
          email: this.email,
          password: this.password
        });
        console.log(response.data);

        const token = response.data.token;
        localStorage.setItem('token', response.data.token);

// Si la connexion réussit, définissez loginSuccess sur true
        this.loginSuccess = true;

        setTimeout(() => {
          this.$router.push('/about');
        }, 2000); // Attends 2 secondes (2000 millisecondes) avant de rediriger
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

