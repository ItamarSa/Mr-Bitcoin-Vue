<template>
    <h1>Contact Details</h1>
    <section v-if="contact" class="contact-details">
        <div>
            <h2>{{ contact.name }}</h2>
            <p>{{ contact.email }}</p>
            <p>{{ contact.phone }}</p>
            <p>${{ contact.balance }}</p>
        </div>
        <img class="photo" v-bind:src="imgUrl()" alt="user-img">
        <RouterLink to="/contact">
            <button>Back</button>
        </RouterLink>
    </section>
    <img v-else src="../assets/puff.svg" alt="" class="loader">
</template>

<script>
import { contactService } from '../services/contact.service';

export default {
    data() {
        return {
            contact: null,
        }
    },
    methods: {
        imgUrl() {
            return `https://robohash.org/${this.contact._id}?set=set5`
        }
    },
    async created() {
        const contactId = this.$route.params.contactId
        this.contact = await contactService.get(contactId)
    }
}
</script>

<style lang="scss">
.contact-details {
    display: flex-wrap;
    background-color: rgb(252, 215, 147);

    .photo {
        width: 100px;
    }

    a {
        justify-self: end;
    }
}
</style>