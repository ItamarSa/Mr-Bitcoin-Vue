<template>
	<main class="container">
		<div class="info" v-if="!loading">
			<div class="coins">
				<img v-bind:src="imgUrl()" alt="" class="user-img">
				<p><b>Hello</b> {{ user ? user.name : 'guest' }} 😊</p>
			</div>
			<div class="coin">
				<img class="btc-img" src="../assets/imgs/coins.png" alt="">
				<p> <b>Your Balance</b> ${{ balance }}</p>
			</div>
			<div class="coin">
				<img class="btc-img" src="../assets/imgs/bitcoin.png" alt="">
				<p> <b>Your Balance Rate is</b> {{ rate }} <small>BTC</small></p>
			</div>
		</div>
		<div v-else>
			<img src="../assets/puff.svg" alt="" class="loader">
		</div>
	</main>
</template>

<script>
import { userService } from '../services/user.service'
import { bitcoinService } from '../services/bitcoin.service'

export default {
	data() {
		return {
			balance: 0,
			rate: 0,
			user: null,
			loading: true,
		}
	},
	async created() {
		this.users = await userService.query()
		console.log('users:', this.users)
		this.getUserCoins()
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
		}
	}
}
</script>

<style lang="scss">
.container {
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
		justify-content: center;
		border: 1px solid black;
		padding: 25px;

		.user-img {
			width: 100px;
			height: 100px;
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
</style>