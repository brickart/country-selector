import { createSlice } from '@reduxjs/toolkit'

export const countrySlice = createSlice({
  name: 'country',
  initialState: {
    selectedCountry: null,
  },
  reducers: {
    setCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
    resetCountry: (state) => {
      state.selectedCountry = null;
    },
  },
})

export const { setCountry, resetCountry } = countrySlice.actions

export const selectCountry = (state: any) => state.country.selectedCountry

export const CountryReducer = countrySlice.reducer
 
