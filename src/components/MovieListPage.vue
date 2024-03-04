<template>
  <div class="container">
    <div class="list-container"
         :class="{active: loading}">
      <movie-small-card
          v-for='movie in allMovies'
          :key="movie.kinopoiskId"
          :movie='movie'
          @click='openMoviePage(movie.kinopoiskId)'>
      </movie-small-card>
    </div>
    <div v-show="!loading"
         class="buttons-container">
      <ui-button
          :imgPath="$constants.buttons.LEFT_BTN"
          @handleBtnClick = "updatePage(-1)"
      />
      <p class="count-page">
        {{ page }}
      </p>
      <ui-button
          :imgPath="$constants.buttons.RIGHT_BTN"
          @handleBtnClick = "updatePage(1)"
      />
    </div>

  </div>
</template>

<script lang="ts">
import MovieSmallCard from './MovieSmallCard.vue';
import UiButton from "./UI/UiButton.vue";
import { mapActions, mapGetters } from 'vuex'
import { defineComponent } from "vue";

interface State {
  loading: boolean;
  isActive: boolean;
  page: number;
}

export default defineComponent({

  components: {
    MovieSmallCard,
    UiButton
  },
  name: 'movie-list-page',

  data(): State {
    return {
      loading: false,
      isActive: false,
      page: 1
    }
  },
  mounted() {
    this.getMoviesList()
    this.page = localStorage.page > 0 ? parseInt(localStorage.page) : 1;
  },
  computed: {
    ...mapGetters(['allMovies']),
  },
  methods: {
    ...mapActions(['getMovies']),

    getMoviesList() {
      this.getMovies(localStorage.authKey)
    },
    updatePage(newPage: number) {
      this.page = parseInt(localStorage.page) + newPage
      localStorage.page = this.page
      if (localStorage.page < 1) this.page = localStorage.page = 1
      else if (localStorage.page > this.$store.getters.getMaxPage) {
        this.page = localStorage.page = this.$store.getters.getMaxPage
      } else {
        this.$store.dispatch('getMovies', localStorage.authKey)
      }
    },
    openMoviePage(movieId: number): void {
      this.$router.push({name: 'card', params: {id: `${movieId}`}})
    },
  }
})
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

.active {
  opacity: 0.2;
}

.active:hover {
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
