import { useState, useRef } from 'react'
import { Upload, X, CheckCircle, AlertTriangle } from 'lucide-react'

function ImportButton({ materials, onImport }) {
  const [showModal, setShowModal] = useState(false)
  const [importData, setImportData] = useState(null)
  const [errors, setErrors] = useState([])
  const fileInputRef = useRef(null)

  const parseCSV = (text) => {
    // Supprimer le BOM UTF-8 si présent
    const cleanText = text.replace(/^\uFEFF/, '')

    const lines = cleanText.split('\n').filter(line => line.trim())
    if (lines.length < 2) {
      throw new Error('Le fichier CSV est vide ou invalide')
    }

    // Parser les en-têtes
    const headers = parseCSVLine(lines[0])

    // Parser les données
    const data = []
    const parseErrors = []

    for (let i = 1; i < lines.length; i++) {
      try {
        const values = parseCSVLine(lines[i])
        if (values.length === 0) continue

        const row = {}
        headers.forEach((header, index) => {
          row[header] = values[index] || ''
        })

        // Convertir les données au format attendu
        const material = convertRowToMaterial(row, i + 1)

        // Validation
        const validationErrors = validateMaterial(material, i + 1)
        if (validationErrors.length > 0) {
          parseErrors.push(...validationErrors)
        } else {
          data.push(material)
        }
      } catch (error) {
        parseErrors.push(`Ligne ${i + 1}: ${error.message}`)
      }
    }

    return { data, errors: parseErrors }
  }

  const parseCSVLine = (line) => {
    const result = []
    let current = ''
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      const nextChar = line[i + 1]

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          current += '"'
          i++
        } else {
          inQuotes = !inQuotes
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    result.push(current.trim())

    return result
  }

  const convertRowToMaterial = (row, lineNumber) => {
    // Mapper les noms de colonnes possibles (français/anglais)
    const getName = () => row['Nom'] || row['nom'] || row['Name'] || row['name'] || ''
    const getReference = () => row['Référence'] || row['Reference'] || row['Ref'] || row['reference'] || row['ref'] || ''
    const getCategory = () => row['Catégorie'] || row['Category'] || row['Categorie'] || row['category'] || 'Sonorisation'
    const getRegion = () => row['Région'] || row['Region'] || row['region'] || 'Guadeloupe'
    const getDescription = () => row['Description'] || row['description'] || ''

    return {
      name: getName(),
      reference: getReference(),
      category: getCategory(),
      region: getRegion(),
      description: getDescription()
    }
  }

  const validateMaterial = (material, lineNumber) => {
    const errors = []

    if (!material.name || material.name.trim() === '') {
      errors.push(`Ligne ${lineNumber}: Le nom est obligatoire`)
    }

    if (!material.reference || material.reference.trim() === '') {
      errors.push(`Ligne ${lineNumber}: La référence est obligatoire`)
    }

    if (!material.region || material.region.trim() === '') {
      errors.push(`Ligne ${lineNumber}: La région est obligatoire`)
    }

    // Vérifier les doublons avec les matériels existants
    if (material.reference) {
      const existingMaterial = materials.find(m =>
        m.reference.toLowerCase() === material.reference.toLowerCase()
      )
      if (existingMaterial) {
        errors.push(`Ligne ${lineNumber}: La référence "${material.reference}" existe déjà`)
      }
    }

    return errors
  }

  const handleFileSelect = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    if (!file.name.endsWith('.csv')) {
      alert('Veuillez sélectionner un fichier CSV')
      return
    }

    try {
      const text = await file.text()
      const { data, errors } = parseCSV(text)

      setImportData(data)
      setErrors(errors)
      setShowModal(true)
    } catch (error) {
      alert(`Erreur lors de la lecture du fichier: ${error.message}`)
    }

    // Réinitialiser l'input pour permettre de ré-importer le même fichier
    event.target.value = ''
  }

  const handleImport = () => {
    if (importData && importData.length > 0) {
      onImport(importData)
      setShowModal(false)
      setImportData(null)
      setErrors([])
    }
  }

  const handleCancel = () => {
    setShowModal(false)
    setImportData(null)
    setErrors([])
  }

  const downloadTemplate = () => {
    const headers = ['Nom', 'Référence', 'Catégorie', 'Région', 'Description']
    const exampleRow = ['Enceinte JBL PRX815W', 'BZK-001', 'Sonorisation', 'Guadeloupe', 'Enceinte active 15 pouces']

    const csvContent = [
      headers.join(','),
      exampleRow.join(',')
    ].join('\n')

    const BOM = '\uFEFF'
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', 'bizouk_template_import.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 bg-black border-2 border-bizouk-gold text-bizouk-gold px-4 py-3 rounded-lg font-bold hover:bg-bizouk-gold hover:text-black transition-colors"
          title="Importer du matériel depuis un fichier CSV"
        >
          <Upload size={20} />
          <span className="hidden md:inline">Importer CSV</span>
        </button>
        <button
          onClick={downloadTemplate}
          className="flex items-center gap-2 bg-black border-2 border-bizouk-gold text-bizouk-gold px-4 py-3 rounded-lg font-bold hover:bg-bizouk-gold hover:text-black transition-colors"
          title="Télécharger un modèle CSV"
        >
          <Upload size={20} className="rotate-180" />
          <span className="hidden md:inline">Modèle</span>
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-bizouk-black-light border-2 border-bizouk-gold rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-bizouk-black-light border-b-2 border-bizouk-gold p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Confirmation d'import</h2>
              <button
                onClick={handleCancel}
                className="text-bizouk-gold hover:text-bizouk-gold-dark transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black border-2 border-green-500 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="text-green-500" size={24} />
                    <p className="font-bold text-green-500">Valides</p>
                  </div>
                  <p className="text-3xl font-bold text-green-500">
                    {importData?.length || 0}
                  </p>
                  <p className="text-sm text-green-400 mt-1">
                    matériel{importData?.length > 1 ? 's' : ''} à importer
                  </p>
                </div>

                <div className="bg-black border-2 border-red-500 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="text-red-500" size={24} />
                    <p className="font-bold text-red-500">Erreurs</p>
                  </div>
                  <p className="text-3xl font-bold text-red-500">
                    {errors.length}
                  </p>
                  <p className="text-sm text-red-400 mt-1">
                    ligne{errors.length > 1 ? 's' : ''} avec erreur
                  </p>
                </div>
              </div>

              {errors.length > 0 && (
                <div className="bg-red-500/10 border-2 border-red-500 rounded-lg p-4">
                  <h3 className="font-bold text-red-500 mb-3 flex items-center gap-2">
                    <AlertTriangle size={20} />
                    Erreurs détectées
                  </h3>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {errors.map((error, index) => (
                      <p key={index} className="text-sm text-red-400">
                        • {error}
                      </p>
                    ))}
                  </div>
                  <p className="text-xs text-red-300 mt-3">
                    Les lignes avec erreurs ne seront pas importées
                  </p>
                </div>
              )}

              {importData && importData.length > 0 && (
                <div className="bg-green-500/10 border-2 border-green-500 rounded-lg p-4">
                  <h3 className="font-bold text-green-500 mb-3">
                    Aperçu des matériels à importer ({importData.length})
                  </h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {importData.slice(0, 10).map((material, index) => (
                      <div key={index} className="bg-black rounded p-3 border border-bizouk-gold">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-bizouk-gold">
                              {material.name}
                            </p>
                            <p className="text-sm opacity-70">
                              Réf: {material.reference} • {material.category}
                            </p>
                            {material.description && (
                              <p className="text-xs opacity-60 mt-1 line-clamp-1">
                                {material.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {importData.length > 10 && (
                      <p className="text-sm opacity-70 text-center pt-2">
                        ... et {importData.length - 10} autres
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="bg-blue-500/10 border-2 border-blue-500 rounded-lg p-4">
                <h3 className="font-bold text-blue-500 mb-2">Format attendu</h3>
                <p className="text-sm text-blue-400 mb-2">
                  Le fichier CSV doit contenir les colonnes suivantes :
                </p>
                <div className="bg-black rounded p-3 font-mono text-xs text-blue-300">
                  Nom, Référence, Catégorie, Région, Description
                </div>
                <p className="text-xs text-blue-300 mt-2">
                  • Nom, Référence et Région sont obligatoires<br />
                  • Catégorie par défaut : Sonorisation<br />
                  • Région par défaut : Guadeloupe<br />
                  • Les matériels importés auront le statut "Disponible"
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-black border-2 border-bizouk-gold text-bizouk-gold px-6 py-3 rounded-lg font-bold hover:bg-bizouk-gold hover:text-black transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleImport}
                  disabled={!importData || importData.length === 0}
                  className="flex-1 bg-bizouk-gold text-black px-6 py-3 rounded-lg font-bold hover:bg-bizouk-gold-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Importer {importData?.length > 0 ? `(${importData.length})` : ''}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ImportButton
