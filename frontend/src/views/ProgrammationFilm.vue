<template>
    <div>
      <h1>Ajouter un film</h1>
      <form @submit.prevent="addMovie">
        <input v-model="newMovie.name" placeholder="Titre du film" required />
        <input v-model="newMovie.desc" placeholder="Description du film" required />
        <input v-model="newMovie.image" type="url" placeholder="URL de l'image" required />
        <input v-model="newMovie.category" placeholder="Catégorie" required />
        <input v-model="newMovie.year" type="number" placeholder="Année de sortie" required />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        newMovie: {
          name: '',
          desc: '',
          image: '',
          category: '',
          year: 0,
        },
      };
    },
    methods: {
      async addMovie() {
        try {
          const response = await axios.post('http://localhost:5000/api/movies', this.newMovie);
  
          if (response.status === 201) {
            alert('Film ajouté avec succès !');
            this.newMovie = {
              name: '',
              desc: '',
              image: '',
              category: '',
              year: 0,
            };
          } else {
            alert('Erreur lors de l\'ajout du film');
          }
        } catch (error) {
          console.error(error);
        } 
      },
    },
  };
  </script>
  