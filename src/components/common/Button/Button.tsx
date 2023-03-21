import {FC} from 'react'
import s from './Button.module.css'

interface IButtonProps {
	children?: React.ReactNode | Array<React.ReactNode>
	props?: any
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: FC<IButtonProps> = ({onClick, props, children}) => {
	return (
		<div
			className={s.Root}
			{...props}
			onClick={onClick}
		>
			{children}
		</div>
	)
}
