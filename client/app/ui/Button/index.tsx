import React, { FC } from 'react'
import { Button, ButtonProps } from 'react-daisyui'


export const ButtonPrimry: FC<{label: string}&ButtonProps> = ({label}) => {
  return (
    <Button color={"primary"}>
        {label}
    </Button>
  )
}

export const ButtonOutline: FC<{label: string}&ButtonProps> = ({label}) =>{
    return (
        <Button color='primary' variant='outline'>
            {label}
        </Button>
      )
    }
