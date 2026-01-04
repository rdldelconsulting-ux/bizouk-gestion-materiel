import { useState } from 'react'
import { AlertTriangle, MapPin, Calendar, Package } from 'lucide-react'

function HistoryPanel({ materials, allHistory }) {
  const [selectedMaterial, setSelectedMaterial] = useState('all')

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const materialsWithHS = materials.filter(m => m.hsHistory && m.hsHistory.length > 0)

  const displayedHistory = selectedMaterial === 'all'
    ? allHistory
    : materials
        .find(m => m.id === selectedMaterial)
        ?.hsHistory.map(h => ({
          ...h,
          materialName: materials.find(m => m.id === selectedMaterial).name,
          materialRef: materials.find(m => m.id === selectedMaterial).reference
        })) || []

  return (
    <div className="space-y-6">
      <div className="bg-bizouk-black-light border-2 border-bizouk-gold rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="text-red-500" />
          Historique des Pannes
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Filtrer par matériel</label>
          <select
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
            className="w-full md:w-auto bg-black border-2 border-bizouk-gold rounded-lg px-4 py-3 text-bizouk-gold focus:outline-none focus:border-bizouk-gold-dark"
          >
            <option value="all">Toutes les pannes ({allHistory.length})</option>
            {materialsWithHS.map(material => (
              <option key={material.id} value={material.id}>
                {material.name} - {material.reference} ({material.hsHistory.length})
              </option>
            ))}
          </select>
        </div>

        {displayedHistory.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-bizouk-gold rounded-lg">
            <AlertTriangle className="mx-auto mb-4 opacity-50" size={48} />
            <p className="text-xl opacity-70">Aucune panne enregistrée</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedHistory.map((entry, index) => (
              <div
                key={entry.id || index}
                className="bg-black border-2 border-red-500 rounded-lg p-4 hover:border-red-400 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="text-bizouk-gold" size={18} />
                      <p className="font-bold text-bizouk-gold">
                        {entry.materialName}
                      </p>
                      <span className="text-sm opacity-70">({entry.materialRef})</span>
                    </div>
                    <p className="text-red-400 mb-3">{entry.issue}</p>
                    <div className="flex flex-wrap gap-4 text-sm opacity-80">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(entry.date)}
                      </div>
                      {entry.location && (
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          {entry.location.lat.toFixed(4)}, {entry.location.lng.toFixed(4)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedMaterial === 'all' && materialsWithHS.length > 0 && (
        <div className="bg-bizouk-black-light border-2 border-bizouk-gold rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Statistiques par matériel</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {materialsWithHS
              .sort((a, b) => b.hsHistory.length - a.hsHistory.length)
              .map(material => (
                <div
                  key={material.id}
                  className="bg-black border-2 border-red-500 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-bizouk-gold line-clamp-1">
                        {material.name}
                      </p>
                      <p className="text-xs opacity-70">{material.reference}</p>
                    </div>
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {material.hsHistory.length}
                    </div>
                  </div>
                  <p className="text-xs text-red-400 mt-2">
                    Dernière panne: {formatDate(material.hsHistory[material.hsHistory.length - 1].date)}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default HistoryPanel
