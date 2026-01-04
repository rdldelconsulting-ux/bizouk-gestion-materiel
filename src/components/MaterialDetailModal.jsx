import { X, Edit2, MapPin, CheckCircle, AlertTriangle, QrCode, Calendar, Package } from 'lucide-react'

function MaterialDetailModal({ material, onClose, onEdit, onAssign, onMarkAvailable, onMarkHS, onShowQRCode }) {
  const getStatusBadge = (status) => {
    const badges = {
      available: { text: 'Disponible', class: 'bg-green-500/20 text-green-500 border-green-500', icon: CheckCircle },
      assigned: { text: 'Assigné', class: 'bg-blue-500/20 text-blue-500 border-blue-500', icon: MapPin },
      hs: { text: 'H.S', class: 'bg-red-500/20 text-red-500 border-red-500', icon: AlertTriangle }
    }
    const badge = badges[status] || badges.available
    const Icon = badge.icon

    return (
      <div className={`px-4 py-2 rounded-lg border-2 ${badge.class} flex items-center gap-2`}>
        <Icon size={20} />
        <span className="font-bold">{badge.text}</span>
      </div>
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-bizouk-black-light border-2 border-bizouk-gold rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-bizouk-black-light border-b-2 border-bizouk-gold p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="text-bizouk-gold" size={28} />
            <h2 className="text-2xl font-bold">Détails du Matériel</h2>
          </div>
          <button
            onClick={onClose}
            className="text-bizouk-gold hover:text-bizouk-gold-dark transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* En-tête avec nom et statut */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1">
              <h3 className="text-3xl font-bold mb-2">{material.name}</h3>
              <p className="text-lg opacity-70">Réf: {material.reference}</p>
              <p className="text-sm text-bizouk-gold-dark mt-1">{material.category}</p>
            </div>
            {getStatusBadge(material.status)}
          </div>

          {/* Description */}
          {material.description && (
            <div className="bg-black border-2 border-bizouk-gold rounded-lg p-4">
              <p className="font-semibold mb-2">Description</p>
              <p className="opacity-80">{material.description}</p>
            </div>
          )}

          {/* Informations d'assignation */}
          {material.status === 'assigned' && material.assignedTo && (
            <div className="bg-blue-500/10 border-2 border-blue-500 rounded-lg p-4">
              <p className="font-semibold text-blue-500 mb-3 flex items-center gap-2">
                <MapPin size={20} />
                Assignation
              </p>
              <div className="space-y-2">
                <p className="opacity-90">
                  <span className="font-semibold">Assigné à:</span> {material.assignedTo}
                </p>
                {material.assignedDate && (
                  <p className="opacity-90">
                    <span className="font-semibold">Date:</span> {formatDate(material.assignedDate)}
                  </p>
                )}
                {material.assignedLocation && (
                  <div className="mt-2 pt-2 border-t border-blue-500/50">
                    <p className="font-semibold text-sm mb-1">Position GPS:</p>
                    <p className="text-sm opacity-80">
                      Lat: {material.assignedLocation.lat.toFixed(6)}<br />
                      Lng: {material.assignedLocation.lng.toFixed(6)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Historique des pannes */}
          {material.hsHistory && material.hsHistory.length > 0 && (
            <div className="bg-red-500/10 border-2 border-red-500 rounded-lg p-4">
              <p className="font-semibold text-red-500 mb-3 flex items-center gap-2">
                <AlertTriangle size={20} />
                Historique des Pannes ({material.hsHistory.length})
              </p>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {material.hsHistory.slice().reverse().map((entry, index) => (
                  <div key={entry.id || index} className="bg-black rounded-lg p-3 border border-red-500/50">
                    <p className="text-red-400 text-sm mb-1">{entry.issue}</p>
                    <p className="text-xs opacity-70">
                      <Calendar className="inline" size={12} /> {formatDate(entry.date)}
                    </p>
                    {entry.location && (
                      <p className="text-xs opacity-70 mt-1">
                        <MapPin className="inline" size={12} /> {entry.location.lat.toFixed(4)}, {entry.location.lng.toFixed(4)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Informations système */}
          <div className="bg-black border border-bizouk-gold/50 rounded-lg p-4">
            <p className="font-semibold text-sm mb-2 opacity-70">Informations système</p>
            <div className="grid grid-cols-2 gap-2 text-xs opacity-60">
              <p>ID: {material.id}</p>
              {material.createdAt && (
                <p>Créé: {formatDate(material.createdAt)}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                onClose()
                onShowQRCode(material)
              }}
              className="flex items-center justify-center gap-2 bg-black border-2 border-bizouk-gold text-bizouk-gold px-4 py-3 rounded-lg font-bold hover:bg-bizouk-gold hover:text-black transition-colors"
            >
              <QrCode size={18} />
              QR Code
            </button>
            <button
              onClick={() => {
                onClose()
                onEdit(material)
              }}
              className="flex items-center justify-center gap-2 bg-black border-2 border-bizouk-gold text-bizouk-gold px-4 py-3 rounded-lg font-bold hover:bg-bizouk-gold hover:text-black transition-colors"
            >
              <Edit2 size={18} />
              Modifier
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {material.status !== 'assigned' && (
              <button
                onClick={() => {
                  onClose()
                  onAssign(material)
                }}
                className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors"
              >
                <MapPin size={18} />
                Assigner
              </button>
            )}
            {material.status === 'assigned' && (
              <button
                onClick={() => {
                  onMarkAvailable(material.id)
                  onClose()
                }}
                className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-3 rounded-lg font-bold hover:bg-green-600 transition-colors"
              >
                <CheckCircle size={18} />
                Rendre Disponible
              </button>
            )}
            {material.status !== 'hs' && (
              <button
                onClick={() => {
                  onClose()
                  onMarkHS(material)
                }}
                className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-3 rounded-lg font-bold hover:bg-red-600 transition-colors"
              >
                <AlertTriangle size={18} />
                Mettre H.S
              </button>
            )}
            {material.status === 'hs' && (
              <button
                onClick={() => {
                  onMarkAvailable(material.id)
                  onClose()
                }}
                className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-3 rounded-lg font-bold hover:bg-green-600 transition-colors"
              >
                <CheckCircle size={18} />
                Réparer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaterialDetailModal
