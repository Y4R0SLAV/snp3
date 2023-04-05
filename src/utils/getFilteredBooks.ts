import {BookItemType} from 'components/Catalog/BookItems/BookItem/BookItem'
import {exhaustiveCheck} from './functions'

type filterFieldType = '' | 'author' | 'title' | 'authorOrTitle' | 'authorAndTitle'

export const getFilteredBooks = (
	books: Array<BookItemType>,
	authorQuery = '',
	titleQuery = '',
	filterField: filterFieldType,
) => {
	authorQuery = authorQuery.toLowerCase()
	titleQuery = titleQuery.toLowerCase()

	if (filterField === '') {
		return books
	}

	const filteredBooks = books.filter((book) => {
		const bookAuthorContains = book.author.toLowerCase().includes(authorQuery)
		const bookTitleContains = book.title.toLowerCase().includes(titleQuery)

		// console.log(bookAuthorContains, bookTitleContains)
		// console.log(book.author, authorQuery, book.title, titleQuery)

		switch (filterField) {
			case 'author':
				return bookAuthorContains
			case 'title':
				return bookTitleContains
			case 'authorOrTitle':
				return bookAuthorContains || bookTitleContains
			case 'authorAndTitle':
				return bookAuthorContains && bookTitleContains
			default:
				return exhaustiveCheck(filterField)
		}
	})
	
	return filteredBooks
}
