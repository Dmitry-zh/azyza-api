import express from 'express'
import config from '../config/default'
import bodyParser from 'body-parser'
import cors from 'cors'

import api from './routes'
import auth from './middleware/listeners/auth'
import { db } from './core/db/dbConnector'
import syncModels from './models/Models'

const app = express()
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(cors())
const port = config.app.port || process.env.PORT

const router = express.Router()
app.use(router)
app.use(auth)
app.use('/api', api)

app.listen(config.app.port, () => {
  console.log(`Server started at http://localhost:${ port }`)
})

// connecting to db
db.sync({ force: false })
  .then((resp) => {
    console.log(`Connected to database at http://${resp.config.host}:${resp.config.port}`)
    syncModels()
  })
  .catch((e) => {
    console.error(`WARNING! Database connection error: \n ${e.message}`)
  })
