import { useEffect, useState } from 'react'

function parse(hash) {
  const path = hash.replace(/^#/, '') || '/'
  const carMatch = path.match(/^\/cars\/(\d+)$/)
  if (path === '/') return { name: 'catalog' }
  if (carMatch) return { name: 'car', id: Number(carMatch[1]) }
  if (path === '/sell') return { name: 'sell' }
  return { name: 'not-found' }
}

export function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return parse(hash)
}

export function navigate(path) {
  window.location.hash = path
}
