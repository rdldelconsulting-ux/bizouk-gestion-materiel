import { Star } from 'lucide-react'

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="text-4xl font-bold tracking-wider">
        <span className="text-bizouk-gold">BIZ</span>
        <span className="relative inline-block">
          <span className="text-bizouk-gold">O</span>
          <Star
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-bizouk-gold"
            size={16}
            fill="#FFD700"
          />
        </span>
        <span className="text-bizouk-gold">UK</span>
      </div>
      <div className="border-l-2 border-bizouk-gold pl-3 py-1">
        <p className="text-sm font-semibold">Gestion Matériel</p>
        <p className="text-xs opacity-70">Événementiel</p>
      </div>
    </div>
  )
}

export default Logo
