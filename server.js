const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const locationsRoutes = require('./routes/locations')

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(bodyParser.json({limit: '10000000mb'}))
app.use(logger('dev'))
app.use(express.json());

app.use('/api', locationsRoutes)




app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

