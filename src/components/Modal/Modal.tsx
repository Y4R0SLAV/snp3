import s from './Modal.module.css'
import classNames from 'classnames/bind'
import {ModalAdding} from './ModalAdding/ModalAdding'
import {
	addingType,
	selectShowModal,
	showingType,
	toggleModalWindow,
	selectModalType,
} from 'reducers/books'
import {useDispatch, useSelector} from 'react-redux'
import {ModalShowing} from './ModalShowing/ModalShowing'

export const Modal = () => {
	const dispatch = useDispatch()
	const show = useSelector(selectShowModal)

	const toggleModal = () => {
		dispatch(toggleModalWindow())
	}

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
		return <ModalAdding />
	} else if (type === showingType) {
		return <ModalShowing />
	} else {
		return <>Error: incorect type of a modal window</>
	}
}
