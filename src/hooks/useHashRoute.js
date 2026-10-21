import { useEffect, useState } from 'react'

// Tiny hash router: #/ -> catalog, #/cars/12 -> details, #/sell -> form.
// Hash routing works on GitHub Pages without any server config.
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
    // cleanup: remove the listener when App unmounts
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return parse(hash)
}

export function navigate(path) {
  window.location.hash = path
}
