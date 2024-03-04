import api from "../../services/index.js";
import instance from "../../services/instance.js";
import router from "../../routers/router.js";

interface Interface {
    state: {
        page: number,
        maxPage: number,
        response: string,
        movies: any,
        btnLeft: string,
        btnRight: string,
        movieId: number,
        movie: object | any
    }
}
export default {
    state: {    // Состояния
        page: 1,
        maxPage: 0,
        response: '',
        movies: [],
        btnLeft: '/assets/left-arrow.png',
        btnRight: '/assets/right-arrow.png',
        movieId: 0,
        movie: {}
    } as Interface['state'],

    mutations: {
        setMovieList(state: Interface['state'], movieList: object[]): void {
            state.movies = movieList
            console.log("movieList 1111111111", movieList)
        },
        setMaxPage(state: Interface['state'], maxPage: number): void {
            console.log('totalPages', state.maxPage)
            state.maxPage = maxPage
        },
        setMovie(state: Interface['state'], movie: object): void {
            console.log('222', movie)
            state.movie = movie
        },
    },
    actions: {  // Для вызова мутаций -> записи списка фильмов (асинхронный запуск)
        getMovies({ commit }: { commit: Function }, key: string): void {
            instance.defaults.headers.common['X-API-KEY'] = key;

            api.getAllMovies(localStorage.page || 1).then((response) => {
                localStorage.authKey = key
                if(response.data.items) { commit('setMovieList', response.data.items) }
                if(response.data.totalPages) { commit('setMaxPage', response.data.totalPages) }
                router.push({ name: 'MoviesList', params: { page: `${localStorage.page}` }})
            }).catch((err) => {
                alert(`ошибка : ${err.response}`)
            })
        },

        getMovie({ commit }: { commit: Function }, movieId: number): void {
            instance.defaults.headers.common['X-API-KEY'] = localStorage.authKey;

            api.getMovie(movieId).then( movie => {
              commit('setMovie', movie.data)
            }). catch( err => console.log(`${err}`))
        }
    },
    getters: {  // Используется для активного возврата (аналог наблюдателя), для перезаписывания
        allMovies(state: Interface['state']) {
            return state.movies
        },
        getMovie(state: Interface['state']) {
            return state.movie
        },
        getMaxPage(state: Interface['state']) {
            return state.maxPage
        }
    }
}
