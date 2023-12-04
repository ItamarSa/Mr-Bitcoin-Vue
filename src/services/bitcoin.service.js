'use strict'

import axios from 'axios'
const KEY = 'bitcoinData'
export const bitcoinService = {
    async getRate(balance) {
        try {
            let data = localStorage.getItem(KEY)
            if (data) {
                data = JSON.parse(data)
                if (data.rate){
                    return data.rate 
                }
            } 
                const response = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${balance}`)
            localStorage.setItem(KEY, JSON.stringify({ ...data, rate: response.data }))
            console.log('response.data:', response.data)
            return response.data
        } catch (err) {
            console.error('Error fetching exchange rates:', err)
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
        } catch (err) {
            console.error('Error fetching market price history:', err)
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
        } catch (err) {
            console.error('Error fetching average block size:', err)
            return null
        }
    },
}