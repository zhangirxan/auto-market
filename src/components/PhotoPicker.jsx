import { useRef, useState } from 'react'

const MAX_SIDE = 1000

function readAsDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Could not read the file'))
    reader.readAsDataURL(blob)
  })
}

// shrink big phone photos so they fit into localStorage
async function prepare(file) {
  if (typeof OffscreenCanvas === 'undefined') {
    if (file.size > 1_500_000) throw new Error('Photo is too big, max 1.5 MB')
    return readAsDataUrl(file)
  }
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height))
  const canvas = new OffscreenCanvas(Math.round(bitmap.width * scale), Math.round(bitmap.height * scale))
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  const blob = await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.75 })
  return readAsDataUrl(blob)
}

export default function PhotoPicker({ value, onChange }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const lastPick = useRef(0)

  async function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Choose an image file')
      return
    }

    const pick = ++lastPick.current
    setBusy(true)
    setError('')
    try {
      const dataUrl = await prepare(file)
      if (pick === lastPick.current) onChange(dataUrl)
    } catch (err) {
      if (pick === lastPick.current) setError(err.message)
    } finally {
      if (pick === lastPick.current) setBusy(false)
    }
  }

  return (
    <div className="photo-picker">
      {value ? (
        <div className="photo-picker-preview">
          <img src={value} alt="Your car" />
          <button type="button" className="btn ghost small" onClick={() => onChange('')}>
            Remove photo
          </button>
        </div>
      ) : (
        <label className="photo-drop">
          <input type="file" accept="image/*" onChange={handleFile} disabled={busy} />
          <span className="photo-drop-icon">📷</span>
          <span>{busy ? 'Processing photo…' : 'Click to add a photo'}</span>
          <span className="muted small">JPG, PNG or WEBP</span>
        </label>
      )}
      {error && <span className="form-error">{error}</span>}
    </div>
  )
}
