import { useState, useEffect } from 'react'
import { Package, MapPin, AlertTriangle, TrendingUp, Plus, Edit2, Trash2, CheckCircle, XCircle, History, Map as MapIcon, ScanLine } from 'lucide-react'
import MaterialForm from './components/MaterialForm'
import MaterialList from './components/MaterialList'
import AssignmentModal from './components/AssignmentModal'
import HSModal from './components/HSModal'
import HistoryPanel from './components/HistoryPanel'
import MapView from './components/MapView'
import Logo from './components/Logo'
import ExportButton from './components/ExportButton'
import ImportButton from './components/ImportButton'
import QRCodePrintAll from './components/QRCodePrintAll'
import QRScanner from './components/QRScanner'
import MaterialDetailModal from './components/MaterialDetailModal'

function App() {
  const [materials, setMaterials] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingMaterial, setEditingMaterial] = useState(null)
  const [showAssignmentModal, setShowAssignmentModal] = useState(null)
  const [showHSModal, setShowHSModal] = useState(null)
  const [showScanner, setShowScanner] = useState(false)
  const [showMaterialDetail, setShowMaterialDetail] = useState(null)
  const [activeView, setActiveView] = useState('list')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterRegion, setFilterRegion] = useState('all')

  useEffect(() => {
    const stored = localStorage.getItem('bizouk_materials')
    if (stored) {
      const parsedMaterials = JSON.parse(stored)

      // Migration : Ajouter région par défaut aux matériaux sans région
      const migratedMaterials = parsedMaterials.map(material => ({
        ...material,
        region: material.region || 'Guadeloupe'
      }))

      setMaterials(migratedMaterials)
      localStorage.setItem('bizouk_materials', JSON.stringify(migratedMaterials))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('bizouk_materials', JSON.stringify(materials))
  }, [materials])

  const addMaterial = (material) => {
    const newMaterial = {
      id: Date.now().toString(),
      ...material,
      status: 'available',
      region: material.region || 'Guadeloupe',
      assignedTo: null,
      assignedLocation: null,
      hsHistory: [],
      createdAt: new Date().toISOString()
    }
    setMaterials([...materials, newMaterial])
    setShowForm(false)
  }

  const updateMaterial = (id, updates) => {
    setMaterials(materials.map(m => m.id === id ? { ...m, ...updates } : m))
    setEditingMaterial(null)
    setShowForm(false)
  }

  const deleteMaterial = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce matériel ?')) {
      setMaterials(materials.filter(m => m.id !== id))
    }
  }

  const assignMaterial = (id, assignmentData) => {
    const material = materials.find(m => m.id === id)
    setMaterials(materials.map(m =>
      m.id === id
        ? {
            ...m,
            status: 'assigned',
            assignedTo: assignmentData.assignedTo,
            assignedLocation: assignmentData.location,
            assignedDate: new Date().toISOString()
          }
        : m
    ))
    setShowAssignmentModal(null)
  }

  const markAsAvailable = (id) => {
    setMaterials(materials.map(m =>
      m.id === id
        ? {
            ...m,
            status: 'available',
            assignedTo: null,
            assignedLocation: null,
            assignedDate: null
          }
        : m
    ))
  }

  const markAsHS = (id, hsData) => {
    const material = materials.find(m => m.id === id)
    const hsEntry = {
      id: Date.now().toString(),
      issue: hsData.issue,
      date: new Date().toISOString(),
      location: hsData.location || material.assignedLocation
    }

    setMaterials(materials.map(m =>
      m.id === id
        ? {
            ...m,
            status: 'hs',
            hsHistory: [...(m.hsHistory || []), hsEntry],
            assignedTo: null,
            assignedLocation: null
          }
        : m
    ))
    setShowHSModal(null)
  }

  const handleImport = (importedMaterials) => {
    const newMaterials = importedMaterials.map(material => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      ...material,
      status: 'available',
      region: material.region || 'Guadeloupe',
      assignedTo: null,
      assignedLocation: null,
      hsHistory: [],
      createdAt: new Date().toISOString()
    }))

    setMaterials([...materials, ...newMaterials])
    alert(`${newMaterials.length} matériel${newMaterials.length > 1 ? 's' : ''} importé${newMaterials.length > 1 ? 's' : ''} avec succès !`)
  }

  const stats = {
    total: materials.length,
    available: materials.filter(m => m.status === 'available').length,
    assigned: materials.filter(m => m.status === 'assigned').length,
    hs: materials.filter(m => m.status === 'hs').length
  }

  const filteredMaterials = materials.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         m.reference.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || m.status === filterStatus
    const matchesRegion = filterRegion === 'all' || m.region === filterRegion
    return matchesSearch && matchesStatus && matchesRegion
  })

  const allHSHistory = materials
    .flatMap(m => (m.hsHistory || []).map(h => ({ ...h, materialName: m.name, materialRef: m.reference })))
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="min-h-screen bg-black text-bizouk-gold">
      <header className="bg-bizouk-black-light border-b-2 border-bizouk-gold">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <Logo />
            <div className="flex gap-2 flex-wrap">
              <ImportButton
                materials={materials}
                onImport={handleImport}
              />
              <ExportButton
                materials={materials}
                filteredMaterials={filteredMaterials}
                filterActive={searchTerm !== '' || filterStatus !== 'all' || filterRegion !== 'all'}
              />
              <QRCodePrintAll
                materials={materials}
                filteredMaterials={filteredMaterials}
                filterActive={searchTerm !== '' || filterStatus !== 'all' || filterRegion !== 'all'}
              />
              <button
                onClick={() => setShowScanner(true)}
                className="flex items-center gap-2 bg-black border-2 border-bizouk-gold text-bizouk-gold px-4 py-3 rounded-lg font-bold hover:bg-bizouk-gold hover:text-black transition-colors"
                title="Scanner un QR Code"
              >
                <ScanLine size={20} />
                <span className="hidden md:inline">Scanner</span>
              </button>
              <button
                onClick={() => {
                  setShowForm(true)
                  setEditingMaterial(null)
                }}
                className="flex items-center gap-2 bg-bizouk-gold text-black px-6 py-3 rounded-lg font-bold hover:bg-bizouk-gold-dark transition-colors"
              >
                <Plus size={20} />
                Ajouter Matériel
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black border-2 border-bizouk-gold rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80">Total</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <Package className="text-bizouk-gold" size={32} />
              </div>
            </div>
            <div className="bg-black border-2 border-green-500 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-500">Disponible</p>
                  <p className="text-3xl font-bold text-green-500">{stats.available}</p>
                </div>
                <CheckCircle className="text-green-500" size={32} />
              </div>
            </div>
            <div className="bg-black border-2 border-blue-500 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-500">Assigné</p>
                  <p className="text-3xl font-bold text-blue-500">{stats.assigned}</p>
                </div>
                <MapPin className="text-blue-500" size={32} />
              </div>
            </div>
            <div className="bg-black border-2 border-red-500 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-500">H.S</p>
                  <p className="text-3xl font-bold text-red-500">{stats.hs}</p>
                </div>
                <AlertTriangle className="text-red-500" size={32} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-bizouk-black-light border-b-2 border-bizouk-gold">
        <div className="container mx-auto px-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveView('list')}
              className={`px-6 py-3 font-bold transition-colors ${
                activeView === 'list'
                  ? 'bg-bizouk-gold text-black'
                  : 'text-bizouk-gold hover:bg-black'
              }`}
            >
              <Package className="inline mr-2" size={20} />
              Liste Matériel
            </button>
            <button
              onClick={() => setActiveView('map')}
              className={`px-6 py-3 font-bold transition-colors ${
                activeView === 'map'
                  ? 'bg-bizouk-gold text-black'
                  : 'text-bizouk-gold hover:bg-black'
              }`}
            >
              <MapIcon className="inline mr-2" size={20} />
              Carte
            </button>
            <button
              onClick={() => setActiveView('history')}
              className={`px-6 py-3 font-bold transition-colors ${
                activeView === 'history'
                  ? 'bg-bizouk-gold text-black'
                  : 'text-bizouk-gold hover:bg-black'
              }`}
            >
              <History className="inline mr-2" size={20} />
              Historique Pannes
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeView === 'list' && (
          <>
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Rechercher par nom ou référence..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-bizouk-black-light border-2 border-bizouk-gold rounded-lg px-4 py-3 text-bizouk-gold placeholder-bizouk-gold/50 focus:outline-none focus:border-bizouk-gold-dark"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-bizouk-black-light border-2 border-bizouk-gold rounded-lg px-4 py-3 text-bizouk-gold focus:outline-none focus:border-bizouk-gold-dark"
              >
                <option value="all">Tous les statuts</option>
                <option value="available">Disponible</option>
                <option value="assigned">Assigné</option>
                <option value="hs">H.S</option>
              </select>
              <select
                value={filterRegion}
                onChange={(e) => setFilterRegion(e.target.value)}
                className="bg-bizouk-black-light border-2 border-bizouk-gold rounded-lg px-4 py-3 text-bizouk-gold focus:outline-none focus:border-bizouk-gold-dark"
              >
                <option value="all">Toutes les régions</option>
                <option value="Guadeloupe">Guadeloupe</option>
                <option value="Martinique">Martinique</option>
                <option value="Guyane">Guyane</option>
                <option value="Réunion">Réunion</option>
                <option value="Mayotte">Mayotte</option>
                <option value="Nouvelle-Calédonie">Nouvelle-Calédonie</option>
                <option value="Polynésie Française">Polynésie Française</option>
                <option value="Saint-Martin">Saint-Martin</option>
                <option value="Saint-Barthélemy">Saint-Barthélemy</option>
                <option value="Wallis-et-Futuna">Wallis-et-Futuna</option>
                <option value="Saint-Pierre-et-Miquelon">Saint-Pierre-et-Miquelon</option>
              </select>
            </div>

            <MaterialList
              materials={filteredMaterials}
              onEdit={(material) => {
                setEditingMaterial(material)
                setShowForm(true)
              }}
              onDelete={deleteMaterial}
              onAssign={(material) => setShowAssignmentModal(material)}
              onMarkAvailable={markAsAvailable}
              onMarkHS={(material) => setShowHSModal(material)}
            />
          </>
        )}

        {activeView === 'map' && (
          <MapView materials={materials.filter(m => m.assignedLocation)} />
        )}

        {activeView === 'history' && (
          <HistoryPanel materials={materials} allHistory={allHSHistory} />
        )}
      </main>

      {showForm && (
        <MaterialForm
          material={editingMaterial}
          onSubmit={editingMaterial ? (data) => updateMaterial(editingMaterial.id, data) : addMaterial}
          onClose={() => {
            setShowForm(false)
            setEditingMaterial(null)
          }}
        />
      )}

      {showAssignmentModal && (
        <AssignmentModal
          material={showAssignmentModal}
          onAssign={(data) => assignMaterial(showAssignmentModal.id, data)}
          onClose={() => setShowAssignmentModal(null)}
        />
      )}

      {showHSModal && (
        <HSModal
          material={showHSModal}
          onSubmit={(data) => markAsHS(showHSModal.id, data)}
          onClose={() => setShowHSModal(null)}
        />
      )}

      {showScanner && (
        <QRScanner
          materials={materials}
          onClose={() => setShowScanner(false)}
          onMaterialFound={(material) => {
            setShowScanner(false)
            setShowMaterialDetail(material)
          }}
        />
      )}

      {showMaterialDetail && (
        <MaterialDetailModal
          material={showMaterialDetail}
          onClose={() => setShowMaterialDetail(null)}
          onEdit={(material) => {
            setEditingMaterial(material)
            setShowForm(true)
          }}
          onAssign={(material) => setShowAssignmentModal(material)}
          onMarkAvailable={markAsAvailable}
          onMarkHS={(material) => setShowHSModal(material)}
          onShowQRCode={(material) => {
            // Cette fonction sera appelée depuis MaterialList
            // On peut la laisser vide ici ou la gérer différemment
          }}
        />
      )}
    </div>
  )
}

export default App
