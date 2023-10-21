import * as Progress from '@radix-ui/react-progress'
import { Task } from '@/app/context/PlanningContext'
import { Card } from './Card'

interface ColumnProps {
  day: string
  task: Task[]
  handleDeleteTask: (id: string, day: string) => void
  handleFinishedTask: (id: string, checked: boolean, day: string) => void
}

const ProgressDemo = ({ progress }: { progress: number }) => {
  return (
    <Progress.Root
      className="relative overflow-hidden bg-[#434854] rounded- w-full h-2 rounded-b-lg"
      style={{
        // Fix overflow clipping in Safari
        // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
        transform: 'translateZ(0)',
      }}
      value={progress}
    >
      <Progress.Indicator
        className="bg-[#8325E0] w-full h-full transition-transform duration-[300ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
        style={{
          transform: `translateX(-${100 - progress}%)`,
        }}
      />
    </Progress.Root>
  )
}

export function Column({
  day,
  task,
  handleDeleteTask,
  handleFinishedTask,
}: ColumnProps) {
  const totalTasks = task.length
  const finishedTasks = task.filter((task) => task.finished).length
  const progress = ((finishedTasks / totalTasks) * 100) | 0

  return (
    <div className="min-h-[736px] w-full min-w-[190px] rounded-lg flex flex-col justify-between bg-[#272B34]">
      <div className="p-2">
        <h1 className="text-bold text-2xl mb-3 text-center">{day}</h1>
        {task.map((t) => {
          return (
            <Card
              key={t.id}
              task={t}
              dayOfWeek={day}
              handleDeleteTask={handleDeleteTask}
              handleFinishedTask={handleFinishedTask}
            />
          )
        })}
      </div>
      <ProgressDemo progress={progress} />
    </div>
  )
}
