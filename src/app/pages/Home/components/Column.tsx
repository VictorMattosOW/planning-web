import { Task } from '@/app/context/PlanningContext'
import { Card } from './Card'

interface ColumnProps {
  day: string
  task: Task[]
}

export function Column({ day, task }: ColumnProps) {
  return (
    <div className="">
      <div
        className="min-w-[190px] min-h-[736px]
      bg-[#272B34] rounded-lg flex items-center flex-col p-2 gap-2"
      >
        <h1 className="text-bold text-2xl mb-2">{day}</h1>
        {task.map((t) => {
          return <Card key={t.title} title={t.title} finished={t.finished} />
        })}
      </div>
    </div>
  )
}
