<template>
    <div class="container">
        <div class="list-container" 
            :class="{active: loading}">
            <movie-small-card
                v-for='movie in allMovies'
                :key="movie.kinopoiskId"
                :movie = 'movie'
                @click='openMoviePage(movie.kinopoiskId)'></movie-small-card>
        </div>
        <div v-show="!loading"
            class="buttons-container">
            <btn-page
                @update-page="updatePage(-1)"
                :image = "$constants.buttons.LEFT_BTN"
                :page = "this.page"></btn-page>
            <p class="count-page">
                {{ page }}
            </p>
            <btn-page
                :class="{ active: isActive }"
                @update-page="updatePage(+1)"
                :image = "$constants.buttons.RIGHT_BTN"
                :page = "this.page"></btn-page>
        </div>
    </div>
</template>

<script>
import MovieSmallCard from './MovieSmallCard.vue';
import BtnPage from './BtnPage.vue';
import { mapActions, mapGetters } from 'vuex'
export default {
    components: {
        MovieSmallCard,
        BtnPage
    },      
    name: 'movie-list-page',
    data() {
        return {
            loading: false,
            isActive: false,
            page: '1'
        }
    },
    mounted() {
        this.getMoviesList()
        if(localStorage.page > 0 ) {
            this.page = localStorage.page
        } else {
            this.page = localStorage.page = 1
        }
    },
    computed: {
        ...mapGetters(['allMovies']),
    },
    methods: {
      ...mapActions(['getMovies']),

      getMoviesList() {
        this.getMovies(localStorage.authKey)
      },
      updatePage(newPage) {
        if(this.page < this.$store.getters.getTotalPages + 1) {
          this.page = parseInt(localStorage.page) + newPage
          localStorage.page = this.page
          if(this.$store.getters.getTotalPages < this.page) {
            this.isActive = true;
          } else {
            this.$store.dispatch('getNewPage', newPage);
            this.sendRequest()
            this.isActive = false;
          }
        }
      },
      openMoviePage(movieId) {
        this.$router.push({ name: 'card', params: { id: `${movieId}` }})
      },
      async sendRequest() {
        try {
          this.loading = true;
          const response = await this.$api.getAllMovies(this.page);
          console.log(`response: ${response}`)
          this.$store.dispatch('fetchApi', response)
          this.$store.dispatch('getStatusAuth', response);
          this.loading = false;
        } catch (error) {
          console.log('error', error)
          this.loading = false;
        }
      },
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    position: relative;
}

.active{
    opacity: 0.2;
}
.active:hover{
    opacity: 0.2;
}
.list-container {
    display: flex;
    flex-wrap: wrap;
    max-width: 1280px;;
}
.buttons-container {
    display: flex;
    width: 100%;
    margin-top: 50px;
    margin-bottom: 50px;
    justify-content: center;
}
.count-page {
    font-size: 20px;
    margin: 0 20px;
    display: flex;
    align-items: center;
}
</style>