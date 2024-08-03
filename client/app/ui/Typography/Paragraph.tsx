import cn from '@/app/utils/className'
import React from 'react'
import { ComponentProps } from 'react'

type Props = ComponentProps<'p'> & {
    children: string
}

const Paragraph = ({className, children}: Props) => {
  return (
    <p className={cn(className+ "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white")}>{children}</p>
  )
}
export default  Paragraph
