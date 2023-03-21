import {FC} from 'react'
import s from './Button.module.css'

interface IButtonProps {
	children?: React.ReactNode | Array<React.ReactNode>
	props?: any
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
	classNames?: string
}

export const Button: FC<IButtonProps> = ({onClick, props, classNames, children}) => {
	return (
		<div
			className={s.Root + ' ' + classNames}
			{...props}
			onClick={onClick}
		>
			{children}
		</div>
	)
}
