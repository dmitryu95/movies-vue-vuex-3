import { createStore } from 'vuex'
import auth from './modules/auth'
import moviesStore from './modules/movieStore'

export const store = createStore({
  modules: {
    auth,
    moviesStore
  }
})