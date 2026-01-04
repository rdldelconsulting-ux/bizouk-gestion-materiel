import { useState, useEffect } from 'react'
import { X, AlertTriangle, MapPin, Loader } from 'lucide-react'

function HSModal({ material, onSubmit, onClose }) {
  const [issue, setIssue] = useState('')
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (material.assignedLocation) {
      setLocation(material.assignedLocation)
    } else {
      getLocation()
    }
  }, [material])

  const getLocation = () => {
    if (!navigator.geolocation) return

    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        setLoading(false)
      },
      () => {
        setLoading(false)
      }
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!issue.trim()) {
      alert('Veuillez décrire le problème')
      return
    }
    onSubmit({ issue, location })
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-bizouk-black-light border-2 border-red-500 rounded-lg max-w-md w-full">
        <div className="border-b-2 border-red-500 p-6 flex items-center justify-between bg-red-500/10">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-red-500" size={24} />
            <h2 className="text-2xl font-bold text-red-500">Mettre Hors Service</h2>
          </div>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-400 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-black border-2 border-bizouk-gold rounded-lg p-4">
            <p className="font-semibold mb-1">{material.name}</p>
            <p className="text-sm opacity-70">Réf: {material.reference}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-red-500">
              Description du problème *
            </label>
            <textarea
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              rows={4}
              className="w-full bg-black border-2 border-red-500 rounded-lg px-4 py-3 text-bizouk-gold focus:outline-none focus:border-red-400 resize-none"
              placeholder="Décrivez en détail le problème rencontré..."
            />
          </div>

          {location && (
            <div className="bg-black border-2 border-blue-500 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="text-blue-500" size={20} />
                <p className="font-semibold text-blue-500">Position</p>
              </div>
              <div className="text-sm text-blue-400">
                <p>Latitude: {location.lat.toFixed(6)}</p>
                <p>Longitude: {location.lng.toFixed(6)}</p>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-black border-2 border-bizouk-gold text-bizouk-gold px-6 py-3 rounded-lg font-bold hover:bg-bizouk-gold hover:text-black transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-600 transition-colors"
            >
              Mettre H.S
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default HSModal
