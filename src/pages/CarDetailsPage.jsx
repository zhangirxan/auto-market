import { useEffect, useState } from 'react'
import { deleteCar, getCar } from '../api/carsApi.js'
import CarImage from '../components/CarImage.jsx'
import SimilarCars from '../components/SimilarCars.jsx'
import { ErrorState, Loader } from '../components/StatusView.jsx'
import { carTitle, formatDate, formatMileage, formatPrice } from '../utils/format.js'

export default function CarDetailsPage({ id, onDeleted }) {
  const [car, setCar] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    setStatus('loading')

    getCar(id, { signal: controller.signal })
      .then((data) => {
        setCar(data)
        setStatus('success')
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err)
        setStatus('error')
      })

    return () => controller.abort()
  }, [id, reloadKey])

  async function handleDelete() {
    setDeleting(true)
    setDeleteError('')
    try {
      await deleteCar(id)
      onDeleted(car)
    } catch (err) {
      setDeleteError(err.message)
      setDeleting(false)
    }
  }

  if (status === 'loading') return <Loader text="Loading listing…" />

  if (status === 'error') {
    return (
      <div className="details-page">
        <a href="#/" className="back">← Back to catalog</a>
        <ErrorState
          message={error.message}
          onRetry={error.status === 404 ? null : () => setReloadKey((k) => k + 1)}
        />
      </div>
    )
  }

  const specs = [
    ['Year', car.year],
    ['Mileage', formatMileage(car.mileage)],
    ['Body', car.body],
    ['Fuel', car.fuel],
    ['Transmission', car.transmission],
    ['Power', `${car.horsepower} hp`],
    ['Color', car.color],
    ['City', car.city],
    ['Listed', formatDate(car.createdAt)],
  ]

  return (
    <div className="details-page">
      <a href="#/" className="back">← Back to catalog</a>

      <article className="details">
        <CarImage
          photo={car.photoLarge ?? car.photo}
          body={car.body}
          color={car.color}
          alt={carTitle(car)}
          className="large"
        />

        <div className="details-info">
          <h1>{carTitle(car)} <span className="year">{car.year}</span></h1>
          <p className="price big">{formatPrice(car.price)}</p>

          <dl className="specs">
            {specs.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          {car.description && <p className="description">{car.description}</p>}

          <div className="details-actions">
            {!confirming ? (
              <button type="button" className="btn danger-outline" onClick={() => setConfirming(true)}>
                Remove listing
              </button>
            ) : (
              <div className="confirm">
                <span>Remove this listing?</span>
                <button type="button" className="btn danger" onClick={handleDelete} disabled={deleting}>
                  {deleting ? 'Removing…' : 'Yes, remove'}
                </button>
                <button type="button" className="btn ghost" onClick={() => setConfirming(false)} disabled={deleting}>
                  Cancel
                </button>
              </div>
            )}
            {deleteError && <p className="form-error">{deleteError}</p>}
          </div>
        </div>
      </article>

      <SimilarCars make={car.make} excludeId={car.id} />
    </div>
  )
}
