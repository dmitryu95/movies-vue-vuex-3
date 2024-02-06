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
        setPageNumber(state, pageNumber) {
            state.page = pageNumber;
            console.log(`Number of page ${state.page}`);
        },
        setMaxPage(state, maxPage) {
            console.log('totalPages', state.maxPage)
            state.maxPage = maxPage
        },
        setMovie(state, movie) {
            console.log('222', movie)
            state.movie = movie
        },
        setResponse(state, response) {
            state.response = response
        }
    }, 
    actions: {  // Для вызова мутаций -> записи списка фильмов (асинхронный запуск)
        getNewPage({ commit }, pageNumber) {
            commit('setPageNumber', pageNumber)
        },
        async fetchApi({ commit }, response) {
            commit('setResponse', response)
            if(response.data.items) { commit('setMovieList', response.data.items) }
            if(response.data.totalPages) { commit('setMaxPage', response.data.totalPages) }
            if(response.data) { commit('setMovie', response.data) }
        },

        getMovies({ commit }, key) {
            instance.defaults.headers.common['X-API-KEY'] = key;
            api.getAllMovies(localStorage.page).then((response) => {
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
        getTotalPages(state) {
            return state.maxPage
        },
        getMovie(state) {
            return state.movie
        },
    } 
}