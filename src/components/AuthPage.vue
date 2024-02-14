<template>
  <div class="auth-container">
    <h1>Введите ваш ключ</h1>
    <input type="text"
           v-model="key"
           class="auth-key">
    <button type="button"
            class="button"
            @click="sendRequest">Войти
    </button>
  </div>
</template>

<script lang="ts">
import {mapActions} from 'vuex'
import {defineComponent} from "vue";

interface State {
  key: string;
  page: number;
}

export default defineComponent({
  name: 'auth-page',
  data(): State {
    return {
      key: '',
      page: 1
    }
  },
  mounted() {
    this.key = localStorage.authKey || '';
    localStorage.page = this.page
  },
  methods: {
    ...mapActions(['getMovies']),

    sendRequest() {
      this.getMovies(this.key, this.page);
    },
  }
})
</script>

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-top: 300px;
}

.auth-key {
  height: 40px;
  width: 350px;
  border: 4px solid #88b3f7;
  border-radius: 12px;
  font-size: 20px;
  padding: 0px 5px;
  font-family: 'Times New Roman', Times, serif;
  text-align: center;
}

.auth-key:focus {
  outline: none;
}

.button {
  width: 100%;
  margin-top: 50px;
}
</style>