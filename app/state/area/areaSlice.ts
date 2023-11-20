import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'

import { getAreasDTO } from '../../data/area-dto';
import Area from "../../models/area";

// interface Area {
//     value: number
// }
// Define the initial state using that type
const initialState: Area = {
    // value: 0
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

    },
})

export const selectAllAreas = state => state.areas.value

export const fetchAreas = createAsyncThunk('fetchAreas', async () => {
    const response = await getAreasDTO();
    return response.features.geometry.coordinates
})


export default areaSlice.reducer