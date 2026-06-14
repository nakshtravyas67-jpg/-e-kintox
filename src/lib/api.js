const API = import.meta.env.VITE_API_URL || '/api'

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  const res = await fetch(`${API}${path}`, { ...options, headers, credentials: 'include' })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  patch: (path, body) => request(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: 'DELETE' }),
}
