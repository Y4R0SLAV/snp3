import Preloader from 'src/components/common/Preloader/Preloader'
import {selectBooksIsPending} from 'reducers/books'
import {useSelector} from 'react-redux'

import s from './BookError.module.css'

type BookErrorType = {
	currentBooksCount: number
	totalCount: number
	errorMessage: string
}

export const BookError: React.FC<BookErrorType> = ({
	currentBooksCount,
	totalCount,
	errorMessage,
}) => {
	let returnMessage = ''
	const isPending = useSelector(selectBooksIsPending)

	if (currentBooksCount === 0 && isPending) {
		return <Preloader />
	}

	if (errorMessage) {
		returnMessage = errorMessage
	} else if (totalCount === 0) {
		returnMessage = 'There are no books in the catalog here yet.'
	} else if (currentBooksCount === 0) {
		returnMessage = 'Nothing was found for your query.'
	}

	if (returnMessage) {
		return <div className={s.Root}> {returnMessage} </div>
	}
	return <></>
}
