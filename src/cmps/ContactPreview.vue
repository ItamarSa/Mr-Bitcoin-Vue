<template>
    <article class="contact-preview">
        <div class="contact-details">
            <h2>{{contact.name}}</h2>
            <p>{{contact.phone}}</p>
        </div>
        <img class="photo" v-bind:src="imgUrl()" alt="user-img">
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
    
    .contact-details{




        

    }

    img{
        width: 150px;

    }
}


</style>