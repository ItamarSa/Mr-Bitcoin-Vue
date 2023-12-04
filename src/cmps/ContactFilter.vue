<template>
    <section class="filter">
        <input @input="onSetFilterBy" v-model="filterBy.txt" placeholder="Search" type="text">
    </section>
</template>

<script>
export default {
    data() {
        return {
            filterBy: { txt: '' }
        }
    },
    methods: {
        onSetFilterBy() {
            this.$emit('filter', this.filterBy)
        }
    }
}
</script>

<style lang="scss">
.filter {
    padding: 10px;
    // border: 1px solid #4d6478;
    border-radius: 5px;
    font-size: 16px;
    width: 200px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>