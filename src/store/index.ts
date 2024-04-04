import { createStore } from 'vuex'
import moviesStore from './modules/movieStore'

export const store = createStore({
  modules: {
    moviesStore
  }
})
