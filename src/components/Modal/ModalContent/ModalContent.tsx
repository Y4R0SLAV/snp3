import s from './ModalContent.module.css'
import {useSelector} from 'react-redux'
import {selectModalType, selectBook} from 'reducers/books'
import {addingType, showingType, redactoringType} from 'reducers/types'
import {ModalForm} from './ModalForm/ModalForm'
import {BookShowcase} from './../../Catalog/BookShowcase/BookShowcase'

export const ModalContent = () => {
	const type = useSelector(selectModalType)
	const currentBook = useSelector(selectBook)

	if (type === addingType) {
		return (
			<>
				<div className={s.title}>Adding the book</div>
				<ModalForm />
			</>
		)
	} else if (type === showingType) {
		return (
			<>
				<div className={s.title}>Showing the book</div>
				<BookShowcase />
			</>
		)
	} else if (type === redactoringType) {
		return (
			<>
				<div className={s.title}>Editing the book</div>
				<ModalForm
					initialValue={currentBook}
					editing={true}
				/>
			</>
		)
	} else {
		return <>Error: incorect type of a modal window</>
	}
}
