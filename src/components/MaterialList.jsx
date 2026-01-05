import { Edit2, Trash2, MapPin, CheckCircle, AlertTriangle, QrCode } from 'lucide-react'
import { useState } from 'react'
import QRCodeModal from './QRCodeModal'

function MaterialList({ materials, onEdit, onDelete, onAssign, onMarkAvailable, onMarkHS }) {
  const [showQRCode, setShowQRCode] = useState(null)

  const getStatusBadge = (status) => {
    const badges = {
      available: { text: 'Disponible', class: 'bg-green-500/20 text-green-500 border-green-500' },
      assigned: { text: 'Assigné', class: 'bg-blue-500/20 text-blue-500 border-blue-500' },
      hs: { text: 'H.S', class: 'bg-red-500/20 text-red-500 border-red-500' }
    }
    const badge = badges[status] || badges.available
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold border-2 ${badge.class}`}>
        {badge.text}
      </span>
    )
  }

  if (materials.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-bizouk-gold rounded-lg">
        <p className="text-xl opacity-70">Aucun matériel trouvé</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {materials.map((material) => (
        <div
          key={material.id}
          className="bg-bizouk-black-light border-2 border-bizouk-gold rounded-lg p-6 hover:border-bizouk-gold-dark transition-colors"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">{material.name}</h3>
              <p className="text-sm opacity-70">Réf: {material.reference}</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-bizouk-gold-dark">{material.category}</p>
                {material.region && (
                  <>
                    <span className="text-xs opacity-50">•</span>
                    <span className="text-xs px-2 py-0.5 bg-bizouk-gold/20 border border-bizouk-gold rounded-full text-bizouk-gold">
                      {material.region}
                    </span>
                  </>
                )}
              </div>
            </div>
            {getStatusBadge(material.status)}
          </div>

          {material.description && (
            <p className="text-sm opacity-80 mb-4 line-clamp-2">{material.description}</p>
          )}

          {material.status === 'assigned' && material.assignedTo && (
            <div className="bg-blue-500/10 border border-blue-500 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-500 font-semibold">
                Assigné à: {material.assignedTo}
              </p>
              {material.assignedLocation && (
                <p className="text-xs text-blue-400 mt-1">
                  <MapPin size={12} className="inline mr-1" />
                  {material.assignedLocation.lat.toFixed(4)}, {material.assignedLocation.lng.toFixed(4)}
                </p>
              )}
            </div>
          )}

          {material.status === 'hs' && material.hsHistory && material.hsHistory.length > 0 && (
            <div className="bg-red-500/10 border border-red-500 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-500 font-semibold">Dernière panne:</p>
              <p className="text-xs text-red-400 mt-1 line-clamp-2">
                {material.hsHistory[material.hsHistory.length - 1].issue}
              </p>
              {material.hsHistory.length > 1 && (
                <p className="text-xs text-red-300 mt-2">
                  ({material.hsHistory.length} panne{material.hsHistory.length > 1 ? 's' : ''} au total)
                </p>
              )}
            </div>
          )}

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setShowQRCode(material)}
              className="bg-black border border-bizouk-gold text-bizouk-gold px-3 py-2 rounded text-sm font-semibold hover:bg-bizouk-gold hover:text-black transition-colors flex items-center justify-center gap-1"
              title="Afficher le QR Code"
            >
              <QrCode size={14} />
            </button>
            <button
              onClick={() => onEdit(material)}
              className="flex-1 bg-black border border-bizouk-gold text-bizouk-gold px-3 py-2 rounded text-sm font-semibold hover:bg-bizouk-gold hover:text-black transition-colors flex items-center justify-center gap-1"
            >
              <Edit2 size={14} />
              Modifier
            </button>
            <button
              onClick={() => onDelete(material.id)}
              className="flex-1 bg-black border border-red-500 text-red-500 px-3 py-2 rounded text-sm font-semibold hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center gap-1"
            >
              <Trash2 size={14} />
              Supprimer
            </button>
          </div>

          <div className="flex gap-2 mt-2">
            {material.status !== 'assigned' && (
              <button
                onClick={() => onAssign(material)}
                className="flex-1 bg-blue-500 text-white px-3 py-2 rounded text-sm font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
              >
                <MapPin size={14} />
                Assigner
              </button>
            )}
            {material.status === 'assigned' && (
              <button
                onClick={() => onMarkAvailable(material.id)}
                className="flex-1 bg-green-500 text-white px-3 py-2 rounded text-sm font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-1"
              >
                <CheckCircle size={14} />
                Disponible
              </button>
            )}
            {material.status !== 'hs' && (
              <button
                onClick={() => onMarkHS(material)}
                className="flex-1 bg-red-500 text-white px-3 py-2 rounded text-sm font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-1"
              >
                <AlertTriangle size={14} />
                H.S
              </button>
            )}
            {material.status === 'hs' && (
              <button
                onClick={() => onMarkAvailable(material.id)}
                className="flex-1 bg-green-500 text-white px-3 py-2 rounded text-sm font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-1"
              >
                <CheckCircle size={14} />
                Réparer
              </button>
            )}
          </div>
        </div>
      ))}

      {showQRCode && (
        <QRCodeModal
          material={showQRCode}
          onClose={() => setShowQRCode(null)}
        />
      )}
    </div>
  )
}

export default MaterialList
