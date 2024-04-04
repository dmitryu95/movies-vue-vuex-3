<template>
  <div v-show="movie.nameRu"
      class="movie-small-card"
  >
    <div class="movie-small-card__wrap"
        :id="movie.kinopoiskId"
    >
        <div class="movie-small-card__image-wrap">
            <img class="movie-small-card__image"
                :src="movie.posterUrl"
                 alt="image"
            >
        </div>
        <p class="movie-small-card__title">
            {{ movie.nameRu }}
        </p>
        <div class="movie-small-card__rating-year-container">
            <span class="movie-small-card__rating">
              {{ movie.ratingKinopoisk }}
            </span>
            <span class="movie-small-card__year">
              {{ movie.year }}
            </span>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {Movie} from "@/types/Movie";
export default defineComponent({
    name: 'movie-small-card',
    props: {
        movie: {
          type: Object as PropType<Movie>,
          required: true
        }
    },
})

</script>

<style>
.movie-small-card {
    width: 300px;
    height: 400px;
    margin: 10px;
    display: flex;
    justify-content: center;
    background-color: #ada7a6;
    border-radius: 10px;
    cursor: pointer;
}

.movie-small-card__wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.movie-small-card__wrap:hover {
    transform: scale(1.1);
    transition: 1s;
}

.movie-small-card__image-wrap {
    display: flex;
    justify-content: center;
}

.movie-small-card__image {
    height: 280px;
    margin-top: 10px;
}

.movie-small-card__title {
    margin: 10px 20px;
}

.movie-small-card__rating-year-container {
    display: flex;
    justify-content: space-between;
    margin: 10px 25px;
}

</style>

