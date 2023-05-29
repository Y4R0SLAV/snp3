import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store'
import {BookItemType} from 'components/Catalog/BookItems/BookItem/BookItem'

interface BooksState {
	books: Array<BookItemType>
	currentBook?: BookItemType
	booksIsPending: boolean
	bookIsPending: boolean
	errorMessage: string
}

const initialState: BooksState = {
	books: [],
	currentBook: undefined,
	booksIsPending: true,
	bookIsPending: true,
	errorMessage: '',
}
// book(s) is pending = true, чтобы сразу прелоадер показывать а не ждать запроса fetchBooks, он в любом случае будет вызван
// количество книг не измяется при инициализации книг, т.к. книги инициализируются уже отфильтрованные
// но изменяется при каждом fetchBooks в saga

export const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		addBook: (state, action: PayloadAction<BookItemType>) => {
			state.books.push({...action.payload, id: Date.now()})
		},

		editBook: (state, action: PayloadAction<BookItemType>) => {
			state.books = state.books.map((book) => {
				if (book.id === action.payload.id) {
					return (book = action.payload)
				}
				return book
			})
		},

		removeBook: (state, action: PayloadAction<number>) => {
			state.books = [...state.books.filter((book) => book.id !== action.payload)]
		},

		setCurrentBook: (state, action: PayloadAction<BookItemType>) => {
			state.currentBook = action.payload
		},
		setBooksIsPending: (state, action: PayloadAction<boolean>) => {
			state.booksIsPending = action.payload
		},

		fetchBooksSuccess: (state, action: PayloadAction<Array<BookItemType>>) => {
			state.books = action.payload
			state.booksIsPending = false
			state.errorMessage = ''
			// обнуляю еррор потому что он у меня один для двух полей
		},
		fetchBooksFailure: (state, action: PayloadAction<string>) => {
			state.errorMessage = action.payload
			state.booksIsPending = false
		},

		fetchBookSuccess: (state, action: PayloadAction<BookItemType>) => {
			state.currentBook = action.payload
			state.bookIsPending = false
			state.errorMessage = ''
		},
		fetchBookFailure: (state, action: PayloadAction<string>) => {
			state.errorMessage = action.payload
			state.bookIsPending = false
		},

		// для redux-saga
		fetchBooks: (state, action: PayloadAction<{query: string; page: number; pageSize: number}>) => {
			state.booksIsPending = true
		},
		fetchBook: (state, action: PayloadAction<string>) => {
			state.bookIsPending = true
		},
		asyncAddBook: (state, action: PayloadAction<BookItemType>) => {},
		asyncRemoveBook: (state, action: PayloadAction<number>) => {},
		asyncEditBook: (state, action: PayloadAction<BookItemType>) => {},
	},
})

export const {
	addBook,
	removeBook,
	setCurrentBook,
	setBooksIsPending,
	editBook,
	fetchBooks,
	fetchBooksSuccess,
	fetchBooksFailure,
	fetchBook,
	fetchBookSuccess,
	fetchBookFailure,
	asyncAddBook,
	asyncRemoveBook,
	asyncEditBook,
} = booksSlice.actions

export const selectBooks = (state: RootState) => state.books.books
export const selectBook = (state: RootState) => state.books.currentBook
export const selectBooksIsPending = (state: RootState) => state.books.booksIsPending
export const selectBookIsPending = (state: RootState) => state.books.bookIsPending
export const selectErrorMessage = (state: RootState) => state.books.errorMessage

export default booksSlice.reducer
