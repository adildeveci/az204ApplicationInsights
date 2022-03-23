const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')
const appIns = require('applicationinsights')

appIns.setup()
    .setSendLiveMetrics(true)
    .start()

const app = express()
app.use(bodyParser.json())

app.get('/api/event', async (req, res) => {
    const telemetry = appIns.defaultClient
    telemetry.trackEvent({
        name: "Some Event",
        properties: {
            userCount: 1000,
            orderCount: 90
        }
    })
    res.send('bir event oluştu')
})

app.get('/api/fail', async (req, res) => {
    const telemetry = appIns.defaultClient
    telemetry.trackException({
        exception: new Error('Bir önemli hata oluştu!')
    })
    res.send('bir exception oluştu')
})

app.get('/api/metric', async (req, res) => {
    const telemetry = appIns.defaultClient
    telemetry.trackMetric({
        name: 'login_count',
        value: 100
    })
    res.send('bir metric oluştu')
})

app.listen(8080, () => {
    console.log('app server is running')
})