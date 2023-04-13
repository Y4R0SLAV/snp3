import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store'
import {ModalType, addingType} from './types'

export interface BookItemType {
	id: number
	title: string
	author: string
	imgSrc: string
	ISBN: string
	publishYear: number
	publisher: string
	description: string
}

interface BooksState {
	books: Array<BookItemType>
	currentBook?: BookItemType
	modalType: ModalType
	showModal: boolean
	searchQuery: string
	totalBooksCount: number
}

const initialState: BooksState = {
	books: [],
	currentBook: undefined,
	modalType: addingType,
	showModal: false,
	searchQuery: '',
	totalBooksCount: 0,
}
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

		initializeBooks: (state, action: PayloadAction<Array<BookItemType>>) => {
			state.books = action.payload
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

		// для redux-saga
		fetchBooks: (state, action: PayloadAction<string>) => {},
		fetchBook: (state, action: PayloadAction<string>) => {},
		asyncAddBook: (state, action: PayloadAction<BookItemType>) => {},
		asyncRemoveBook: (state, action: PayloadAction<number>) => {},
		asyncEditBook: (state, action: PayloadAction<BookItemType>) => {},
	},
})

export const {
	addBook,
	removeBook,
	initializeBooks,
	setModalType,
	toggleModalWindow,
	setCurrentBook,
	editBook,
	setSearchQuery,
	setTotalBooksCount,
	fetchBooks,
	fetchBook,
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

export default booksSlice.reducer
