<template>
    <div class="container">
        <div class="list-container" 
            :class="{active: loading}">
              <movie-small-card
                  v-for='movie in allMovies'
                  :key="movie.kinopoiskId"
                  :movie = 'movie'
                  @click='openMoviePage(movie.kinopoiskId)'/>
        </div>
        <div v-show="!loading"
            class="buttons-container">
           <!-- Вынести в константу данные изображений из стора (путь) -->
            <btn-page
                @update-page="updatePage(-1)"
                :image = "$store.getters.getBtnLeft" 
                :page = "$store.getters.getNumberPage"/>
            <p class="count-page">
                {{ $store.getters.getNumberPage }}
            </p>
            <btn-page
                :class="{ active: isActive }"
                @update-page="updatePage(+1)"
                :image="$store.getters.getBtnRight" 
                :page = "$store.getters.getNumberPage"/>
        </div>
    </div>
</template>

<script>
import MovieSmallCard from './MovieSmallCard.vue';
import BtnPage from './BtnPage.vue';
import Loader from './Loader.vue';

export default {
    components: {
        MovieSmallCard,
        BtnPage,
        Loader
    },      
    name: 'movie-list-page',
    data() {
        return {
            loading: false,
            isActive: false,
        }
    },
    mounted() {
        console.log('номер')
        this.sendRequest()
    },
    computed: {
      // сделать через mapGetters (... хуе мае)
        allMovies() {
            return this.$store.getters.allMovies
        },
    },
    methods: {
      // Убрать async, т.к vue реактивный, сохранить в url номер страницы, при необходимости его забирать, убрать из store
        async updatePage(value) {
            const newPage = parseInt(this.$store.getters.getNumberPage) + value;
            if(this.$store.getters.getTotalPages < newPage) {
                console.log('Не ок', this.$store.getters.getTotalPage)
                this.isActive = true;
            } else {
                console.log('Все ок')
                this.$store.dispatch('getNewPage', newPage);
                await this.sendRequest()
                this.isActive = false;
            }
        },
        async sendRequest() {
            try {
                this.loading = true;
                const response = await this.$api.getAllMovies(this.$store.getters.getNumberPage);
                this.$store.dispatch('fetchApi', response)
                this.$store.dispatch('getStatusAuth', response);
                this.loading = false;
            } catch (error) {
                console.log('error', error)
                this.loading = false;
            }
        },
      // Захуя loading???
        async openMoviePage(page) {
            if(!this.loading) {
                console.log('Вышло', page)
                try {
                  // В stote не надо выностить лишнее, прото пушнишься, ебать с проверкой
                    const response = await this.$api.request.getMovie(page)
                    if(response.status === 200) {
                        console.log(`request: ${response.data}`)
                        this.$router.push({ name: 'card', params: { id: `${page}` }})
                        this.$store.dispatch('fetchApi', response)
                    }
                } catch(error) {
                    console.log(`${error}`)
                }
            }
        }
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