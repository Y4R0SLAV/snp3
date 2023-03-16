import {useEffect} from 'react'
import {
	addingType,
	selectShowModal,
	showingType,
	toggleModalWindow,
	selectModalType,
} from 'reducers/books'
import {useDispatch, useSelector} from 'react-redux'

import ModalShowing from './ModalShowing/ModalShowing'
import ModalAdding from './ModalAdding/ModalAdding'

import s from './Modal.module.css'
import classNames from 'classnames/bind'

export const Modal = () => {
	const dispatch = useDispatch()
	const show = useSelector(selectShowModal)

	const toggleModal = () => {
		dispatch(toggleModalWindow())
	}

	useEffect(() => {
		// блокиратор скролла заднего фона
		if (show) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
	}, [show])

	const cx = classNames.bind(s)
	return (
		<div
			className={cx({Root: true, hide: !show})}
			onClick={() => toggleModal()}
		>
			<div
				className={s.content}
				onClick={(e) => e.stopPropagation()}
			>
				<ModalContent />
			</div>
		</div>
	)
}

const ModalContent = () => {
	const type = useSelector(selectModalType)

	if (type === addingType) {
		return (
			<>
				<div className={s.title}>Adding the book</div>
				<ModalAdding />
			</>
		)
	} else if (type === showingType) {
		return (
			<>
				<div className={s.title}>Showing the book</div>
				<ModalShowing />
			</>
		)
	} else {
		return <>Error: incorect type of a modal window</>
	}
}
