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
	searchQuery: string
}

const initialState: BooksState = {
	books: [],
	currentBook: undefined,
	modalType: addingType,
	showModal: false,
	searchQuery: '',
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
		setSearchQuery: (state, action: PayloadAction<string>) => {
			state.searchQuery = action.payload
		},
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
} = booksSlice.actions

export const selectBooks = (state: RootState) => state.books.books
export const selectModalType = (state: RootState) => state.books.modalType
export const selectShowModal = (state: RootState) => state.books.showModal
export const selectBook = (state: RootState) => state.books.currentBook
export const selectSearchQuery = (state: RootState) => state.books.searchQuery

export default booksSlice.reducer
