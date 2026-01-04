import { X, Printer, Download } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useRef } from 'react'

function QRCodeModal({ material, onClose }) {
  const printRef = useRef(null)

  // Créer les données du QR code avec toutes les informations
  const qrData = JSON.stringify({
    id: material.id,
    name: material.name,
    reference: material.reference,
    category: material.category,
    type: 'BIZOUK_MATERIAL'
  })

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=600')
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>QR Code - ${material.reference}</title>
          <style>
            @media print {
              @page {
                size: A4;
                margin: 20mm;
              }
              body {
                margin: 0;
                padding: 0;
              }
            }
            body {
              font-family: Arial, sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              background: white;
              color: black;
            }
            .qr-container {
              text-align: center;
              border: 3px solid #FFD700;
              padding: 30px;
              background: white;
              max-width: 400px;
            }
            .logo {
              font-size: 32px;
              font-weight: bold;
              color: #FFD700;
              margin-bottom: 20px;
            }
            .material-info {
              margin-bottom: 20px;
            }
            .material-name {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
              color: #000;
            }
            .material-ref {
              font-size: 18px;
              color: #666;
              margin-bottom: 5px;
            }
            .material-category {
              font-size: 14px;
              color: #FFD700;
              background: #000;
              padding: 5px 10px;
              border-radius: 5px;
              display: inline-block;
            }
            .qr-code {
              margin: 20px 0;
              padding: 20px;
              background: white;
              display: inline-block;
            }
            .footer {
              margin-top: 20px;
              font-size: 12px;
              color: #999;
            }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <div class="logo">BIZ⭐UK</div>
            <div class="material-info">
              <div class="material-name">${material.name}</div>
              <div class="material-ref">Réf: ${material.reference}</div>
              <div class="material-category">${material.category}</div>
            </div>
            <div class="qr-code">
              ${printRef.current.innerHTML}
            </div>
            <div class="footer">
              Gestion Matériel Événementiel Bizouk
            </div>
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 250)
  }

  const handleDownloadSVG = () => {
    const svg = printRef.current.querySelector('svg')
    const svgData = new XMLSerializer().serializeToString(svg)
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `qrcode_${material.reference}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-bizouk-black-light border-2 border-bizouk-gold rounded-lg max-w-lg w-full">
        <div className="border-b-2 border-bizouk-gold p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">QR Code</h2>
          <button
            onClick={onClose}
            className="text-bizouk-gold hover:text-bizouk-gold-dark transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-black border-2 border-bizouk-gold rounded-lg p-6 text-center">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">{material.name}</h3>
              <p className="text-sm opacity-70 mb-1">Réf: {material.reference}</p>
              <p className="text-xs text-bizouk-gold-dark">{material.category}</p>
            </div>

            <div ref={printRef} className="bg-white p-6 rounded-lg inline-block mb-4">
              <QRCodeSVG
                value={qrData}
                size={256}
                level="H"
                includeMargin={true}
                fgColor="#000000"
                bgColor="#FFFFFF"
              />
            </div>

            <div className="text-xs opacity-70">
              <p>Scannez ce QR code pour accéder</p>
              <p>aux informations du matériel</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={handleDownloadSVG}
              className="flex items-center justify-center gap-2 bg-black border-2 border-bizouk-gold text-bizouk-gold px-4 py-3 rounded-lg font-bold hover:bg-bizouk-gold hover:text-black transition-colors"
            >
              <Download size={20} />
              Télécharger
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 bg-bizouk-gold text-black px-4 py-3 rounded-lg font-bold hover:bg-bizouk-gold-dark transition-colors"
            >
              <Printer size={20} />
              Imprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QRCodeModal
