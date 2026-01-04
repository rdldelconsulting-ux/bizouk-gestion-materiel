import { useState, useEffect, useRef } from 'react'
import { X, Camera, AlertCircle, CheckCircle } from 'lucide-react'
import { Html5Qrcode } from 'html5-qrcode'

function QRScanner({ materials, onClose, onMaterialFound }) {
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState(null)
  const [lastScan, setLastScan] = useState(null)
  const scannerRef = useRef(null)
  const qrCodeRef = useRef(null)

  useEffect(() => {
    startScanner()
    return () => {
      stopScanner()
    }
  }, [])

  const startScanner = async () => {
    try {
      setError(null)

      // Créer l'instance du scanner
      qrCodeRef.current = new Html5Qrcode("qr-reader")

      // Configuration du scanner
      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      }

      // Démarrer le scanner
      await qrCodeRef.current.start(
        { facingMode: "environment" }, // Caméra arrière
        config,
        onScanSuccess,
        onScanError
      )

      setIsScanning(true)
    } catch (err) {
      console.error("Erreur lors du démarrage du scanner:", err)
      setError("Impossible d'accéder à la caméra. Vérifiez les permissions.")
      setIsScanning(false)
    }
  }

  const stopScanner = async () => {
    if (qrCodeRef.current && isScanning) {
      try {
        await qrCodeRef.current.stop()
        qrCodeRef.current.clear()
      } catch (err) {
        console.error("Erreur lors de l'arrêt du scanner:", err)
      }
    }
  }

  const onScanSuccess = (decodedText) => {
    try {
      // Parser les données JSON du QR code
      const data = JSON.parse(decodedText)

      // Vérifier que c'est un QR code Bizouk
      if (data.type !== 'BIZOUK_MATERIAL') {
        setError("Ce QR code n'est pas un matériel Bizouk")
        return
      }

      // Chercher le matériel dans la base
      const material = materials.find(m => m.id === data.id)

      if (!material) {
        setError(`Matériel non trouvé: ${data.reference}`)
        setLastScan(data)
        return
      }

      // Matériel trouvé !
      setLastScan(material)
      setError(null)

      // Appeler le callback
      if (onMaterialFound) {
        onMaterialFound(material)
      }

      // Arrêter le scanner après un scan réussi
      stopScanner()
      setIsScanning(false)
    } catch (err) {
      // Si ce n'est pas du JSON, ignorer
      console.log("QR code non-JSON ignoré:", decodedText)
    }
  }

  const onScanError = (errorMessage) => {
    // Ignorer les erreurs de scan normales (pas de QR code visible)
    // On ne les affiche pas à l'utilisateur
  }

  const handleClose = async () => {
    await stopScanner()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-bizouk-black-light border-2 border-bizouk-gold rounded-lg max-w-2xl w-full">
        <div className="border-b-2 border-bizouk-gold p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Camera className="text-bizouk-gold" size={24} />
            <h2 className="text-2xl font-bold">Scanner QR Code</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-bizouk-gold hover:text-bizouk-gold-dark transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Zone de scan */}
          <div className="bg-black border-2 border-bizouk-gold rounded-lg p-4 mb-4">
            <div
              id="qr-reader"
              className="rounded-lg overflow-hidden"
              style={{ width: '100%' }}
            ></div>
          </div>

          {/* Instructions */}
          {isScanning && !error && !lastScan && (
            <div className="bg-blue-500/10 border-2 border-blue-500 rounded-lg p-4 mb-4">
              <p className="text-blue-500 text-center">
                <Camera className="inline mr-2" size={16} />
                Pointez la caméra vers un QR code Bizouk
              </p>
            </div>
          )}

          {/* Erreur */}
          {error && (
            <div className="bg-red-500/10 border-2 border-red-500 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-red-500 font-semibold">Erreur</p>
                  <p className="text-red-400 text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Succès */}
          {lastScan && !error && (
            <div className="bg-green-500/10 border-2 border-green-500 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2 mb-3">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-green-500 font-semibold">Matériel trouvé !</p>
                </div>
              </div>

              <div className="bg-black border-2 border-bizouk-gold rounded-lg p-4">
                <h3 className="text-xl font-bold text-bizouk-gold mb-2">
                  {lastScan.name}
                </h3>
                <div className="space-y-1 text-sm">
                  <p className="opacity-80">
                    <span className="font-semibold">Réf:</span> {lastScan.reference}
                  </p>
                  <p className="opacity-80">
                    <span className="font-semibold">Catégorie:</span> {lastScan.category}
                  </p>
                  {lastScan.description && (
                    <p className="opacity-80">
                      <span className="font-semibold">Description:</span> {lastScan.description}
                    </p>
                  )}
                  <div className="mt-3 pt-3 border-t border-bizouk-gold">
                    <p className="opacity-80">
                      <span className="font-semibold">Statut:</span>{' '}
                      {lastScan.status === 'available' && <span className="text-green-500">Disponible</span>}
                      {lastScan.status === 'assigned' && <span className="text-blue-500">Assigné</span>}
                      {lastScan.status === 'hs' && <span className="text-red-500">Hors Service</span>}
                    </p>
                    {lastScan.assignedTo && (
                      <p className="opacity-80 mt-1">
                        <span className="font-semibold">Assigné à:</span> {lastScan.assignedTo}
                      </p>
                    )}
                    {lastScan.hsHistory && lastScan.hsHistory.length > 0 && (
                      <p className="opacity-80 mt-1 text-red-400">
                        <span className="font-semibold">Pannes:</span> {lastScan.hsHistory.length}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Conseils */}
          <div className="bg-bizouk-gold/10 border border-bizouk-gold rounded-lg p-4">
            <p className="text-xs opacity-70">
              <strong>Conseils:</strong><br />
              • Assurez-vous que le QR code est bien éclairé<br />
              • Tenez le téléphone stable<br />
              • Ajustez la distance si nécessaire<br />
              • Le scanner s'arrête automatiquement après détection
            </p>
          </div>

          {/* Bouton fermer */}
          <button
            onClick={handleClose}
            className="w-full mt-4 bg-bizouk-gold text-black px-6 py-3 rounded-lg font-bold hover:bg-bizouk-gold-dark transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}

export default QRScanner
