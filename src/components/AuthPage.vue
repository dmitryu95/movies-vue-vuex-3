<template>
  <div class="auth-page__form">
    <h1>Введите ваш ключ</h1>
    <input class="auth-page__input"
         type="text"
         v-model="key"
    >
    <button class="auth-page__button"
        type="button"
        @click="sendRequest">Войти
    </button>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import { defineComponent } from "vue";

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
    ...mapActions(['fetchMovies']),

    sendRequest() {
      this.fetchMovies(this.key);
    },
  }
})
</script>

<style scoped>
.auth-page__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-top: 300px;
}

.auth-page__input {
  height: 40px;
  width: 350px;
  border: 4px solid #88b3f7;
  border-radius: 12px;
  font-size: 20px;
  padding: 0px 5px;
  font-family: 'Times New Roman', Times, serif;
  text-align: center;
}

.auth-page__input:focus {
  outline: none;
}

.auth-page__button {
  width: 100%;
  margin-top: 50px;
}
</style>
