import { useForm } from 'react-hook-form'
import { Dropdown } from './Dropdown'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlanningContext, Task } from '@/app/context/PlanningContext'
import { useContext } from 'react'

const createNewTaskValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  timer: zod.string(),
})

type newTaskFormData = zod.infer<typeof createNewTaskValidationSchema>

export function Header() {
  const { handleCheckbox, tasks, handleAddTask } = useContext(PlanningContext)
  const { register, handleSubmit, watch, reset } = useForm<newTaskFormData>({
    resolver: zodResolver(createNewTaskValidationSchema),
    defaultValues: {
      task: '',
      timer: '',
    },
  })

  function handleCreateNewTask(data: newTaskFormData) {
    const taskToAdd: Task = {
      title: data.task,
      finished: false,
    }
    reset()
    handleAddTask(taskToAdd)
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <header className="h-24 p-5 flex items-center justify-center mb-12">
      <form
        action=""
        className="flex gap-5"
        onSubmit={handleSubmit(handleCreateNewTask)}
      >
        <div className="relative">
          <input
            className="block h-[42px] w-[400px] px-2 text-sm text-[#F2F2F2] bg-transparent border-2 border-[#00B695] focus:outline-none rounded-md"
            type="text"
            id="task"
            {...register('task')}
          />
          <label className="absolute top-[-9px] left-4 px-1 text-sm text-[#F2F2F2] font-bold bg-black">
            Qual o plano?
          </label>
        </div>
        <Dropdown daysOfWeek={tasks} handleCheckbox={handleCheckbox} />
        <div className="relative">
          <input
            className="block h-[42px] w-[190px] px-2 text-sm text-[#F2F2F2] bg-transparent border-2 border-[#00B695] focus:outline-none rounded-md"
            type="time"
            id="timer"
            {...register('timer')}
          />
          <label className="absolute top-[-9px] left-4 px-1 text-sm text-[#F2F2F2] font-bold bg-black">
            Quanto tempo
          </label>
        </div>
        <button
          className="w-[190px] h-[42px] bg-[#00B695] hover:bg-[#00A385] disabled:bg-[#535353] rounded-lg text-white font-bold text-base"
          type="submit"
          disabled={isSubmitDisabled}
        >
          {isSubmitDisabled ? 'Insira os dados' : 'Incluir'}
        </button>
      </form>
    </header>
  )
}
