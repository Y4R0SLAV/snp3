import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store'
import {ModalType, addingType} from './types'

interface AppState {
	modalType: ModalType
	showModal: boolean
	searchQuery: string

	totalBooksCount: number
	currentPage: number
	pageSize: number
}

const initialState: AppState = {
	modalType: addingType,
	showModal: false,
	searchQuery: '',

	totalBooksCount: 0,
	currentPage: 2,
	pageSize: 1,
}
// book(s) is pending = true, чтобы сразу прелоадер показывать а не ждать запроса fetchBooks, он в любом случае будет вызван
// количество книг не измяется при инициализации книг, т.к. книги инициализируются уже отфильтрованные
// но изменяется при каждом fetchBooks в saga

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setModalType: (state, action: PayloadAction<ModalType>) => {
			state.modalType = action.payload
		},

		toggleModalWindow: (state) => {
			state.showModal = !state.showModal
		},
		setSearchQuery: (state, action: PayloadAction<string>) => {
			state.searchQuery = action.payload
		},
		setTotalBooksCount: (state, action: PayloadAction<number>) => {
			state.totalBooksCount = action.payload
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload
		},
	},
})

export const {setModalType, toggleModalWindow, setSearchQuery, setTotalBooksCount, setCurrentPage} =
	appSlice.actions

export const selectModalType = (state: RootState) => state.app.modalType
export const selectShowModal = (state: RootState) => state.app.showModal
export const selectSearchQuery = (state: RootState) => state.app.searchQuery
export const selectTotalBooksCount = (state: RootState) => state.app.totalBooksCount
export const selectCurrentPage = (state: RootState) => state.app.currentPage
export const selectPageSize = (state: RootState) => state.app.pageSize

export default appSlice.reducer
