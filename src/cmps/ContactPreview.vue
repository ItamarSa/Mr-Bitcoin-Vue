<template>
    <article class="contact-preview">
        <div class="contact-details">
            <h2>{{contact.name}}</h2>
        </div>
        <img class="contact-img" v-bind:src="imgUrl()" alt="user-img">
    </article>
</template>

<script>
export default {
    props: {
        contact: {
            type: Object,
            required: true,
        }
    },
    methods:{
        imgUrl() {
            return `https://robohash.org/${this.contact._id}?set=set5`
        }
    }
}
</script>

<style lang="scss">
.contact-preview{
    display: flex;
    align-items: center;
 
    .contact-img{
        width: 80px;
    }
}


</style>