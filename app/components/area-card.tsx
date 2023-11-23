'use client'

import React from 'react';
import Area from '../models/area';
import { useGetMetadataQuery } from '../data/avalanche-canada-service';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import styles from './area.module.scss';

export default function AreaCard() {

    // const { data: getMetadata, error: MetadataError } = useGetMetadataQuery()
    // console.log('console log metadata:', getMetadata)

    return (
        <div style={{ height: '100px', padding: '10px', margin: '20px' }}>
            <Card>
                <CardBody>
                    <div>area card</div>
                </CardBody>
            </Card >
        </div >
    )
}


