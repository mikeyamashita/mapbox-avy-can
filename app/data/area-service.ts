import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Area from '../models/area'

// Define a service using a base URL and expected endpoints
export const areasApi = createApi({
    reducerPath: 'getAreas',
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.avalanche.ca/forecasts/en/" }),
    endpoints: (builder) => ({
        getAllAreas: builder.query<Area, void>({
            query: () => `areas`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllAreasQuery } = areasApi