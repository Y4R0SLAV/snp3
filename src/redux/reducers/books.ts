import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store'
import {BookItemType} from '../../components/Catalog/BookItems/BookItem/BookItem'

export const AllType = 'All'
export const ActiveType = 'Active'
export const CompletedType = 'Completed'

interface BooksState {
	books: Array<BookItemType>
}

const initialState: BooksState = {
	books: [],
}

export const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		addBook: (state, action: PayloadAction<BookItemType>) => {
			state.books.push(action.payload)
		},

		removeBook: (state, action: PayloadAction<string>) => {
			state.books = [...state.books.filter((book) => book.id !== +action.payload)]
		},

		initializeBooks: (state, action: PayloadAction<Array<BookItemType>>) => {
			state.books = action.payload
		},
	},
})

export const {addBook, removeBook, initializeBooks} = booksSlice.actions

export const selectBooks = (state: RootState) => state.books.books

export default booksSlice.reducer
