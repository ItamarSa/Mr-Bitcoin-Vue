import axios from 'axios'
const KEY = 'bitcoinData'
export const bitcoinService = {
    async getRate() {
        try {
            let data = localStorage.getItem(KEY)
            if (data) {
                return JSON.parse(data).rate
            } else {
                const response = await axios.get('https://blockchain.info/tobtc?currency=USD&value=1')
                localStorage.setItem(KEY, JSON.stringify({ rate: response.data }))
                return response.data
            }
        } catch (error) {
            console.error('Error fetching exchange rates:', error)
            return null
        }
    },
    async getMarketPriceHistory() {
        try {
            let data = localStorage.getItem(KEY)
            if (data) {
                return JSON.parse(data).marketPriceHistory
            } else {
                const response = await axios.get('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
                localStorage.setItem(KEY, JSON.stringify({ marketPriceHistory: response.data }))
                return response.data
            }
        } catch (error) {
            console.error('Error fetching market price history:', error)
            return null
        }
    },
    async getAvgBlockSize() {
        try {
            let data = localStorage.getItem(KEY)
            if (data) {
                return JSON.parse(data).avgBlockSize
            } else {
                const response = await axios.get('https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true')
                localStorage.setItem(KEY, JSON.stringify({ avgBlockSize: response.data }))
                return response.data
            }
        } catch (error) {
            console.error('Error fetching average block size:', error)
            return null
        }
    },
}