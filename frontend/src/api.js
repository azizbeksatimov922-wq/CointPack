const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV
    ? '/api'
    : 'https://secure-smile-production-d61f.up.railway.app/api')
).replace(/\/+$/, '')

function getErrorMessage(payload, fallback) {
  if (typeof payload === 'string' && payload) return payload
  if (payload?.detail) return payload.detail
  if (payload?.error) return payload.error

  if (payload && typeof payload === 'object') {
    const firstError = Object.values(payload).flat()[0]
    if (typeof firstError === 'string') return firstError
  }

  return fallback
}

export async function api(path, { body, ...options } = {}) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_BASE_URL}/${path.replace(/^\/+/, '')}`, {
    ...options,
    headers: {
      ...(body !== undefined && { 'Content-Type': 'application/json' }),
      ...(token && { Authorization: `Token ${token}` }),
      ...options.headers,
    },
    ...(body !== undefined && { body: JSON.stringify(body) }),
  })

  const responseText = await response.text()
  let payload = null

  if (responseText) {
    try {
      payload = JSON.parse(responseText)
    } catch {
      if (response.ok) {
        throw new Error('Backend JSON formatida javob qaytarmadi.')
      }
      payload = responseText
    }
  }

  if (!response.ok) {
    throw new Error(
      getErrorMessage(payload, `Server xatoligi (${response.status}).`),
    )
  }

  return payload
}
