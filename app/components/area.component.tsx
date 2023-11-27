'use client'

import React, { useEffect, useRef } from 'react';
import { ScrollShadow } from "@nextui-org/react";

import { useGetForecastsQuery } from '../data/avalanche-canada-service';
import styles from './area.module.scss';
import AreaCard from './area-card.component'
import Forecast from '../models/forecast';

export default function AreaComponent(props) {

    // useEffect(() => {
    //     if (document.getElementById("areaScrollContainer"))
    //     document.getElementById("areaScrollContainer").onscrollend = (event) => {
    //         console.log('console log scroll end event', event.target["scrollTop"])
    //         // var element = document.getElementById(productid);
    //     };
    //     return () => {
    //         document.removeEventListener("scrollend", event => { });
    //     }
    // }, []);

    const { data: getForecastdata, error: ForecastError, isLoading } = useGetForecastsQuery()

    let forecast = useRef(null)
    if (getForecastdata) {
        forecast.current = getForecastdata
        if (props.areaId) {
            areaIdClicked()
        }
    }

    if (isLoading) return <div></div>

    // Events
    function scrollToCard(productid) {
        var element = document.getElementById(productid);
        element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }

    function areaIdClicked() {
        console.log("console log areaIdClicked from area", props.areaId)
        scrollToCard(props.areaId)
    }

    return (
        <div className={styles.area}>
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


