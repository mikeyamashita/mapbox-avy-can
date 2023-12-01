'use client'

import React, { useEffect, useRef } from 'react';
import { ScrollShadow } from "@nextui-org/react";

import { useGetForecastsQuery } from '../data/avalanche-canada-service';
import styles from './area.module.scss';
import AreaCard from './area-card.component'
import Forecast from '../models/forecast';
import useDeviceDetection from '../utilities/useDeviceDetection';

export default function AreaComponent(props: any) {

    let forecast: any = useRef(null)
    let displayMode: any = useRef('browser tab');
    const { data: getForecastdata, error: ForecastError, isLoading } = useGetForecastsQuery()
    const device = useDeviceDetection();

    useEffect(() => {
        console.log('console log device:', device)
        if (window) {
            if (window.matchMedia('(display-mode: standalone)').matches) {
                displayMode.current = 'standalone';
            }
        }
    }, [])

    if (getForecastdata) {
        forecast.current = getForecastdata
        if (props.areaId)
            areaIdClicked()
    }

    if (isLoading) return <div></div>

    // Events
    function scrollToCard(productid: number) {
        var element: any = document.getElementById(productid.toString());
        element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }

    function areaIdClicked() {
        console.log("console log areaIdClicked from area", props.areaId)
        scrollToCard(props.areaId)
    }

    return (
        <div className={((displayMode.current == 'standalone' || device == 'iphone') || (device == 'ipad' || device == 'ipod')) ? styles.areaStandalone : styles.area}>
            <div className={styles.scrollshadowContainer}>
                <ScrollShadow id="areaScrollContainer" hideScrollBar className={styles.scrollshadowContainer}>
                    {forecast.current?.map((product: Forecast) => (
                        <div id={product.area.id} className={styles.containerSnap} key={product.id}>
                            <AreaCard data={product} isLoading={isLoading} cardPressed={props.cardPressed} />
                        </div>
                    ))}
                </ScrollShadow>
            </div>
        </div>
    )
}


