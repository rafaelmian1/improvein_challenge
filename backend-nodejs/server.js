const express = require('express')
require('dotenv').config()
const cors = require('cors')

const router = require('./routes/index')
require('./config/database')
require('./config/passport')

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', router)

const PORT = process.env.PORT
const HOST = process.env.HOST || '0.0.0.0'

//Server listening
app.listen(PORT, HOST, () => console.log(`Server listening on port ${PORT} (${HOST})`))
