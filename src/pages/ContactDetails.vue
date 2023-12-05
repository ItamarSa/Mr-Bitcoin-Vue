<template>
    <h1 class="title">{{ contact.name }} Details</h1>
    <main v-if="contact"  class="main-details">

        <section class="contact-details">
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
            <div v-if="user.transactions && user.transactions.length > 0">
                <transaction-list :transactions="filteredTransactions"></transaction-list>
            </div>
    </main>
    <img v-else src="../assets/puff.svg" alt="" class="loader">
</template>

<script>
import { contactService } from '../services/contact.service'
import { userService } from '../services/user.service'

import TransactionList from '../cmps/TransactionList.vue'

export default {
    data() {
        return {
            contact: null,
            user: null,
            transactions: [],
        }
    },
    methods: {
        imgUrl() {
            return `https://robohash.org/${this.contact._id}?set=set5`
        },
        async getUser() {
            return  this.user = await userService.getLoggedInUserFromStorage()
        },
        getTransactions() {
            if (this.user && this.user.transactions) {
                this.transactions = this.user.transactions;
            }
        },
        getMyTransactions() {
            return this.filteredTransactions
        }
    },
    computed: {
        filteredTransactions() {
            return this.transactions.filter(transaction => transaction.to === this.contact.name);
        }
    },
    async created() {
        await this.getUser()
        const contactId = this.$route.params.contactId
        this.contact = await contactService.get(contactId)
        this.getTransactions()
        this.getMyTransactions()
        console.log('this.transactions', this.transactions)
    },
    components:{
        TransactionList,
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
    background-color: #4d6478;
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