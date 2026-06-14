import { readFileSync, writeFileSync, renameSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, '..', 'data')

function ensureDir() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })
}

function read(name) {
  ensureDir()
  const path = join(DATA_DIR, `${name}.json`)
  if (!existsSync(path)) return []
  try { return JSON.parse(readFileSync(path, 'utf-8')) } catch (e) { console.error(`Corrupt ${name}.json, returning []`); return [] }
}

function write(name, data) {
  ensureDir()
  const path = join(DATA_DIR, `${name}.json`)
  const tmp = path + '.tmp'
  writeFileSync(tmp, JSON.stringify(data, null, 2))
  renameSync(tmp, path)
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

export function updateUser(id, updates) {
  const users = getUsers()
  const idx = users.findIndex((u) => u.id === id)
  if (idx === -1) return null
  users[idx] = { ...users[idx], ...updates }
  write('users', users)
  return users[idx]
}

export function getOrders() {
  return read('orders')
}

export function addOrder(order) {
  const orders = getOrders()
  orders.push({ ...order, status: 'pending' })
  write('orders', orders)
  return order
}

export function updateOrderStatus(id, status) {
  const orders = getOrders()
  const idx = orders.findIndex((o) => o.id === id)
  if (idx === -1) return null
  orders[idx].status = status
  orders[idx].updatedAt = new Date().toISOString()
  write('orders', orders)
  return orders[idx]
}
