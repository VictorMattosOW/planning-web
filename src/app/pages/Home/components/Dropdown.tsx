'use client'
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Checkbox from '@radix-ui/react-checkbox'
import { DayPlanning } from '@/app/context/PlanningContext'

interface HeaderProps {
  daysOfWeek: DayPlanning[]
  handleCheckbox: (index: number) => void
}

interface CheckboxProps {
  selected: boolean
  index: number
  handleCheckbox: (index: number) => void
}
const CheckboxComponent = ({
  selected,
  index,
  handleCheckbox,
}: CheckboxProps) => {
  return (
    <Checkbox.Root
      className={`w-5 h-5 flex items-center justify-center mt-1 rounded-md border border-1 border-white ${
        selected ? 'bg-[#F2F2F2]' : 'bg-transparent'
      }`}
      defaultChecked
      id="c1"
      checked={selected}
      onCheckedChange={() => handleCheckbox(index)}
    >
      <Checkbox.Indicator className="text-[#00B695]">
        <CheckIcon height={20} width={20} />
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
}

export function Dropdown({ daysOfWeek, handleCheckbox }: HeaderProps) {
  function handleOpenModal(event: Event) {
    event.preventDefault()
  }
  return (
    <div className="relative">
      <DropdownMenu.Root>
        <DropdownMenu.Label className="absolute top-[-9px] left-4 px-1 text-sm text-[#F2F2F2] font-bold bg-black">
          Pra quando?
        </DropdownMenu.Label>
        <DropdownMenu.Trigger asChild>
          <button className="flex items-center justify-end h-[42px] w-[200px] px-2 text-sm text-[#00B695] bg-transparent border-2 border-[#00B695] focus:outline-none rounded-md">
            <ChevronDownIcon height={20} width={20} />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className="w-[200px] p-4 bg-[#434854] rounded-lg mt-1 cursor-pointer flex flex-col gap-2">
            {daysOfWeek.map((item, index) => {
              return (
                <DropdownMenu.Item
                  onSelect={handleOpenModal}
                  key={item.dayOfWeek}
                  className="flex justify-between items-center outline-none"
                >
                  {item.dayOfWeek}
                  <CheckboxComponent
                    index={index}
                    selected={item.selected}
                    key={index}
                    handleCheckbox={handleCheckbox}
                  />
                </DropdownMenu.Item>
              )
            })}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}
