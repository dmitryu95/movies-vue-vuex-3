<template>
  <button class="btn-container"
    @click="handleClick">
    <img class="btn-image"
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
  },
  emits: 'handleBtnClick'
})

</script>

<style scoped>
.btn-container {
  margin: 0 20px;
}
.btn-image {
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
