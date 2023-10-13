<template>
  <form @submit.prevent="submitForm">

    <input v-model="name" placeholder="Nom du film"/>

    <textarea v-model="desc" placeholder="Description"></textarea>

    <input v-model="image" placeholder="URL de l'image"/>

    <input v-model="titleImage" placeholder="URL de l'image du titre"/>

    <input v-model="rate" type="number" placeholder="Note"/>

    <input v-model="numberOfReviews" type="number" placeholder="Nombre d'avis"/>

    <input v-model="category" placeholder="Catégorie"/>

    <input v-model="time" placeholder="Durée"/>

    <input v-model="language" placeholder="Langue"/>

    <input v-model="year" type="number" placeholder="Année"/>

    <input v-model="video" placeholder="Lien vidéo"/>

    <input v-model="casts" placeholder="Acteurs"/>

    <button @click="addMovie" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ajouter</button>

  </form>

</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
    return {
      name: '',
      desc: '',
      image: '',
      titleImage: '',
      rate: '',
      numberOfReviews: '',
      category: '',
      time: '',
      language: '',
      year: '',
      video: '',
      casts: ''
    }
  },
    methods: {
      async addMovie() {
        try {
          const response = await axios.post('http://localhost:5000/api/movies', this.newMovie);
  
          if (response.status === 201) {
            alert('Film ajouté avec succès !');
            this.newMovie = {
          name: this.name,
          desc: this.desc,
          image: this.image,
          titleImage: this.titleImage,
          rate: this.rate,
          numberOfReviews: this.numberOfReviews,
          category: this.category,
          time: this.time,
          language: this.language,
          year: this.year,
          video: this.video,
          casts: this.casts,
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
  