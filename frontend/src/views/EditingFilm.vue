<template>
	<body class="font-montserrat text-sm bg-white dark:bg-zinc-900 " >
    <div class="flex min-h-screen  2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x-2 2xl:border-gray-200 dark:2xl:border-zinc-700 ">
        <!-- Left Sidebar -->
        <main-menu></main-menu>
        <main class=" flex-1 py-10  px-5 sm:px-10 ">

<header class=" font-bold text-lg flex items-center  gap-x-3 md:hidden mb-12 ">
    <span class="mr-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-gray-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
    </span>
    <svg class="h-8 w-8 fill-red-600 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M10 15.5v-7c0-.41.47-.65.8-.4l4.67 3.5c.27.2.27.6 0 .8l-4.67 3.5c-.33.25-.8.01-.8-.4Zm11.96-4.45c.58 6.26-4.64 11.48-10.9 10.9 -4.43-.41-8.12-3.85-8.9-8.23 -.26-1.42-.19-2.78.12-4.04 .14-.58.76-.9 1.31-.7v0c.47.17.75.67.63 1.16 -.2.82-.27 1.7-.19 2.61 .37 4.04 3.89 7.25 7.95 7.26 4.79.01 8.61-4.21 7.94-9.12 -.51-3.7-3.66-6.62-7.39-6.86 -.83-.06-1.63.02-2.38.2 -.49.11-.99-.16-1.16-.64v0c-.2-.56.12-1.17.69-1.31 1.79-.43 3.75-.41 5.78.37 3.56 1.35 6.15 4.62 6.5 8.4ZM5.5 4C4.67 4 4 4.67 4 5.5 4 6.33 4.67 7 5.5 7 6.33 7 7 6.33 7 5.5 7 4.67 6.33 4 5.5 4Z"></path>
    </svg>        
    <div class="tracking-wide dark:text-white flex-1">MMovie<span class="text-red-600">.</span></div>

    <div class="relative items-center content-center flex ml-2">
        <span class="text-gray-400 absolute left-4 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
        </span>
        <input type="text" class="text-xs ring-1 bg-transparent ring-gray-200 dark:ring-zinc-600 focus:ring-red-300 pl-10 pr-5 text-gray-600 dark:text-white  py-3 rounded-full w-full outline-none focus:ring-1" placeholder="Search ...">
    </div>
</header>
<section>
                <div class="flex flex-col justify-between mt-4 bg-black/10 bg-blend-multiply rounded-3xl h-80 overflow-hidden bg-cover bg-center px-7 pt-4 pb-6 text-white"
                 style="background-image: url('images/inception.jpg');" >
                    <div class="bg-gradient-to-r from-black/30 to-transparent -mx-7 -mb-6 px-7 pb-6 pt-2">
                      <button @click="openModal = true" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ajouter un film</button>
                    <div v-if="openModal" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                      <div class="bg-white rounded shadow-lg p-8">
                        <h2 class="text-2xl mb-6">Ajouter un film</h2>
                        <input v-model="newMovie.name" placeholder="Titre du film" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4">
                        <input v-model="newMovie.desc" placeholder="Description du film" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4">
                        <select v-model="newMovie.category" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4">
                            <option value="">Sélectionnez une catégorie</option>
                            <!-- Ajoutez vos catégories ici -->
                            <option value="action">Action</option>
                            <option value="drama">Drame</option>
                            <!-- etc. -->
                          </select>
                          <input v-model="newMovie.year" placeholder="Année de sortie" type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4">
                        <input v-model="newMovie.casts" placeholder="Acteurs (séparés par des virgules)" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4">
                        <input v-model="newMovie.time" placeholder="Durée du film (en minutes)" type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4">
                        <!-- Vous devrez gérer le chargement de l'image séparément, car cela nécessite généralement une intégration avec un service de stockage d'images. -->
                        <button @click="addMovie" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ajouter</button>
                        <button @click="openModal = false" class="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Fermer</button>
                      </div>
                    </div>
                  </div>
                </div> 
                <div class="grid grid-cols-2 gap-y-5 sm:grid-cols-3 gap-x-5">
  <!-- Utilisez une boucle v-for pour itérer sur la liste des films -->
  <div v-for="movie in movies" :key="movie._id" class="flex flex-col rounded-xl overflow-hidden aspect-square border dark:border-zinc-600">
    <img :src="movie.image" class="h-4/5 object-cover w-full" :alt="movie.name">
    <div class="w-full h-1/5 bg-white dark:bg-zinc-800 dark:text-white px-3 flex items-center justify-between border-t-2 border-t-red-600">
      <!-- Affichez le nom du film dynamiquement -->
      <span class="capitalize font-medium truncate">{{ movie.name }}</span>
    </div>
  </div>
</div>

                    
            </section>
</main>
    </div>
    </body>
</template>


  <!--  <template>
  <div>
  Affichez la liste des films ici
    <div v-for="movie in movies" :key="movie._id">
      <h2 class="text-black">{{ movie.name }}</h2>
      
    </div>
  </div>
</template> -->

<script>
import axios from 'axios';
import MainMenu from "../components/MainMenu.vue";

export default {
  components: {
        'main-menu': MainMenu, // Enregistrez le composant menu
    },
  data() {
    return {
      openModal: false,
      newMovie: {
        name: '',
        desc: '',
        image: null,
        titleImage: '',
        rate: 0,
        numberOfReviews: 0,
        category: '',
        time: '',
        language: '',
        year: '',
        video: '',
        casts: [],
      },
      movies: []
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.newMovie.image = URL.createObjectURL(file);
    },
    async addMovie() {
      try {
        // Remplacez 'http://localhost:5000/api/movies' par l'URL de votre API
        const response = await axios.post('http://localhost:5000/api/movies', this.newMovie);
        
        if (response.status === 201) {
          this.movies.push(response.data);
          this.newMovie = { name: '', desc: '', image: null, titleImage: '', rate: 0, numberOfReviews: 0, category: '', time: '', language: '', year: '', video: '', casts: [] };          this.openModal = false;
        } else {
          console.error('Erreur lors de l\'ajout du film');
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
  created() {
  // Chargez la liste des films depuis votre backend
  axios.get('http://localhost:5000/api/movies')
    .then((response) => {
      this.movies = response.data.movies;
    })
    .catch((error) => {
      console.error(error);
    });
  }
}

</script>
