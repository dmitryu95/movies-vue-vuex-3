<template>
    <button class="btn-container"
        @click="updatePage">
        <img class="btn-image"
            :src='image'
            alt="btn page number"
            height="40px">
    </button>
</template>

<script>
    export default {
        name: 'btn-page',
        props: {
            image: String,
            page: String || Number
        },
        methods: {
            updatePage() {
                this.$emit('update-page', this.page)
            }
        }
    }

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