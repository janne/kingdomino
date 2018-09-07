import Redis from 'ioredis'

class Client {
  constructor() {
    this.client = new Redis()
  }

  get() {
    return this.client.get('world')
  }

  set(world) {
    this.client.set('world', world)
  }
}

export default Client
