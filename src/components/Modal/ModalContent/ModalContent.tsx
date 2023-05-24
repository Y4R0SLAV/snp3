import s from './ModalContent.module.css'
import {useSelector} from 'react-redux'
import {selectModalType, selectBook} from 'reducers/books'
import {addingType, showingType, redactoringType} from 'reducers/types'
import {ModalForm} from './ModalForm/ModalForm'
import {BookShowcase} from 'src/components/Catalog/BookShowcase/BookShowcase'
import {exhaustiveCheck} from 'src/utils/functions'

export const ModalContent = () => {
	const type = useSelector(selectModalType)
	const currentBook = useSelector(selectBook)

	switch (type) {
		case addingType:
			return (
				<>
					<div className={s.title}>Adding the book</div>
					<ModalForm />
				</>
			)
		case showingType:
			return (
				<>
					<div className={s.title}>Showing the book</div>
					<BookShowcase />
				</>
			)
		case redactoringType:
			return (
				<>
					<div className={s.title}>Editing the book</div>
					<ModalForm
						initialValue={currentBook}
						editing={true}
					/>
				</>
			)
		default:
			// никогда этот блок не вернется, но чтобы App.tsx не ругался, возвращаю его.
			return <>{exhaustiveCheck(type)}</>
	}
}
