import api from "../../services/index.js";
import instance from "../../services/instance.js";
import router from "../../routers/router.js";

interface Interface {
    state: {
        maxPage: number,
        response: string,
        movies: any,
        btnLeft: string,
        btnRight: string,
        movieId: number,
        movie: object | any,
        totalPages: number
    }
}
export default {
    state: {    // Состояния
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
            state.maxPage = maxPage
        },
        setMovie(state: Interface['state'], movie: object): void {
            state.movie = movie
        },
    },
    actions: {  // Для вызова мутаций -> записи списка фильмов (асинхронный запуск)
        fetchMovies({ commit }: { commit: Function }, key: string): void {
            if(!key.trim()) {
                alert("Введите ключ!")
            } else {
                key.trim()
                instance.defaults.headers.common['X-API-KEY'] = key.trim();

                api.fetchMovies(localStorage.page || 1)
                    .then((response) => {
                        localStorage.authKey = key
                        commit('setMovieList', response.data?.items)
                        if(response.data.totalPages) {
                            commit('setMaxPage', response.data.totalPages)
                        } else {
                            console.log("totalPages are undefined")
                            commit('setMaxPage', 2)
                        }
                        router.push({ name: 'MoviesList', params: { page: `${localStorage.page}` }})
                    })
                    .catch((err) => {
                        err.response.status == 401 ?
                        alert(`Error : Попробуйте другой ключ`) :
                        console.log(`Error : ${err.response.data.message}`)
                    })
            }
        },

        fetchMovieById({ commit }: { commit: Function }, movieId: number): void {
            instance.defaults.headers.common['X-API-KEY'] = localStorage.authKey;

            api.fetchMovieById(movieId)
                .then( movie => commit('setMovie', movie.data))
                .catch( err => {
                    router.push({name: 'not-found-page'})
                    console.log(`${err}`)
                })
        }
    },
    getters: {  // Используется для активного возврата (аналог наблюдателя), для перезаписывания
        getMovies(state: Interface['state']) {
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
