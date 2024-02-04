<template>
  <!-- вынести логуку запроса фильма в компонент -->
    <div class="movie-container">
        <div class="movie-image-wrap" style="margin-top: 30px;">
            <img :src=$store.getters.getMovie.posterUrl 
                :alt=$store.getters.getMovie.posterUrl
                height="800px">
        </div>
        <h1 class="movie-title">
            {{ $store.getters.getMovie.nameRu }}
        </h1>
        <div class="movie-description-wrap">
            <h2 class="movie-description-about">Описание</h2>
            <p class="movie-description">
                {{ $store.getters.getMovie.description }}
            </p>
        </div>
        <div class="movie-raiting_year-wrap">
            <span class="movie-raiting">
                Рейтинг: 
                {{  $store.getters.getMovie.ratingKinopoisk }}
            </span>
            <span class="movie-year">
                Дата выхода:
                {{ $store.getters.getMovie.year }}
            </span>
        </div>

    </div>
    
</template>

<script>
export default {
    name: 'MovieCard',
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