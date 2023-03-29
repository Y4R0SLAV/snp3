import {BookItemType} from './components/Catalog/BookItems/BookItem/BookItem'

const booksNameLS = 'books'

export const getBooksLS = (): Array<BookItemType> => {
	const todos = localStorage.getItem(booksNameLS)
	if (todos) {
		return JSON.parse(todos)
	}
	return []
}

export const setBooksLS = (bookList: Array<BookItemType> = []) => {
	localStorage.setItem(booksNameLS, JSON.stringify(bookList))
}
