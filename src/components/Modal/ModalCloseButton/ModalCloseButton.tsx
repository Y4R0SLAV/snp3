import s from './ModalCloseButton.module.css'

type PropsType = {
	onClick: () => void
}

export const ModalCloseButton: React.FC<PropsType> = ({onClick}) => {
	return (
		<div
			onClick={onClick}
			className={s.close}
		></div>
	)
}
