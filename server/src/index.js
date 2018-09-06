import express from 'express'
import bodyParser from 'body-parser'
import getBoard from './getBoard'
import getPoints from './getPoints'
import isValid from './isValid'

const app = express()
app.use(bodyParser.urlencoded())

const api = new express.Router()

app.use('/api', api)

app.listen(3001, () => console.log('Server running at http://localhost:3001/'))
