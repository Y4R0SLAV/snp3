import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store'
import {ModalType, addingType} from './types'
import {BookItemType} from 'components/Catalog/BookItems/BookItem/BookItem'

interface BooksState {
	books: Array<BookItemType>
	currentBook?: BookItemType
	modalType: ModalType
	showModal: boolean
	searchQuery: string
	totalBooksCount: number
	booksIsPending: boolean
	bookIsPending: boolean
	errorMessage: string
}

const initialState: BooksState = {
	books: [],
	currentBook: undefined,
	modalType: addingType,
	showModal: false,
	searchQuery: '',
	totalBooksCount: 0,
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

		setModalType: (state, action: PayloadAction<ModalType>) => {
			state.modalType = action.payload
		},

		toggleModalWindow: (state) => {
			state.showModal = !state.showModal
		},
		setCurrentBook: (state, action: PayloadAction<BookItemType>) => {
			state.currentBook = action.payload
		},
		setSearchQuery: (state, action: PayloadAction<string>) => {
			state.searchQuery = action.payload
		},
		setTotalBooksCount: (state, action: PayloadAction<number>) => {
			state.totalBooksCount = action.payload
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
		fetchBooks: (state, action: PayloadAction<string>) => {
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
	setModalType,
	toggleModalWindow,
	setCurrentBook,
	setBooksIsPending,
	editBook,
	setSearchQuery,
	setTotalBooksCount,
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
export const selectModalType = (state: RootState) => state.books.modalType
export const selectShowModal = (state: RootState) => state.books.showModal
export const selectBook = (state: RootState) => state.books.currentBook
export const selectSearchQuery = (state: RootState) => state.books.searchQuery
export const selectTotalBooksCount = (state: RootState) => state.books.totalBooksCount
export const selectBooksIsPending = (state: RootState) => state.books.booksIsPending
export const selectBookIsPending = (state: RootState) => state.books.bookIsPending
export const selectErrorMessage = (state: RootState) => state.books.errorMessage

export default booksSlice.reducer
