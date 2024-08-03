import cn from '@/app/utils/className'
import React from 'react'
import { ComponentProps } from 'react'
import { colors } from '../colors'

type Props =  ComponentProps<'h3'> & {
    children: string[]
}

const Header3 = ({className, children}: Props) => {

  return (
    <h3 className={cn(className+ `mb-2 text-3xl font-bold text-white text-center tracking-wider`)} >{children}</h3>
  )
}

export default Header3
