interface ColorCardProps {
  type: 'color'
  data: ColorType
}

interface DiscountCardProps {
  type: 'discount'
  data: DiscountType
}

type CardProps = ColorCardProps | DiscountCardProps

export type ColorType = {
  id: number
  name: string
  value: string
}

export type DiscountType = {
  id: number
  name: string
  description: string
  amount: number
  isPercent: boolean
  startDate: string
  endDate: string
}


export default function Card({ type, data }: CardProps) {
  if (type === 'color') {
    // data: { id, name, value }
    return (
      <div
        key={data.id}
        className="p-4 border rounded-lg hover:shadow-md transition-shadow flex items-center space-x-3"
      >
        <div
          className="w-6 h-6 rounded border"
          style={{ backgroundColor: data.value }}
        />
        <span className="text-sm text-gray-700">{data.name}</span>
      </div>
    )
  }

  if (type === 'discount') {
    // data: { id, name, description, amount, isPercent, startDate, endDate }
    return (
      <div
        key={data.id}
        className="p-4 border rounded-lg hover:shadow-md transition-shadow"
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-md font-semibold text-gray-900">{data.name}</h3>
          <span className="text-green-600 font-bold text-lg">
            {data.isPercent
              ? `${data.amount}%`
              : `Rp${data.amount.toLocaleString('id-ID')}`}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-1">{data.description}</p>
        <p className="text-xs text-gray-400">
          Berlaku: {new Date(data.startDate).toLocaleDateString()} -{' '}
          {new Date(data.endDate).toLocaleDateString()}
        </p>
      </div>
    )
  }

  return null
}
