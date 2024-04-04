<template>
  <div class="movie-list-page">
    <div class="movie-list-page__container"
         :class="{active: loading}"
    >
      <movie-small-card
          v-for='movie in getMovies'
          :key="movie.kinopoiskId"
          :movie='movie'
          @click='openMoviePage(movie.kinopoiskId)'
      >
      </movie-small-card>
    </div>
    <div v-show="!loading"
         class="movie-list-page__buttons-container"
    >
      <ui-button
          :imgPath='buttons.LEFT_BTN'
          @handleBtnClick = "updatePage(-1)"
      />
      <p class="movie-list-page__count-page">
        {{ page }}
      </p>
      <ui-button
          :imgPath='buttons.RIGHT_BTN'
          @handleBtnClick = "updatePage(1)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import MovieSmallCard from './MovieSmallCard.vue';
import UiButton from "./UI/UiButton.vue";
import { mapActions, mapGetters } from 'vuex'
import {defineComponent, watch} from "vue";
import {buttons} from "@/constants";

interface State {
  loading: boolean;
  isActive: boolean;
  page: number;
  buttons: {
    LEFT_BTN: string;
    RIGHT_BTN: string;
  }
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
      page: 1,
      buttons,
    }
  },
  mounted() {
    if(!this.getMovies.length) {
      this.getMoviesList()
    }
    this.page = localStorage.page > 0 ? parseInt(localStorage.page) : 1;
  },
  computed: {
    ...mapGetters(["getMovies", "getMaxPage"]),
  },
  methods: {
    ...mapActions(['fetchMovies']),

    getMoviesList() {
      this.fetchMovies(localStorage.authKey)
    },
    updatePage(newPage: number) {
      this.page = parseInt(localStorage.page)
      this.page += newPage
      this.page = (this.page < 1) ? 1 : (this.page > this.getMaxPage) ? this.getMaxPage : this.page;
    },
    openMoviePage(movieId: number): void {
      this.$router.push({name: 'card', params: {id: `${movieId}`}})
    },
  },
  watch: { // связываем localStorage.page с page отрисовки
    page(newVal) {
      localStorage.page = newVal
      this.fetchMovies(localStorage.authKey)
    }
  }
})
</script>

<style scoped>
.movie-list-page {
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

.movie-list-page__container {
  display: flex;
  flex-wrap: wrap;
  max-width: 1280px;;
}

.movie-list-page__buttons-container {
  display: flex;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
  justify-content: center;
}

.movie-list-page__count-page {
  font-size: 20px;
  margin: 0 20px;
  display: flex;
  align-items: center;
}
</style>
