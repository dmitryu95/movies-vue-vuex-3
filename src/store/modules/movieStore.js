import api from "../../services/index.js";
import instance from "../../services/instance.js";
import router from "../../routers/router.js";

export default {
    state: {    // Состояния 
        page: '1',
        maxPage: '',
        response: '',
        movies: [],
        btnLeft: '/assets/left-arrow.png',
        btnRight: '/assets/right-arrow.png',
        movieId: 0,
        movie: {}
    },
    mutations: {    
        setMovieList(state, movieList) {
            state.movies = movieList
            console.log(state.movies)
        },
        setMaxPage(state, maxPage) {
            console.log('totalPages', state.maxPage)
            state.maxPage = maxPage
        },
        setMovie(state, movie) {
            console.log('222', movie)
            state.movie = movie
        },
    }, 
    actions: {  // Для вызова мутаций -> записи списка фильмов (асинхронный запуск)
        getMovies({ commit }, key) {
            instance.defaults.headers.common['X-API-KEY'] = key;
            api.getAllMovies(localStorage.page || 1).then((response) => {
                localStorage.authKey = key
                if(response.data.items) { commit('setMovieList', response.data.items) }
                if(response.data.totalPages) { commit('setMaxPage', response.data.totalPages) }
                if(response.data) { commit('setMovie', response.data) }
                router.push({ name: 'MoviesList', params: { page: `${localStorage.page}` }})
            }).catch((err) => {
                alert(`ошибка : ${err.response}`)
            })
        },

        getMovie({ commit }, movieId) {
            instance.defaults.headers.common['X-API-KEY'] = localStorage.authKey;
            api.getMovie(movieId).then( movie => {
              commit('setMovie', movie.data)
            }). catch( err => console.log(`${err}`))
        }
    },
    getters: {  // Используется для активного возврата (аналог наблюдателя), для перезаписывания 
        allMovies(state) {
            return state.movies
        },
        getMovie(state) {
            return state.movie
        },
        getMaxPage(state) {
            return state.maxPage
        }
    } 
}