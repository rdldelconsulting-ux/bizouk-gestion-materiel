import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapPin } from 'lucide-react'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

function MapView({ materials }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const defaultCenter = materials.length > 0 && materials[0].assignedLocation
      ? [materials[0].assignedLocation.lat, materials[0].assignedLocation.lng]
      : [14.6937, -17.4441]

    const map = L.map(mapRef.current).setView(defaultCenter, 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    mapInstanceRef.current = map

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!mapInstanceRef.current) return

    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    if (materials.length === 0) return

    const bounds = []

    materials.forEach(material => {
      if (!material.assignedLocation) return

      const { lat, lng } = material.assignedLocation
      bounds.push([lat, lng])

      const getMarkerColor = (status) => {
        switch (status) {
          case 'assigned':
            return 'blue'
          case 'hs':
            return 'red'
          default:
            return 'green'
        }
      }

      const color = getMarkerColor(material.status)

      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            background-color: ${color};
            width: 30px;
            height: 30px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid #FFD700;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              transform: rotate(45deg);
              color: white;
              font-weight: bold;
              font-size: 18px;
            ">📦</div>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
      })

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(mapInstanceRef.current)

      const statusText = {
        assigned: 'Assigné',
        hs: 'Hors Service',
        available: 'Disponible'
      }[material.status] || material.status

      const statusColor = {
        assigned: '#3b82f6',
        hs: '#ef4444',
        available: '#22c55e'
      }[material.status] || '#FFD700'

      marker.bindPopup(`
        <div style="color: #000; min-width: 200px;">
          <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 8px; color: #000;">
            ${material.name}
          </h3>
          <p style="font-size: 12px; color: #666; margin-bottom: 8px;">
            Réf: ${material.reference}
          </p>
          <p style="
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            background-color: ${statusColor};
            color: white;
            margin-bottom: 8px;
          ">
            ${statusText}
          </p>
          ${material.assignedTo ? `
            <p style="font-size: 12px; color: #000; margin-top: 8px;">
              <strong>Assigné à:</strong> ${material.assignedTo}
            </p>
          ` : ''}
          ${material.status === 'hs' && material.hsHistory && material.hsHistory.length > 0 ? `
            <p style="font-size: 12px; color: #ef4444; margin-top: 8px;">
              <strong>Problème:</strong> ${material.hsHistory[material.hsHistory.length - 1].issue}
            </p>
          ` : ''}
          <p style="font-size: 11px; color: #999; margin-top: 8px;">
            ${lat.toFixed(6)}, ${lng.toFixed(6)}
          </p>
        </div>
      `)

      markersRef.current.push(marker)
    })

    if (bounds.length > 0) {
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [materials])

  return (
    <div className="bg-bizouk-black-light border-2 border-bizouk-gold rounded-lg overflow-hidden">
      <div className="bg-black border-b-2 border-bizouk-gold p-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MapPin className="text-bizouk-gold" />
          Carte Interactive - Matériel Géolocalisé
        </h2>
        <p className="text-sm opacity-70 mt-1">
          {materials.length} matériel{materials.length > 1 ? 's' : ''} affiché{materials.length > 1 ? 's' : ''} sur la carte
        </p>
      </div>

      {materials.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 text-center p-8">
          <MapPin className="text-bizouk-gold opacity-50 mb-4" size={64} />
          <p className="text-xl opacity-70 mb-2">Aucun matériel géolocalisé</p>
          <p className="text-sm opacity-50">
            Assignez du matériel pour le voir apparaître sur la carte
          </p>
        </div>
      ) : (
        <div ref={mapRef} className="h-[600px] w-full" />
      )}

      <div className="bg-black border-t-2 border-bizouk-gold p-4">
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-bizouk-gold"></div>
            <span className="text-sm">Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-bizouk-gold"></div>
            <span className="text-sm">Assigné</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-bizouk-gold"></div>
            <span className="text-sm">Hors Service</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapView
