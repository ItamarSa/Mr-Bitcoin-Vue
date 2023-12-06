<template>
	<main class="main-home">
		<div class="home-page" v-if="!loading">
			<section class="bit-gif">
				<img src="../assets/imgs/bit-gif.gif" alt="">
			</section>
			<section class="info">
				<img v-bind:src="imgUrl()" alt="" class="user-img">
				<div class="coin">
					<p><strong>Hello</strong> {{ user ? user.name : 'guest' }} 😊</p>
				</div>
				<div class="coin">
					<img class="btc-img" src="../assets/imgs/coins.png" alt="">
					<p> <strong>Balance</strong> ${{ balance }}</p>
				</div>
				<div class="coin">
					<img class="btc-img" src="../assets/imgs/bitcoin.png" alt="">
					<p> <strong>Balance Rate</strong> {{ rate }} <small>BTC</small></p>
				</div>
				<div v-if="user.transactions && user.transactions.length > 0">
					<transactions-list :transactions="slicedTransactions"></transactions-list>
				</div>
			</section>
		</div>
		<div v-else>
			<img src="../assets/puff.svg" alt="" class="loader">
		</div>
	</main>
</template>

<script>
import { userService } from '../services/user.service'
import { bitcoinService } from '../services/bitcoin.service'
import TransactionsList from '../cmps/TransactionList.vue'

export default {
	data() {
		return {
			balance: 0,
			rate: 0,
			user: null,
			loading: true,
			transactions: [],
		}
	},
	async created() {
		this.users = await userService.query()
		console.log('users:', this.users)
		this.user = await userService.getLoggedInUserFromStorage()
		this.getUserCoins()
		this.getTransactions()
		this.sliceList()
	},
	methods: {
		async getUserCoins() {
			try {
				this.user = await userService.getLoggedInUserFromStorage()
				this.balance = this.user.balance
				this.rate = await bitcoinService.getRate(this.balance)

				this.loading = false
			} catch (err) {
				console.error('Error fetching user coins or rate:', err)
				this.loading = false
			}
		},
		imgUrl() {
			return `https://robohash.org/${this.user._id}?set=set5`
		},
		getTransactions() {
			if (this.user && this.user.transactions) {
				this.transactions = this.user.transactions
			}
		},
		sliceList() {
			return this.transactions.slice(0, 3)
		}
	},
	computed: {
		slicedTransactions() {
			return this.sliceList()
		}
	},
	components: {
		TransactionsList,
	}
}
</script>

<style lang="scss">
.home-page {
	display: flex;
	align-items: center;

	.bit-gif {
		width: 50%;
		padding: 2em;
	}
}

.main-home {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 20px;

	&>* {
		margin-bottom: 20px;
	}

	.info {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		// border: 1px solid black;
		padding: 25px;
		width: 50%;

		.user-img {
			width: 15em;
			// height: 100px;
		}

		p {
			font-size: 20px;
			margin-left: 10px;
			font-size: 18px;
			color: #333;
		}

		.coin {
			display: flex;
			align-items: center;


			.btc-img {
				height: 2em;
				width: 2em;
			}
		}
	}
}

@media (max-width: 600px) {
	.home-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-direction: column-reverse;

		.info{
			width: 100%;
			padding: 0;
		}
	}
}
</style>