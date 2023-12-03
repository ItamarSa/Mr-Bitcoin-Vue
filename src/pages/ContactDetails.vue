<template>
    <h1 class="details-head">Contact Details</h1>
    <section v-if="contact" class="contact-details">
        <div class="left">
            <img class="user-img" v-bind:src="imgUrl()" alt="user-img">
            <RouterLink to="/contact">
                <button>Back</button>
            </RouterLink>
        </div>
        <div class="right">
            <h2 class="name">{{ contact.name }}</h2>
            <p class="detail">{{ contact.email }}</p>
            <p class="detail">{{ contact.phone }}</p>
            <p class="detail">${{ contact.balance }}</p>
        </div>
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
.details-head {
    font-size: 2em;
    margin-bottom: 20px;
}

.contact-details {
    display: flex;
    // flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #34495e;
    /* Use the header's background color */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .left {
        display: flex;
        flex-direction: column;

        .user-img {
            width: 100px;
            margin-bottom: 10px;
        }
    }

    .name {
        font-size: 1.5em;
        margin: 10px 0;
        color: #fff
    }

    .detail {
        font-size: 1.3em;
        margin: 10px 0;
        color: #fff
    }

    button {
        padding: 10px 20px;
        font-size: 1em;
        background-color: #007bff;
        /* Use the header's button color */
        color: #fff;
        /* Set text color to white */
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #0056b3;
            /* Darken the button on hover */
        }
    }


}

.loader {
    width: 100px;
    height: 100px;
    margin: 50px auto;
    display: block;
}
</style>