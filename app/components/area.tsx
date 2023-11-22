'use client'

import React from 'react';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks'

import { selectAllAreas } from '../store';
import Area from '../models/area';
import { useGetAllAreasQuery } from '../data/area-service';

import { fetchAreas } from '../state/area/areaSlice'

export default function Area() {

    // const dispatch = useAppDispatch()

    // useEffect(() => {
    //     dispatch(fetchAreas())
    // }, []);


    const { data, error, isLoading, isSuccess } = useGetAllAreasQuery()
    console.log('console log data:', data)
    console.log('console log isLoading:', isLoading)
    console.log('console log isSuccess:', isSuccess)

    return <div></div>;
}


