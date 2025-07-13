
export default function CardStat({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color: string
}) {
  return (
    <div className={`p-4 rounded-xl shadow ${color}`}>
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
    </div>
  )
}