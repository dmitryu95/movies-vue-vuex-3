interface State {
    key: string;
    statusAuth: boolean
}
export default {
    state(): State {
        return {
            key: '',
            statusAuth: false,
        }
    },
    mutations: {
        setKey(state: State, key: string): void {
            state.key = key
            console.log(`ключ в сторе: ${state.key}`)
        },
        setStatusAuth(state: State, status: number | string | any): void {
            state.statusAuth = status
            console.log(`Авторизация - ${state.statusAuth}`)
        }
    },
    actions: {
        getKey({commit} : { commit: Function }, key: string): void {
            if (key !== '') {
                commit('setKey', key)
            } else alert("Введите корректный ключ!")
        },
        getStatusAuth({commit} : { commit: Function }, status: string | number): void {
            commit('setStatusAuth', status === 200)
        }
    },
}