import s from './AddBookButton.module.css'

export const AddBookButton: React.FC<{setShowModal: (a: boolean) => void}> = ({setShowModal}) => {
	return (
		<div
			className={s.Root}
			onClick={() => setShowModal(true)}
		>
			Add a book
		</div>
	)
}
