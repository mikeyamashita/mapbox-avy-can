'use client'

import { useDispatch } from 'react-redux'
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect } from 'react';

import { fetchAreas } from '../state/area/areaSlice'
import Area from '../models/area';
import { AppDispatch } from '../store';

export default function Area() {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

    useEffect(() => {
        dispatch(fetchAreas())
    }, []);

}


