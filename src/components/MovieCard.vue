<template>
    <div class="movie-container" v-if="movie">
        <btn-navigation class="movie__btn-back"
            :image="$constants.buttons.RIGHT_BTN"/>
        <div class="movie-image-wrap" style="margin-top: 30px;">
            <img :src= this.movie.posterUrl
                :alt= movie.posterUrl
                height="800px">
        </div>
        <h1 class="movie-title">
            {{ movie.nameRu }}
        </h1>
        <div class="movie-description-wrap">
            <h2 class="movie-description-about">Описание</h2>
            <p class="movie-description">
                {{ movie.description}}
            </p>
        </div>
        <div class="movie-raiting_year-wrap">
            <span class="movie-raiting">
                Рейтинг: 
                {{  movie.ratingKinopoisk }}
            </span>
            <span class="movie-year">
                Дата выхода:
                {{ movie.year }}
            </span>
        </div>
    </div>
</template>

<script>
import BtnNavigation from "@/components/BtnNavigation.vue";
export default {
  components: {
      BtnNavigation
  },
  name: 'MovieCard',
  mounted() {
    this.$store.dispatch('getMovie', this.$route.params.id)
  },
  computed: {
    movie() {
      return this.$store.getters.getMovie
    }
  },
}
</script>

<style scoped>
.movie-container {
    background-color: #939ea1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.movie__btn-back {
    position: fixed;
    left: 10px;
    top: 30px;
}
.movie-title {
    height: 100px;
    display: flex;
    align-items: center;
    max-width: 950px;
    margin-top: 20px;
    margin: 30px 0 0 0;
}

.movie-description-wrap {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.movie-description {
    display: flex;
    text-align: left;
    margin: 0 0 20px 0;
    background-color: white;
    padding: 20px;
    border-radius: 12px;
}

.movie-raiting_year-wrap {
    width: 70%;
    display: flex;
    justify-content: space-between;
    margin: 0 0 50px 0;
}

span {
    font-size: 18px;
    color: black;
}

p {
    font-size: 18px;
    color: black;
}

img {
    border-radius: 12px;
}
</style>