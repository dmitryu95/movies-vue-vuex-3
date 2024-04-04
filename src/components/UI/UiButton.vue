<template>
  <button class="button"
    @click="handleClick">
    <img class="button__image"
         :src='imgPath'
         alt="btn page number"
         height="40px">
  </button>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'ui-button',
  props: {
    imgPath:
      {
        type: String,
        required: true,
      }
  },
  methods: {
    handleClick(event: MouseEvent) {
      this.$emit('handleBtnClick', event)
    }
  }
})

</script>

<style scoped>
.button {
  margin: 0 20px;
}
.button__image {
  padding: 0;
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
