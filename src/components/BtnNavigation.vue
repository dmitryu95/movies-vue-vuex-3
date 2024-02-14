<template>
    <button class="btn-container"
        @click="comeBack">
        <img class="btn-image"
           :src='image'
           alt="btn navigation"
           height="40px">
    </button>
</template>

<script>
export default {
  name: 'btn-navigation',
  props: {
      image: String,
  },
  methods: {
      comeBack() {
        this.$router.push({ name: 'MoviesList', params: { page: `${localStorage.page}` }})
      }
  },
}

</script>

<style scoped>
.btn-container {
  margin: 0 20px;
}
.btn-image {
  padding: 0;
}

.btn-image {
  background-image: url("/src/assets/arrow-left.svg");
}

button {
  outline: none;
  background-color: #cccccc;
  border-color: #cccccc;
  opacity: 0.7;
  padding: 0 10px;
}

button:hover{
  opacity: 1;
}

</style>