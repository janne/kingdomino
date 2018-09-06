import express from 'express'
import getBoard from './getBoard'
import getPoints from './getPoints'
import isValid from './isValid'

const app = express()

app.get('/', (req, res) => res.send('Hello, World!'))

app.listen(3001, () => console.log('Server running at http://localhost:3001/'))
