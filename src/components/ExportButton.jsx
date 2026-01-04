import { Download } from 'lucide-react'

function ExportButton({ materials, filteredMaterials, filterActive }) {
  const exportToCSV = () => {
    const dataToExport = filterActive ? filteredMaterials : materials

    if (dataToExport.length === 0) {
      alert('Aucune donnée à exporter')
      return
    }

    // En-têtes CSV
    const headers = [
      'Nom',
      'Référence',
      'Catégorie',
      'Description',
      'Statut',
      'Assigné à',
      'Date assignation',
      'Latitude',
      'Longitude',
      'Nombre de pannes',
      'Dernière panne',
      'Date création'
    ]

    // Fonction pour échapper les valeurs CSV
    const escapeCSV = (value) => {
      if (value === null || value === undefined) return ''
      const stringValue = String(value)
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`
      }
      return stringValue
    }

    // Conversion des données
    const rows = dataToExport.map(material => {
      const statusText = {
        available: 'Disponible',
        assigned: 'Assigné',
        hs: 'Hors Service'
      }[material.status] || material.status

      const lastIssue = material.hsHistory && material.hsHistory.length > 0
        ? material.hsHistory[material.hsHistory.length - 1].issue
        : ''

      return [
        escapeCSV(material.name),
        escapeCSV(material.reference),
        escapeCSV(material.category),
        escapeCSV(material.description),
        escapeCSV(statusText),
        escapeCSV(material.assignedTo || ''),
        escapeCSV(material.assignedDate ? new Date(material.assignedDate).toLocaleString('fr-FR') : ''),
        escapeCSV(material.assignedLocation?.lat || ''),
        escapeCSV(material.assignedLocation?.lng || ''),
        escapeCSV(material.hsHistory?.length || 0),
        escapeCSV(lastIssue),
        escapeCSV(material.createdAt ? new Date(material.createdAt).toLocaleString('fr-FR') : '')
      ]
    })

    // Construction du CSV
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')

    // Ajout du BOM UTF-8 pour Excel
    const BOM = '\uFEFF'
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })

    // Téléchargement
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    const timestamp = new Date().toISOString().split('T')[0]

    link.setAttribute('href', url)
    link.setAttribute('download', `bizouk_materiel_${timestamp}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportHSHistory = () => {
    const allHistory = materials
      .flatMap(m => (m.hsHistory || []).map(h => ({
        ...h,
        materialName: m.name,
        materialRef: m.reference,
        materialCategory: m.category
      })))
      .sort((a, b) => new Date(b.date) - new Date(a.date))

    if (allHistory.length === 0) {
      alert('Aucun historique de panne à exporter')
      return
    }

    const headers = [
      'Matériel',
      'Référence',
      'Catégorie',
      'Problème',
      'Date',
      'Latitude',
      'Longitude'
    ]

    const escapeCSV = (value) => {
      if (value === null || value === undefined) return ''
      const stringValue = String(value)
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`
      }
      return stringValue
    }

    const rows = allHistory.map(entry => [
      escapeCSV(entry.materialName),
      escapeCSV(entry.materialRef),
      escapeCSV(entry.materialCategory),
      escapeCSV(entry.issue),
      escapeCSV(new Date(entry.date).toLocaleString('fr-FR')),
      escapeCSV(entry.location?.lat || ''),
      escapeCSV(entry.location?.lng || '')
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')

    const BOM = '\uFEFF'
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })

    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    const timestamp = new Date().toISOString().split('T')[0]

    link.setAttribute('href', url)
    link.setAttribute('download', `bizouk_historique_pannes_${timestamp}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={exportToCSV}
        className="flex items-center gap-2 bg-black border-2 border-bizouk-gold text-bizouk-gold px-4 py-3 rounded-lg font-bold hover:bg-bizouk-gold hover:text-black transition-colors"
        title={filterActive ? 'Exporter les résultats filtrés' : 'Exporter tout le matériel'}
      >
        <Download size={20} />
        <span className="hidden md:inline">
          {filterActive ? 'Exporter filtre' : 'Exporter CSV'}
        </span>
      </button>
      <button
        onClick={exportHSHistory}
        className="flex items-center gap-2 bg-black border-2 border-red-500 text-red-500 px-4 py-3 rounded-lg font-bold hover:bg-red-500 hover:text-white transition-colors"
        title="Exporter l'historique des pannes"
      >
        <Download size={20} />
        <span className="hidden md:inline">Export Pannes</span>
      </button>
    </div>
  )
}

export default ExportButton
