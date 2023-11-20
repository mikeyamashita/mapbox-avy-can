'use client'

import React from 'react';
import { useEffect, useRef } from 'react';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Mapbox() {

    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {

        if (map.current) return; // initialize map only once

        map.current = new mapboxgl.Map({
            accessToken: process.env.NEXT_PUBLIC_MAPBOX_KEY,
            container: mapContainer.current, // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [-106.3468, 56.1304], // starting position [lng, lat]
            zoom: 6, // starting zoom
        });

        const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            fitBoundsOptions: { linear: true, maxZoom: 6 },
            trackUserLocation: true,
            showUserHeading: true
        })

    }, []);

    return <div ref={mapContainer} id="mapbox" className="mapbox" style={{ height: '100vh', width: '100vw' }}></div>
}


