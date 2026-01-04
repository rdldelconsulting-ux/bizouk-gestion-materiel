import { useState, useEffect } from 'react'
import { X, MapPin, Loader } from 'lucide-react'

function AssignmentModal({ material, onAssign, onClose }) {
  const [assignedTo, setAssignedTo] = useState('')
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    getLocation()
  }, [])

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('La géolocalisation n\'est pas supportée par votre navigateur')
      return
    }

    setLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        setLoading(false)
      },
      (error) => {
        setError('Impossible d\'obtenir votre position. Veuillez activer la géolocalisation.')
        setLoading(false)
      }
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!assignedTo) {
      alert('Veuillez entrer le nom de la personne')
      return
    }
    if (!location) {
      alert('Position GPS non disponible')
      return
    }
    onAssign({ assignedTo, location })
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-bizouk-black-light border-2 border-bizouk-gold rounded-lg max-w-md w-full">
        <div className="border-b-2 border-bizouk-gold p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Assigner Matériel</h2>
          <button
            onClick={onClose}
            className="text-bizouk-gold hover:text-bizouk-gold-dark transition-colors"
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
            <label className="block text-sm font-semibold mb-2">
              Assigné à *
            </label>
            <input
              type="text"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full bg-black border-2 border-bizouk-gold rounded-lg px-4 py-3 text-bizouk-gold focus:outline-none focus:border-bizouk-gold-dark"
              placeholder="Nom de la personne ou de l'événement"
            />
          </div>

          <div className="bg-black border-2 border-blue-500 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="text-blue-500" size={20} />
              <p className="font-semibold text-blue-500">Position GPS</p>
            </div>
            {loading && (
              <div className="flex items-center gap-2 text-blue-400">
                <Loader className="animate-spin" size={16} />
                <p className="text-sm">Obtention de la position...</p>
              </div>
            )}
            {error && (
              <div>
                <p className="text-sm text-red-500 mb-2">{error}</p>
                <button
                  type="button"
                  onClick={getLocation}
                  className="text-sm text-blue-500 hover:text-blue-400 underline"
                >
                  Réessayer
                </button>
              </div>
            )}
            {location && !loading && (
              <div className="text-sm text-blue-400">
                <p>Latitude: {location.lat.toFixed(6)}</p>
                <p>Longitude: {location.lng.toFixed(6)}</p>
              </div>
            )}
          </div>

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
              disabled={!location || loading}
              className="flex-1 bg-bizouk-gold text-black px-6 py-3 rounded-lg font-bold hover:bg-bizouk-gold-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Assigner
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AssignmentModal
