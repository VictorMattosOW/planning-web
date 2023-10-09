'use client'
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { DayPlanning } from '@/app/context/PlanningContext'

interface HeaderProps {
  daysOfWeek: DayPlanning[]
}

interface CheckboxProps {
  selected: boolean
}
const CheckboxComponent = ({ selected }: CheckboxProps) => {
  const [checked, setChecked] = useState(selected)

  function handleChecked(checked: boolean) {
    setChecked(checked)
  }

  return (
    <Checkbox.Root
      className={`w-5 h-5 flex items-center justify-center mt-1 rounded-md border border-1 border-white ${
        checked ? 'bg-[#F2F2F2]' : 'bg-transparent'
      }`}
      defaultChecked
      id="c1"
      checked={checked}
      onCheckedChange={handleChecked}
    >
      <Checkbox.Indicator className="text-[#00B695]">
        <CheckIcon height={20} width={20} />
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
}

export function Dropdown({ daysOfWeek }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<DayPlanning[]>(daysOfWeek)

  function handleOpenModal(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      {/* Botão de ativação do dropdown */}
      <button
        className="flex items-center justify-end h-[42px] w-[200px] px-2 text-sm text-[#00B695] bg-transparent border-2 border-[#00B695] focus:outline-none rounded-md"
        onClick={handleOpenModal}
      >
        <ChevronDownIcon height={20} width={20} />
      </button>
      <label className="absolute top-[-9px] left-4 px-1 text-sm text-[#F2F2F2] font-bold bg-black">
        Pra quando?
      </label>
      {/* O dropdown em si (mostrado/oculto com base em 'isOpen') */}
      {isOpen && (
        <div className="absolute w-[200px] top-0 left-0 mt-12 bg-[#434854] rounded shadow-md p-4">
          {/* Checkbox */}
          {selectedDay.map((d, index) => {
            return (
              <label
                key={d.dayOfWeek}
                className="flex items-center justify-between gap-2"
              >
                <span className="mt-1">{d.dayOfWeek}</span>
                <CheckboxComponent key={index} selected={d.selected} />
              </label>
            )
          })}
        </div>
      )}
    </div>
  )
}
