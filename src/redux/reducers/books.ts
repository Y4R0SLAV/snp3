import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store'
import {BookItemType} from 'components/Catalog/BookItems/BookItem/BookItem'
import {ModalType, addingType} from './types'

interface BooksState {
	books: Array<BookItemType>
	currentBook?: BookItemType
	modalType: ModalType
	showModal: boolean
	str: string
}

const initialState: BooksState = {
	books: [],
	currentBook: undefined,
	modalType: addingType,
	showModal: false,
	str: '',
}

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
		setCurrentBook: (state, action: PayloadAction<number>) => {
			state.currentBook = state.books.find((book) => book.id === action.payload)
		},
		setStr: (state, action: PayloadAction<string>) => {
			state.str = action.payload
		},

		
		// для redux-saga
		fetchBooks: (state) => {},
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
	setStr,
	fetchBooks,
	asyncAddBook,
	asyncRemoveBook,
	asyncEditBook,
} = booksSlice.actions

export const selectBooks = (state: RootState) => state.books.books
export const selectModalType = (state: RootState) => state.books.modalType
export const selectShowModal = (state: RootState) => state.books.showModal
export const selectBook = (state: RootState) => state.books.currentBook
export const selectStr = (state: RootState) => state.books.str

export default booksSlice.reducer
