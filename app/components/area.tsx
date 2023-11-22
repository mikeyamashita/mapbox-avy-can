'use client'

import React from 'react';
// import { useEffect } from 'react';
// import { useAppSelector, useAppDispatch } from '../hooks'

// import { selectAllAreas } from '../store';
// import { fetchAreas } from '../state/area/areaSlice'
import Area from '../models/area';
import { useGetAllAreasQuery, useGetMetadataQuery } from '../data/avalanche-canada-service';

export default function Area() {

    // const dispatch = useAppDispatch()

    // useEffect(() => {
    //     dispatch(fetchAreas())
    // }, []);

    const { data: getAreas, error: AreaError } = useGetAllAreasQuery()
    console.log('console log areadata:', getAreas)

    const { data: getMetadata, error: MetadataError } = useGetMetadataQuery()
    console.log('console log metadata:', getMetadata)

    return <div></div>;
}


