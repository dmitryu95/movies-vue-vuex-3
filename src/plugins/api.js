import api from '../services/index'

export default {
    install: (app) => {
        app.config.globalProperties.$api = api;
    }
}