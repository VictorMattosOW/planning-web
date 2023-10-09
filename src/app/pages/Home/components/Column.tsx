import { Card } from './Card'

interface ColumnProps {
  day: string
}

export function Column({ day }: ColumnProps) {
  return (
    <div className="">
      <div
        className="max-w-[190px] min-h-[736px] 
      bg-[#272B34] rounded-lg flex items-center flex-col p-2 gap-2"
      >
        <h1 className="text-bold text-2xl mb-2">{day}</h1>

        <Card />
      </div>
    </div>
  )
}
