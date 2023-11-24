'use client'

import React, { useRef } from 'react';
import { ScrollShadow } from "@nextui-org/react";

import Area from '../models/area';
import { useGetAllAreasQuery, useGetForecastsQuery, useGetMetadataQuery } from '../data/avalanche-canada-service';
import styles from './area.module.scss';
import AreaCard from './area-card'
import Forecast from '../models/forecast';

export default function AreaComponent(event) {

    const { data: getForecastdata, error: ForecastError, isLoading } = useGetForecastsQuery()

    let forecast = useRef(null)
    if (getForecastdata)
        forecast.current = getForecastdata
    console.log('console log forecast:', forecast.current)

    if (isLoading) <div></div>

    return (
        <div className={styles.area}>
            <div className={styles.scrollshadowContainer}>
                <ScrollShadow hideScrollBar className={styles.scrollshadowContainer}>
                    {forecast.current?.map((product: Forecast) => (
                        <div id={product.area.id} className={styles.containerSnap} key={product.id}>
                            <AreaCard data={product} isLoading={isLoading} cardPressed={event.cardPressed} />
                        </div>
                    ))}
                </ScrollShadow>
            </div>
        </div>
    )
}


