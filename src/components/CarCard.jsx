import CarImage from './CarImage.jsx'
import { carTitle, formatMileage, formatPrice } from '../utils/format.js'

export default function CarCard({ car }) {
  return (
    <a className="car-card" href={`#/cars/${car.id}`}>
      <CarImage body={car.body} color={car.color} />
      <div className="car-card-body">
        <div className="car-card-title">
          <h3>{carTitle(car)}</h3>
          <span className="year">{car.year}</span>
        </div>
        <p className="price">{formatPrice(car.price)}</p>
        <ul className="chips">
          <li>{formatMileage(car.mileage)}</li>
          <li>{car.fuel}</li>
          <li>{car.transmission}</li>
        </ul>
        <p className="city">📍 {car.city}</p>
      </div>
    </a>
  )
}
