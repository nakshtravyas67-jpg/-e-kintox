import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, '..', 'data')

function ensureDir() {
  if (!existsSync(DATA_DIR)) {
    import('fs').then((fs) => fs.mkdirSync(DATA_DIR, { recursive: true }))
  }
}

function read(name) {
  ensureDir()
  const path = join(DATA_DIR, `${name}.json`)
  if (!existsSync(path)) return []
  try {
    return JSON.parse(readFileSync(path, 'utf-8'))
  } catch { return [] }
}

function write(name, data) {
  ensureDir()
  const path = join(DATA_DIR, `${name}.json`)
  writeFileSync(path, JSON.stringify(data, null, 2))
}

export function getUsers() {
  return read('users')
}

export function addUser(user) {
  const users = getUsers()
  users.push(user)
  write('users', users)
  return user
}

export function getOrders() {
  return read('orders')
}

export function addOrder(order) {
  const orders = getOrders()
  orders.push(order)
  write('orders', orders)
  return order
}
