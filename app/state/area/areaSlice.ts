import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import Area from "../../models/area";

const initialState: Area = {
    features: {
        id: '',
        geometry: {
            coordinates: null
        }
    }
}

export const areaSlice = createSlice({
    name: 'areas',
    initialState,
    reducers: {
    }
})

export default areaSlice.reducer