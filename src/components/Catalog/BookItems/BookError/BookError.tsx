import {Preloader} from 'src/components/common/Preloader/Preloader'

import s from './BookError.module.css'
import {useSelector} from 'react-redux'
import {selectErrorMessage} from 'reducers/books'

type BookErrorType = {
	currentBooksCount: number
	totalCount: number
	isPending: boolean
}

export const BookError: React.FC<BookErrorType> = ({currentBooksCount, totalCount, isPending}) => {
	const errorMessage = useSelector(selectErrorMessage)
	let returnMessage = ''

	if (isPending) {
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
