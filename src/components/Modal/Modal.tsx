import {useEffect} from 'react'
import s from './Modal.module.css'
import classNames from 'classnames/bind'
import {ModalCloseButton} from './ModalCloseButton/ModalCloseButton'

type ModalPropsType = {
	isVisible: boolean
	onClose: () => void
	children: React.ReactNode
}

export const Modal: React.FC<ModalPropsType> = ({isVisible, onClose, children}) => {
	useEffect(() => {
		// блокиратор скролла заднего фона
		if (isVisible) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
	}, [isVisible])

	const cx = classNames.bind(s)
	return (
		<div
			className={cx({Root: true, hide: !isVisible})}
			onClick={() => onClose()}
		>
			<div
				className={s.content}
				onClick={(e) => e.stopPropagation()}
			>
				<ModalCloseButton onClick={() => onClose()} />
				{children}
			</div>
		</div>
	)
}
