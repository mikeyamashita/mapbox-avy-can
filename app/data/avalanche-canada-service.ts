import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Area from '../models/area'
import Metadata from '../models/metadata'
import Forecast from '../models/forecast'
import Point from '../models/point'


// Define a service using a base URL and expected endpoints
export const AvalancheCanadaApi = createApi({
    reducerPath: 'getAreas',
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.avalanche.ca/forecasts/en/" }),
    endpoints: (builder) => ({
        getAllAreas: builder.query<Area, void>({
            query: () => `areas`,
        }),
        getMetadata: builder.query<Metadata, void>({
            query: () => `metadata`,
        }),
        getForecasts: builder.query<Forecast, void>({
            query: () => `products`,
        }),
        getForecastByPoint: builder.query<Forecast, Point>({
            query: (point: Point) => `products/point/?'lat='${point.lat}&'long='${point.long}`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllAreasQuery, useGetMetadataQuery, useGetForecastsQuery, useGetForecastByPointQuery } = AvalancheCanadaApi;
