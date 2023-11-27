'use client'

import React, { useRef } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import { format } from 'date-fns';
import { Navigation2 } from 'react-feather';

import styles from './area.module.scss';

export default function AreaCard(forecastData) {

    // let highlights = useRef(null)
    // highlights.current = new DOMParser().parseFromString(forecastData.data.report.highlights, 'text/html')
    // console.log('console log highlights', highlights.current)

    if (forecastData.isLoading) return <div style={{ height: '100px', padding: '10px', margin: '20px' }}></div>

    return (
        <div className={styles.cardContainer}>
            <Card style={{ width: '100%' }} isBlurred>
                <CardHeader>
                    <div className={styles.headerContainer}>
                        <div>
                            <h1 className="text-large font-semibold leading-none text-default-600">{forecastData.data.owner.display}</h1> &nbsp; - &nbsp;
                            <h1 className="text-medium tracking-tight text-default-400">{format(new Date(forecastData.data.report.dateIssued), 'MMMM do yyyy, h:mm:ss a')}</h1>
                        </div>
                        <Button
                            isIconOnly
                            radius="full"
                            onPress={() => forecastData.cardPressed(forecastData.data.area.id)}>
                            <Navigation2 />
                        </Button>
                    </div>
                </CardHeader>
                <CardBody>
                    <div dangerouslySetInnerHTML={{ __html: forecastData.data.report.highlights }}></div>
                </CardBody>
                <CardFooter>
                    <div className={styles.ratingsContainer}>
                        <div className={styles.alpContainer}>
                            <p className="text-medium font-semibold text-default-600">{forecastData.data.report.dangerRatings[0].ratings.alp.display}</p>
                            <p> {forecastData.data.report.dangerRatings[0].ratings.alp.rating.display}</p>
                        </div>
                        <div className={styles.tlnContainer}>
                            <p className="text-medium font-semibold text-default-600">{forecastData.data.report.dangerRatings[0].ratings.tln.display}</p>
                            <p> {forecastData.data.report.dangerRatings[0].ratings.tln.rating.display}</p>
                        </div>
                        <div className={styles.btlContainer}>
                            <p className="text-medium font-semibold text-default-600">{forecastData.data.report.dangerRatings[0].ratings.btl.display}</p>
                            <p> {forecastData.data.report.dangerRatings[0].ratings.btl.rating.display}</p>
                        </div>
                    </div>
                </CardFooter>
            </Card >
        </div >
    )
}

