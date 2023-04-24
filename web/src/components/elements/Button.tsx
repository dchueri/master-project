import { ReactNode } from 'react'

interface Props {
  className?: string
  type?: 'button' | 'submit' | 'reset' | undefined
  children?: ReactNode
}

const Button = ({ className = 'button', children, type }: Props) => {
  return <button className={className}>{children}</button>
}

export default Button
