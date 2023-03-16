import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store'
import {BookItemType} from 'components/Catalog/BookItems/BookItem/BookItem'

export const AllType = 'All'
export const ActiveType = 'Active'
export const CompletedType = 'Completed'

export const showingType = 'showing'
export const addingType = 'adding'
export const redactoringType = 'redactoring'

export type ModalType = typeof showingType | typeof addingType | typeof redactoringType

interface BooksState {
	books: Array<BookItemType>
	currentBook?: BookItemType
	modalType: ModalType
	showModal: boolean
}

const initialState: BooksState = {
	books: [],
	currentBook: undefined,
	modalType: addingType,
	showModal: false,
}

export const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		addBook: (state, action: PayloadAction<BookItemType>) => {
			state.books.push({...action.payload, id: Date.now()})
		},

		removeBook: (state, action: PayloadAction<string>) => {
			state.books = [...state.books.filter((book) => book.id !== +action.payload)]
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
	},
})

export const {
	addBook,
	removeBook,
	initializeBooks,
	setModalType,
	toggleModalWindow,
	setCurrentBook,
} = booksSlice.actions

export const selectBooks = (state: RootState) => state.books.books
export const selectModalType = (state: RootState) => state.books.modalType
export const selectShowModal = (state: RootState) => state.books.showModal
export const selectBook = (state: RootState) => state.books.currentBook

export default booksSlice.reducer
