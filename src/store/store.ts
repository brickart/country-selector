import { configureStore } from '@reduxjs/toolkit'
import { CountryReducer } from './country.reducer'

export default configureStore({
  reducer: {
    country: CountryReducer
  },
})