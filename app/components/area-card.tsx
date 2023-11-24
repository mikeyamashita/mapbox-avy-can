'use client'

import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

export default function AreaCard(forecastData) {

    if (forecastData.isLoading) return <div style={{ height: '100px', padding: '10px', margin: '20px' }}></div>

    return (
        <div style={{ height: '100px', padding: '10px', margin: '20px' }}>
            <Card isPressable onPress={() => console.log("item pressed")}>
                <CardBody>
                    <div>{forecastData.data.owner.display}</div>
                </CardBody>
            </Card >
        </div >
    )
}


