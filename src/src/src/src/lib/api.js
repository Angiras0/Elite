const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'

export async function submitApplication(fields) {
  const res = await fetch(`${BACKEND_URL}/api/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fields),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || 'Submission failed. Please try again.')
  }

  return data
}

export async function getSpots() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/spots`)
    if (!res.ok) return { remaining: 16, total: 100 }
    return await res.json()
  } catch {
    return { remaining: 16, total: 100 }
  }
}
