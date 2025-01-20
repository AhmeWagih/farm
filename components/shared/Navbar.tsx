'use client'

import { NavbarItems } from '@/constants'
import { INavbarProps } from '@/types'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

const Navbar = ({ setActiveItem, activeItem }: INavbarProps) => {
  return (
    <div className="bg-gray-100 py-4 px-4 sm:px-9">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="font-semibold font-serif w-full max-w-[384px] flex justify-between items-start">
            {NavbarItems.find(item => item.id === activeItem)?.title || 'Select Item'}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col gap-1 text-left w-[calc(100vw-2rem)] sm:w-[384px]">
          {NavbarItems.map((item) => (
            <DropdownMenuItem 
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={activeItem === item.id ? 'bg-accent' : ''}
            >
              {item.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Navbar