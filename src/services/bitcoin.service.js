'use strict'

import axios from 'axios'

const KEY = 'bitcoinData'

export const bitcoinService = {
    async getRate(balance) {
        try {
            let data = localStorage.getItem(KEY,)
            if (data) {
                data = JSON.parse(data)
                if (data.rate) {
                    return data.rate
                }
            }

            const response = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${balance}`)
            localStorage.setItem(KEY, JSON.stringify({ ...data, rate: response.data }))
            return response.data
        } catch (error) {
            console.error('Error fetching exchange rates:', error)
            return null
        }
    },
    async getMarketPriceHistory() {
        try {
            let data = localStorage.getItem(KEY)
            if (data) {
                data = JSON.parse(data)
                if (data.marketPriceHistory) {
                    const first50Values = data.marketPriceHistory.values.slice(0, 50)
                    return { ...data.marketPriceHistory, values: first50Values }
                }
            }
            const response = await axios.get('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
            const first50Values = response.data.values.slice(0, 50)

            localStorage.setItem(KEY, JSON.stringify({ marketPriceHistory: response.data, values: first50Values }))
            return { ...response.data, values: first50Values }
        } catch (err) {
            console.error('Error fetching market price history:', err)
            return null
        }
    },
    async getAvgBlockSize() {
        try {
            let data = localStorage.getItem(KEY)
            if (data) {
                data = JSON.parse(data)
                if (data.avgBlockSize) {
                    const first50Values = data.avgBlockSize.values.slice(0, 50)
                    return { ...data.avgBlockSize, values: first50Values }
                }
            }

            const response = await axios.get('https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true')
            const first50Values = response.data.values.slice(0, 50)

            localStorage.setItem(KEY, JSON.stringify({ ...data, avgBlockSize: { ...response.data, values: first50Values } }))
            return { ...response.data, values: first50Values }
        } catch (error) {
            console.error('Error fetching average block size:', error)
            return null
        }
    },
}