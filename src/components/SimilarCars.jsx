import { useEffect, useState } from 'react'
import { getCars } from '../api/carsApi.js'
import CarCard from './CarCard.jsx'

// Other listings of the same make. Its own request, its own loading state.
export default function SimilarCars({ make, excludeId }) {
  const [cars, setCars] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    getCars({ make, sort: 'price-asc', pageSize: 5 }, { signal: controller.signal })
      .then((data) => setCars(data.items.filter((c) => c.id !== excludeId).slice(0, 4)))
      .catch((error) => {
        if (error.name !== 'AbortError') setCars([]) // not critical, just hide the block
      })
    return () => controller.abort()
  }, [make, excludeId])

  if (cars === null) return <p className="muted">Loading similar cars…</p>
  if (cars.length === 0) return null

  return (
    <section className="similar">
      <h2>More {make}</h2>
      <div className="grid">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  )
}
