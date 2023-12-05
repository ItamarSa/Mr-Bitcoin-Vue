<template>
    <section class="trans-container">
        <h2 class="trans-title">Your Transactions:</h2>
        <ul class="trans-list">
            <li class="trans" v-for="transaction in transactions" :key="transaction.AtTime">
                <p><b>To:</b> {{ transaction.to }}</p>
                <p><b>Coins:</b> {{ transaction.amount }}</p>
                <p><b>Date:</b> {{ formatDate(transaction.AtTime) }}</p>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    props: {
        transactions: {
            type: Array,
            required: true,
        }
    },

    created() {
        console.log('this.transactions', this.transactions);
    },
    methods: {
        formatDate(value) {
            const options = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            };
            const time = new Date(value);
            if (isNaN(time)) return value; // If it's an invalid date, return original value
            const formattedDateTime = time.toLocaleString('en-US', options);
            return formattedDateTime;
        },

    }
}
</script>

<style lang="scss">
.trans-container {
    text-align: center;
    border-top: 1px solid black;
    margin-top: 5px;

    .trans-title {
        margin: 0;

    }
    .trans-list {
        margin-top: 5px;

        .trans {
            display: flex;
            align-items: flex-start;
            width: 50vw;

        }
    }


}
</style>