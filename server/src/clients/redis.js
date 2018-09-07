import Redis from 'ioredis'

class Client {
  constructor() {
    this.client = new Redis()
  }

  getState() {
    return this.client.get('world').then(json => JSON.parse(json))
  }

  setState(state) {
    this.client.set('world', JSON.stringify(state))
  }
}

export default Client
