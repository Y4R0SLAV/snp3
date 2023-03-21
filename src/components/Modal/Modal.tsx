import {useEffect} from 'react'
import s from './Modal.module.css'
import classNames from 'classnames/bind'

const CloseModalButton: React.FC<{onClick: () => void}> = ({onClick}) => {
	return (
		<div
			onClick={onClick}
			className={s.close}
		></div>
	)
}

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
				<CloseModalButton onClick={() => onClose()} />
				{children}
			</div>
		</div>
	)
}

