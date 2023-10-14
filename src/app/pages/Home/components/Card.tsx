'use client'
import React, { useState } from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons'
import { Task } from '@/app/context/PlanningContext'

export function Card({ title, finished }: Task) {
  const [checked, setChecked] = useState(finished)

  function handleChecked(checked: boolean) {
    setChecked(checked)
  }

  return (
    <div
      className={`w-44 min-h-[70px] p-2 rounded-lg ${
        checked ? 'bg-[#00B695]' : 'bg-[#434854]'
      }`}
    >
      <div
        className={`flex justify-end text-xs ${
          checked ? 'text-black' : 'text-white'
        }`}
      >
        <button>
          <Cross1Icon />
        </button>
      </div>
      <div className="flex gap-2 items-start px-2 pb-2">
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
        <div>
          <h1 className="font-bold">{title}</h1>
          <p className={`text-xs ${checked ? 'text-black' : 'text-white'}`}>
            02h00
          </p>
        </div>
      </div>
    </div>
  )
}
