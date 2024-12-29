import type { IgdbItem } from '../types'
import { errorMessages } from './errors'

async function queryIGDB(query: string): Promise<IgdbItem[]> {
  if (query === '') {
    return []
  }

  const encodedQuery = encodeURIComponent(query)

  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/igdb/search/${encodedQuery}`)

  if (!res) {
    throw new Error(errorMessages.NoConnection)
  }

  if (res.status !== 200) {
    throw new Error(errorMessages.BadStatusCode)
  }

  return await res.json()
}

export default queryIGDB
