import express from 'express'
import R from 'ramda'
import bodyParser from 'body-parser'
import Client from './clients/redis'
import init from './commands/init'
import validate from './commands/validate'

const app = express()
app.use(bodyParser.json())

const resources = { client: new Client() }

const api = new express.Router()

api.get('/init', init(resources))

api.post('/validate', validate(resources))

app.use('/api', api)

app.listen(3001, () => console.log('Server running at http://localhost:3001/'))
