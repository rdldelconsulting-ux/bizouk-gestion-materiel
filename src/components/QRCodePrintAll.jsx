import { Printer } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useRef, useEffect } from 'react'

function QRCodePrintAll({ materials, filteredMaterials, filterActive }) {
  const qrRefs = useRef({})

  const handlePrintAll = () => {
    const materialsToUse = filterActive ? filteredMaterials : materials

    if (materialsToUse.length === 0) {
      alert('Aucun matériel à imprimer')
      return
    }

    // Créer la fenêtre d'impression
    const printWindow = window.open('', '', 'width=1200,height=800')
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>QR Codes - Matériel Bizouk</title>
          <style>
            @media print {
              @page {
                size: A4;
                margin: 10mm;
              }
              body {
                margin: 0;
                padding: 0;
              }
              .qr-item {
                page-break-inside: avoid;
              }
            }
            body {
              font-family: Arial, sans-serif;
              background: white;
              color: black;
              padding: 20px;
            }
            .qr-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 20px;
            }
            .qr-item {
              border: 3px solid #FFD700;
              padding: 20px;
              text-align: center;
              background: white;
              break-inside: avoid;
            }
            .qr-header {
              margin-bottom: 15px;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #FFD700;
              margin-bottom: 10px;
            }
            .material-name {
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 5px;
              color: #000;
            }
            .material-ref {
              font-size: 14px;
              color: #666;
              margin-bottom: 3px;
            }
            .material-category {
              font-size: 12px;
              color: #FFD700;
              background: #000;
              padding: 3px 8px;
              border-radius: 5px;
              display: inline-block;
              margin-bottom: 10px;
            }
            .qr-code {
              margin: 10px auto;
              padding: 10px;
              background: white;
              display: inline-block;
            }
            .qr-code svg {
              display: block;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              padding-top: 20px;
              border-top: 2px solid #FFD700;
              font-size: 12px;
              color: #999;
            }
          </style>
        </head>
        <body>
          <div class="qr-grid" id="qr-container"></div>
          <div class="footer">
            Gestion Matériel Événementiel Bizouk - ${materialsToUse.length} matériel${materialsToUse.length > 1 ? 's' : ''}
          </div>
        </body>
      </html>
    `)

    printWindow.document.close()

    // Ajouter les QR codes
    const qrContainer = printWindow.document.getElementById('qr-container')
    materialsToUse.forEach(material => {
      const qrRef = qrRefs.current[material.id]
      if (!qrRef) return

      const svg = qrRef.querySelector('svg')
      if (!svg) return

      const itemDiv = printWindow.document.createElement('div')
      itemDiv.className = 'qr-item'
      itemDiv.innerHTML = `
        <div class="qr-header">
          <div class="logo">BIZ⭐UK</div>
          <div class="material-name">${material.name}</div>
          <div class="material-ref">Réf: ${material.reference}</div>
          <div class="material-category">${material.category}</div>
        </div>
        <div class="qr-code">
          ${svg.outerHTML}
        </div>
      `
      qrContainer.appendChild(itemDiv)
    })

    setTimeout(() => {
      printWindow.print()
    }, 500)
  }

  const materialsToRender = filterActive ? filteredMaterials : materials

  return (
    <>
      <button
        onClick={handlePrintAll}
        className="flex items-center gap-2 bg-black border-2 border-bizouk-gold text-bizouk-gold px-4 py-3 rounded-lg font-bold hover:bg-bizouk-gold hover:text-black transition-colors"
        title={filterActive ? 'Imprimer les QR codes filtrés' : 'Imprimer tous les QR codes'}
      >
        <Printer size={20} />
        <span className="hidden md:inline">
          {filterActive ? 'Imprimer QR filtrés' : 'Imprimer tous les QR'}
        </span>
      </button>

      {/* QR codes cachés pour l'impression */}
      <div style={{ position: 'absolute', left: '-9999px' }}>
        {materialsToRender.map(material => {
          const qrData = JSON.stringify({
            id: material.id,
            name: material.name,
            reference: material.reference,
            category: material.category,
            type: 'BIZOUK_MATERIAL'
          })

          return (
            <div key={material.id} ref={el => qrRefs.current[material.id] = el}>
              <QRCodeSVG
                value={qrData}
                size={180}
                level="H"
                includeMargin={true}
                fgColor="#000000"
                bgColor="#FFFFFF"
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default QRCodePrintAll
