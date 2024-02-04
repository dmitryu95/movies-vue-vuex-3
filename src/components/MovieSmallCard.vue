<template>
  <div class="movie__card-small"
       v-show="movie.nameRu !== null">
    <div class="card__small--wrap"
        @click="handleClick"
        :id="movie.kinopoiskId">
        <div class="card-image-small-wrap">
            <img class="card-image-small"
                :src="movie.posterUrl" alt="image">
        </div>
        <p class="card-small-title">
            {{ movie.nameRu }}
        </p>
        <div class="card-small-rating">
            <span class="card-rating">{{ movie.ratingKinopoisk }}</span>
            <span class="card-year">{{ movie.year }}</span>
        </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'movie-small-card',
        props: {
            movie: {
              required: true
            }
        },
    }    
</script>

<style>
.card {
  &__small--wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
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

.movie__card-small {
    transform: scale(1.5);
    transition: 1s;
}

.card-image-small-wrap {
    display: flex;
    justify-content: center;
}

.card-image-small {
    height: 280px;
    margin-top: 10px;
}

.card-small-title {
    margin: 10px 20px;
}

.card-small-rating {
    display: flex;
    justify-content: space-between;
    margin: 10px 25px;
}

</style>

