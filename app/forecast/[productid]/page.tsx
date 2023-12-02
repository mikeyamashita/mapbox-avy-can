'use client'
import React, { useRef } from 'react';

import { useGetForecastByProductIdQuery } from '../../data/avalanche-canada-service';
import Forecast from '../../models/forecast';

export default function ForecastPage({ params }: { params: { productid: string } }) {

    const { data: getForecastdata, error: ForecastError, isLoading } = useGetForecastByProductIdQuery(params.productid);
    console.log('console log: getForecastdata', getForecastdata)

    return (
        <div className='light'>
            forecast: {params.productid}
        </div>
    );

}