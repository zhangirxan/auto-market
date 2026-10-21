const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
const number = new Intl.NumberFormat('en-US')

export const formatPrice = (value) => money.format(value)
export const formatMileage = (km) => `${number.format(km)} km`
export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

export const carTitle = (car) => `${car.make} ${car.model}`
