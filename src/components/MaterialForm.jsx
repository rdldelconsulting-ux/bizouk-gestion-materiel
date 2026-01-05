import { useState } from 'react'
import { X } from 'lucide-react'

function MaterialForm({ material, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: material?.name || '',
    reference: material?.reference || '',
    category: material?.category || 'Sonorisation',
    region: material?.region || 'Guadeloupe',
    description: material?.description || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.reference || !formData.region) {
      alert('Le nom, la référence et la région sont obligatoires')
      return
    }
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-bizouk-black-light border-2 border-bizouk-gold rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-bizouk-black-light border-b-2 border-bizouk-gold p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {material ? 'Modifier Matériel' : 'Ajouter Matériel'}
          </h2>
          <button
            onClick={onClose}
            className="text-bizouk-gold hover:text-bizouk-gold-dark transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Nom du matériel *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-black border-2 border-bizouk-gold rounded-lg px-4 py-3 text-bizouk-gold focus:outline-none focus:border-bizouk-gold-dark"
              placeholder="Ex: Enceinte JBL PRX815W"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Référence *
            </label>
            <input
              type="text"
              value={formData.reference}
              onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
              className="w-full bg-black border-2 border-bizouk-gold rounded-lg px-4 py-3 text-bizouk-gold focus:outline-none focus:border-bizouk-gold-dark"
              placeholder="Ex: BZK-001"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Catégorie
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-black border-2 border-bizouk-gold rounded-lg px-4 py-3 text-bizouk-gold focus:outline-none focus:border-bizouk-gold-dark"
            >
              <option value="Sonorisation">Sonorisation</option>
              <option value="Éclairage">Éclairage</option>
              <option value="Vidéo">Vidéo</option>
              <option value="Structure">Structure</option>
              <option value="Électricité">Électricité</option>
              <option value="Accessoires">Accessoires</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Région *
            </label>
            <select
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              className="w-full bg-black border-2 border-bizouk-gold rounded-lg px-4 py-3 text-bizouk-gold focus:outline-none focus:border-bizouk-gold-dark"
            >
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

          <div>
            <label className="block text-sm font-semibold mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full bg-black border-2 border-bizouk-gold rounded-lg px-4 py-3 text-bizouk-gold focus:outline-none focus:border-bizouk-gold-dark resize-none"
              placeholder="Description détaillée du matériel..."
            />
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
              className="flex-1 bg-bizouk-gold text-black px-6 py-3 rounded-lg font-bold hover:bg-bizouk-gold-dark transition-colors"
            >
              {material ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MaterialForm
