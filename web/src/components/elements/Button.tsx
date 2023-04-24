import { ReactNode } from 'react'

interface Props {
  className?: string
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick?: () => void
  children?: ReactNode
}

const Button = ({ className = 'button', children, type, onClick }: Props) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
