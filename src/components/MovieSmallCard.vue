<template>
  <div class="movie__card-small"
       v-show="movie.nameRu !== null">
    <div class="card__small-wrap"
        @click="handleClick"
        :id="movie.kinopoiskId">
        <div class="card__image-small-wrap">
            <img class="card__image-small"
                :src="movie.posterUrl" alt="image">
        </div>
        <p class="card__small-title">
            {{ movie.nameRu }}
        </p>
        <div class="card__small-rating">
            <span class="card__rating">{{ movie.ratingKinopoisk }}</span>
            <span class="card__year">{{ movie.year }}</span>
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
.card__small-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.movie__card-small {
    width: 300px;
    height: 400px;
    margin: 10px;
    display: flex;
    justify-content: center;
    background-color: #ada7a6;
    border-radius: 10px;
    cursor: pointer;
}

.movie__card-small:hover {
    transform: scale(1.1);
    transition: 1s;
}

.card__image-small-wrap {
    display: flex;
    justify-content: center;
}

.card__image-small {
    height: 280px;
    margin-top: 10px;
}

.card__small-title {
    margin: 10px 20px;
}

.card__small-rating {
    display: flex;
    justify-content: space-between;
    margin: 10px 25px;
}

</style>

