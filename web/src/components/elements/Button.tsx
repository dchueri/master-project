import { ReactNode } from 'react'

interface Props {
  className?: string
  disabled?: boolean
  children?: ReactNode
}

const Button = ({ className = 'button', children }: Props) => {
  return <button className={className}>{children}</button>
}

export default Button
