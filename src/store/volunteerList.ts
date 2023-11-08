import type { EntityId, PayloadAction } from '@reduxjs/toolkit'
import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import type { StateRequest } from './utils'
import { elementListFetch, toastError } from './utils'
import type { AppDispatch, AppState, AppThunk, EntitiesRequest } from '.'

import type { Volunteer } from '@/services/volunteers'
import { volunteerListGet } from '@/services/volunteersAccessors'

const volunteerAdapter = createEntityAdapter<Volunteer>()

const initialState = volunteerAdapter.getInitialState({
  readyStatus: 'idle',
} as StateRequest)

const volunteerListSlice = createSlice({
  name: 'volunteerList',
  initialState,
  reducers: {
    getRequesting: (state) => {
      state.readyStatus = 'request'
    },
    getSuccess: (state, { payload }: PayloadAction<Volunteer[]>) => {
      state.readyStatus = 'success'
      volunteerAdapter.setAll(state, payload)
    },
    getFailure: (state, { payload }: PayloadAction<string>) => {
      state.readyStatus = 'failure'
      state.error = payload
    },
  },
})

export const {
  reducer: volunteerListReducer,
  actions: volunteerListActions,
} = volunteerListSlice

export const fetchVolunteerList = elementListFetch(
  volunteerListGet,
  volunteerListActions,
  (error: Error) => toastError(`Erreur lors du chargement des bénévoles: ${error.message}`),
)

const selectShouldFetchVolunteerList = (state: AppState) => state.volunteerList.readyStatus !== 'success'

export const fetchVolunteerListIfNeed: AppThunk = (id = 0) => (dispatch: AppDispatch, getState: () => AppState) => {
  let jwt = ''

  if (!id) {
    ;({ jwt, id } = getState().auth)
  }

  if (selectShouldFetchVolunteerList(getState())) {
    dispatch(fetchVolunteerList(jwt))
  }
}

export const refreshVolunteerList: AppThunk = (jwt: string) => (dispatch: AppDispatch) => dispatch(fetchVolunteerList(jwt))

export const selectVolunteerListState: EntitiesRequest<Volunteer> = (state: AppState) => state.volunteerList

export const selectVolunteerList = createSelector(
  selectVolunteerListState,
  ({ ids, entities, readyStatus }) => {
    if (readyStatus !== 'success')
      return []
    return ids.map((id: EntityId) => entities[id]) as Volunteer[]
  },
)

const fullName = (volunteer: Volunteer) => `${volunteer.firstname} ${volunteer.lastname}`

export const selectVolunteerListAlphaSorted = createSelector(selectVolunteerList, volunteer =>
  [...volunteer].sort((vA, vB) => fullName(vA).localeCompare(fullName(vB))))
