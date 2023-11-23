'use client'

import React from 'react';
import { ScrollShadow } from "@nextui-org/react";

import Area from '../models/area';
import { useGetAllAreasQuery, useGetMetadataQuery } from '../data/avalanche-canada-service';
import styles from './area.module.scss';
import AreaCard from './area-card'

export default function Area() {

    // const { data: getAreas, error: AreaError } = useGetAllAreasQuery()
    // console.log('console log areadata:', getAreas)

    // const { data: getMetadata, error: MetadataError } = useGetMetadataQuery()
    // console.log('console log metadata:', getMetadata)

    return (
        <div className={styles.area}>
            <div className={styles.scrollshadowContainer}>
                <ScrollShadow hideScrollBar className={styles.scrollshadowContainer}>
                    <div className={styles.containerSnap}>
                        <AreaCard />
                    </div>
                    <div className={styles.containerSnap}>
                        <AreaCard />
                    </div>
                    <div className={styles.containerSnap}>
                        <AreaCard />
                    </div>
                    <div className={styles.containerSnap}>
                        <AreaCard />
                    </div>
                </ScrollShadow>
            </div>
        </div>
    )
}


