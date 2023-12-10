<template>
    <div class="container">
        <Bar v-if="loaded.marketPrice" class="bar" :data="chartData.marketPrice" :options="chartOptions" />
        <Line v-if="loaded.avgBlockSize" class="line" :data="chartData.avgBlockSize" :options="chartOptions" />

        <!-- <Pie v-if="loaded.pieChart" :data="chartData.pieChart" :options="chartOptions" /> -->
        <img v-else src="../assets/puff.svg" alt="" class="loader">
    </div>
</template>
  
<script>
import { Bar, Pie, Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, PointElement, CategoryScale, LinearScale, ArcElement, LineElement } from 'chart.js'
import { bitcoinService } from '../services/bitcoin.service'

ChartJS.register(Title, Tooltip, Legend, PointElement, BarElement, CategoryScale, LinearScale, LineElement, ArcElement)

export default {
    name: 'Charts',
    components: { Bar, Pie, Line },
    data() {
        return {
            loaded: {
                marketPrice: false,
                avgBlockSize: false,
                pieChart: false
            },
            chartData: {
                marketPrice: null,
                avgBlockSize: null,
                pieChart: null
            },
            chartOptions: {
                responsive: true
            }
        }
    },
    async mounted() {
        try {
            const marketPriceData = await bitcoinService.getMarketPriceHistory()
            this.chartData.marketPrice = this.processChartData(marketPriceData)
            this.loaded.marketPrice = true

            const avgBlockSizeData = await bitcoinService.getAvgBlockSize()
            this.chartData.avgBlockSize = this.processLineChartData(avgBlockSizeData)
            this.loaded.avgBlockSize = true

            const pieChartData = await bitcoinService.getMarketPriceHistory()
            this.chartData.pieChart = this.processPieChartData(pieChartData)
            this.loaded.pieChart = true
        } catch (error) {
            console.error(error)
        }
    },
    methods: {
        processChartData(data) {
            const colorMap = {
                'Market Price (USD)': {
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)'
                },
                'Some Other Data': {
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)'
                }
            }
            const colorConfig = colorMap[data.name] || {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderColor: 'rgba(0, 0, 0, 1)'
            }
            return {
                labels: data.values.map(entry => new Date(entry.x * 1000).toLocaleDateString()),
                datasets: [
                    {
                        label: data.name,
                        backgroundColor: colorConfig.backgroundColor,
                        borderColor: colorConfig.borderColor,
                        borderWidth: 7,
                        data: data.values.map(entry => entry.y)
                    }
                ]
            }
        },
        processPieChartData(data) {
            return {
                labels: data.values.map(entry => new Date(entry.x * 1000).toLocaleDateString()),
                datasets: [
                    {
                        label: data.name,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)'
                        ],
                        borderWidth: 5,
                        data: data.values.map(entry => entry.y)
                    }
                ]
            }
        },
        processLineChartData(data) {
            const colorConfig = {
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)'
            }

            return {
                labels: data.values.map(entry => new Date(entry.x * 1000).toLocaleDateString()),
                datasets: [
                    {
                        label: data.name,
                        backgroundColor: colorConfig.backgroundColor,
                        borderColor: colorConfig.borderColor,
                        borderWidth: 3,
                        data: data.values.map(entry => entry.y)
                    }
                ]
            }
        },
    }
}
</script>
  
<style>
.container {
    display: flex;
    flex-direction: column;
    width: 700px;
    margin: 0 auto;
}

.bar {
    margin-top: 5em;
}

@media (max-width: 600px) {
    .container {
        width: 350px;
    }
}
</style>