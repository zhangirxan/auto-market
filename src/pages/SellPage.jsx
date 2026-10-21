import { useState } from 'react'
import { createCar } from '../api/carsApi.js'
import { BODIES, CITIES, COLORS, FUELS, MAKES, TRANSMISSIONS } from '../api/seed.js'
import FormField from '../components/FormField.jsx'
import CarImage from '../components/CarImage.jsx'
import PhotoPicker from '../components/PhotoPicker.jsx'
import { formatMileage, formatPrice } from '../utils/format.js'

const EMPTY_FORM = {
  make: '', model: '', year: '', price: '', mileage: '', horsepower: '',
  body: 'Sedan', fuel: 'Petrol', transmission: 'Automatic', color: 'White', city: 'Almaty',
  description: '', photo: '',
}

const MAX_YEAR = new Date().getFullYear() + 1

function validate(form) {
  const errors = {}
  const num = (v) => Number(v)
  if (!form.make) errors.make = 'Choose a make'
  if (!form.model.trim()) errors.model = 'Enter the model'
  else if (form.model.trim().length > 30) errors.model = 'Max 30 characters'
  if (!form.year) errors.year = 'Enter the year'
  else if (num(form.year) < 1980 || num(form.year) > MAX_YEAR) errors.year = `Between 1980 and ${MAX_YEAR}`
  if (!form.price) errors.price = 'Enter the price'
  else if (num(form.price) < 500 || num(form.price) > 1000000) errors.price = 'Between $500 and $1,000,000'
  if (form.mileage === '') errors.mileage = 'Enter the mileage'
  else if (num(form.mileage) < 0 || num(form.mileage) > 1000000) errors.mileage = 'Between 0 and 1,000,000 km'
  if (!form.horsepower) errors.horsepower = 'Enter engine power'
  else if (num(form.horsepower) < 40 || num(form.horsepower) > 1500) errors.horsepower = 'Between 40 and 1500 hp'
  if (form.description.length > 500) errors.description = 'Max 500 characters'
  return errors
}

export default function SellPage({ onCreated }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  const errors = validate(form)
  const shownErrors = submitted ? errors : {}

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handlePhoto(photo) {
    setForm((prev) => ({ ...prev, photo }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length > 0) return

    setSaving(true)
    setSaveError('')
    try {
      const car = await createCar({
        ...form,
        model: form.model.trim(),
        description: form.description.trim(),
        year: Number(form.year),
        price: Number(form.price),
        mileage: Number(form.mileage),
        horsepower: Number(form.horsepower),
        photo: form.photo || null,
        photoLarge: form.photo || null,
      })
      onCreated(car)
    } catch (err) {
      setSaveError(err.message)
      setSaving(false)
    }
  }

  function handleClear() {
    setForm(EMPTY_FORM)
    setSubmitted(false)
    setSaveError('')
  }

  const input = (name, props = {}) => (
    <input name={name} value={form[name]} onChange={handleChange} {...props} />
  )
  const select = (name, options, placeholder) => (
    <select name={name} value={form[name]} onChange={handleChange}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  )

  return (
    <div className="sell-page">
      <div className="sell-head">
        <h1>Sell your car</h1>
        <p className="muted">Fill in the details. The listing appears in the catalog right away.</p>
      </div>

      <div className="sell-layout">
        <form className="sell-form" onSubmit={handleSubmit} noValidate>
          <FormField label="Photo" wide>
            <PhotoPicker value={form.photo} onChange={handlePhoto} />
          </FormField>
          <FormField label="Make" error={shownErrors.make}>{select('make', MAKES, 'Choose make')}</FormField>
          <FormField label="Model" error={shownErrors.model}>{input('model', { placeholder: 'e.g. Camry' })}</FormField>
          <FormField label="Year" error={shownErrors.year}>{input('year', { type: 'number', placeholder: '2020' })}</FormField>
          <FormField label="Price, $" error={shownErrors.price}>{input('price', { type: 'number', placeholder: '25000' })}</FormField>
          <FormField label="Mileage, km" error={shownErrors.mileage}>{input('mileage', { type: 'number', placeholder: '60000' })}</FormField>
          <FormField label="Power, hp" error={shownErrors.horsepower}>{input('horsepower', { type: 'number', placeholder: '180' })}</FormField>
          <FormField label="Body">{select('body', BODIES)}</FormField>
          <FormField label="Fuel">{select('fuel', FUELS)}</FormField>
          <FormField label="Transmission">{select('transmission', TRANSMISSIONS)}</FormField>
          <FormField label="Color">{select('color', COLORS)}</FormField>
          <FormField label="City" wide>{select('city', CITIES)}</FormField>
          <FormField label={`Description (${form.description.length}/500)`} error={shownErrors.description} wide>
            <textarea name="description" rows="4" value={form.description} onChange={handleChange}
              placeholder="Condition, service history, extras…" />
          </FormField>

          {saveError && <p className="form-error wide">{saveError}</p>}

          <div className="form-actions wide">
            <button type="button" className="btn ghost" onClick={handleClear} disabled={saving}>Clear</button>
            <button type="submit" className="btn primary" disabled={saving}>
              {saving ? 'Publishing…' : 'Publish listing'}
            </button>
          </div>
        </form>

        <aside className="preview">
          <p className="preview-label">Preview</p>
          <div className="car-card static">
            <CarImage photo={form.photo} body={form.body} color={form.color} alt="Preview" />
            <div className="car-card-body">
              <div className="car-card-title">
                <h3>{form.make || 'Make'} {form.model || 'Model'}</h3>
                <span className="year">{form.year || '----'}</span>
              </div>
              <p className="price">{form.price ? formatPrice(Number(form.price)) : '$ —'}</p>
              <ul className="chips">
                <li>{form.mileage !== '' ? formatMileage(Number(form.mileage)) : '— km'}</li>
                <li>{form.fuel}</li>
                <li>{form.transmission}</li>
              </ul>
              <p className="city">📍 {form.city}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
