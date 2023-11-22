'use client'

import React from 'react';
import { useEffect, useRef } from 'react';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useGetAllAreasQuery } from '../data/area-service';
import Area from '../models/area';

export default function Mapbox() {

    const mapContainer = useRef(null);
    const map = useRef(null);

    const { data, error, isLoading, isSuccess, refetch } = useGetAllAreasQuery()

    console.log('console log data:', data)
    console.log('console log isLoading:', isLoading)
    console.log('console log isSuccess:', isSuccess)

    let dataSuccess = useRef(null)
    if (data)
        dataSuccess.current = data

    useEffect(() => {

        if (map.current) return; // initialize map only once

        map.current = new mapboxgl.Map({
            accessToken: process.env.NEXT_PUBLIC_MAPBOX_KEY,
            container: mapContainer.current, // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [-106.3468, 56.1304], // starting position [lng, lat] - center of canada
            zoom: 6, // starting zoom
        });
        // map.current.on('style.load', () => {
        //     map.current.addSource('mapbox-dem', {
        //         'type': 'raster-dem',
        //         'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        //         'tileSize': 512,
        //         'maxzoom': 14
        //     });
        //     // add the DEM source as a terrain layer with exaggerated height
        //     map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
        // });

        const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            fitBoundsOptions: { linear: true, maxZoom: 6 },
            trackUserLocation: true,
            showUserHeading: true
        })
        map.current.addControl(geolocate);


        map.current.on('load', () => {
            geolocate.trigger();

            console.log('console log on load')

            // refetch()
            // console.log('console log on load refetch:', data)


            // if (isSuccess) {

            // setTimeout(() => {
            // console.log('console log on load isSuccess', dataSuccess.current['features'])

            let featureCollection

            dataSuccess.current['features'].forEach(features => {

                featureCollection = features

                map.current.addSource(features['id'], {
                    'type': 'geojson',
                    'data': featureCollection
                })

                console.log('console log featureCollection:', featureCollection)

                map.current.addLayer({
                    'id': features['id'],
                    'type': 'fill',
                    'source': features['id'], // reference the data source
                    'layout': {},
                    'paint': {
                        'fill-color': '#' + Math.floor(Math.random() * 16777215).toString(16), // random color fill
                        'fill-opacity': 0.5
                    }
                });
            })

            // }, 2000);

        })
    }, []);

    return <div ref={mapContainer} id="mapbox" className="mapbox" style={{ height: '100vh', width: '100vw' }}></div>
}


