<template>
    <div v-if="movie"
         class="movie-card__container" >
      <ui-button
        class="movie-card__btn"
        :imgPath="buttons.LEFT_BTN"
        @handleBtnClick="comeBack"
      />
        <div class="movie-card__image-wrap"
             style="margin-top: 30px">
            <img :src= this.movie.posterUrl
                  :alt= movie.posterUrl
                  height="800px"
            >
        </div>
        <h1 class="movie-card__title">
            {{ nameRu }}
        </h1>
        <div class="movie-card__description-wrap">
            <h2 class="movie-card__about">Описание</h2>
            <p class="movie-card__description">
                {{ description }}
            </p>
        </div>
        <div class="movie-card__footer-wrap">
            <span class="movie-card__rating">
                Рейтинг:
                {{  rating }}
            </span>
            <span class="movie-card__year">
                Дата выхода:
                {{ year }}
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import UiButton from "./UI/UiButton.vue";
import {defineComponent} from "vue";
import { buttons } from "@/constants";
import {mapActions, mapGetters} from "vuex";

interface State {
  buttons: {
    LEFT_BTN: string;
    RIGHT_BTN: string;
  }
}

export default defineComponent({
  components: {
    UiButton,
  },
  name: 'MovieCard',
  data(): State {
    return {
      buttons
    }
  },
  async created() {
    await this.fetchMovieById(this.$route.params.id)
  },
  computed: {
    ...mapGetters(["getMovie"]),

    movie() {
      console.log(this.getMovie)
      return this.getMovie
    },
    description() {
      return this.movie.description ?
          this.movie.description :
          "** Описание отсутствует **"
    },
    nameRu() {
      return this.movie.nameRu ?
          this.movie.nameRu :
          "** Название отсутствует **"
    },
    rating() {
      return this.movie.ratingKinopoisk ?
          this.movie.ratingKinopoisk :
          "** Рейтинг отсутствует **"
    },
    year() {
      return this.movie.year ?
          this.movie.year :
          "** Год отсутствует **"
    },
  },
  methods: {
    ...mapActions(["fetchMovieById"]),

    comeBack() {
      this.$router.push({ name: 'MoviesList', params: { page: `${localStorage.page}` }})
    }
  }
})

</script>

<style scoped>
.movie-card__container {
    background-color: #939ea1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.movie-card__btn {
    position: fixed;
    left: 10px;
    top: 30px;
}
.movie-card__title {
    height: 100px;
    display: flex;
    align-items: center;
    max-width: 950px;
    margin: 30px 0 0 0;
}

.movie-card__description-wrap {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.movie-card__description {
    display: flex;
    text-align: left;
    margin: 0 0 20px 0;
    background-color: white;
    padding: 20px;
    border-radius: 12px;
}

.movie-card__footer-wrap {
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
