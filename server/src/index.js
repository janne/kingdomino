import express from 'express'
import R from 'ramda'
import bodyParser from 'body-parser'
import getBoard from './getBoard'
import getPoints from './getPoints'
import stack from './stack'
import Client from './clients/redis'

const app = express()
app.use(bodyParser.json())

const gameState = {
  placements: [
    { x: 1, y: 0, dir: 1, domino: stack[1] },
    { x: -2, y: 0, dir: 0, domino: stack[0] }
  ],
  deck: stack.slice(3),
  picked: stack[4]
}

const api = new express.Router()

api.get('/init', (req, res) => {
  const client = new Client()
  client.set(gameState)
  res.json(R.pick(['placements', 'picked'], gameState))
})

api.post('/validate', (req, res) => {
  const pos = R.map(parseInt, R.pick(['x', 'y', 'dir'], req.body))

  const { placements, picked } = gameState
  const placement = { ...pos, domino: picked }
  const ok = getBoard([...placements, placement]) !== null
  res.send({ ok })
})

app.use('/api', api)

app.listen(3001, () => console.log('Server running at http://localhost:3001/'))
