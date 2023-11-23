'use client'

import React from 'react';
import { useEffect, useRef } from 'react';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './mapbox.module.scss'

import { useGetAllAreasQuery, useGetMetadataQuery } from '../data/avalanche-canada-service';

export default function Mapbox() {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const popup = useRef(null)

    const { data: getAreas, error: AreaError } = useGetAllAreasQuery()
    console.log('console log areadata:', getAreas)

    let getAreasData = useRef(null)
    if (getAreas)
        getAreasData.current = getAreas

    const { data: getMetadata, error: MetadataError } = useGetMetadataQuery()
    console.log('console log metadata:', getMetadata)

    let getMetadataData = useRef(null)
    if (getMetadata)
        getMetadataData.current = getMetadata

    useEffect(() => {
        if (map.current) return; // initialize map only once

        map.current = new mapboxgl.Map({
            accessToken: process.env.NEXT_PUBLIC_MAPBOX_KEY,
            container: mapContainer.current, // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [-106.3468, 56.1304], // starting position [lng, lat] - center of canada
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
        map.current.addControl(geolocate);

        map.current.on('load', () => {
            geolocate.trigger();

            let featureCollection;
            let metadataData;
            console.log('console log getMetadataData:', getMetadataData.current)

            metadataData = getMetadataData.current;
            getAreasData.current['features'].forEach(features => {
                featureCollection = features;

                map.current.addSource(features.id, {
                    'type': 'geojson',
                    'data': featureCollection
                })

                map.current.addLayer({
                    'id': features.id,
                    'type': 'fill',
                    'source': features.id, // reference the data source
                    'layout': {},
                    'paint': {
                        'fill-color': '#' + Math.floor(Math.random() * 16777215).toString(16), // random color fill
                        'fill-opacity': 0.5
                    }
                });

                getMetadataData.current.forEach(data => {
                    if (features.id === data.area.id) {
                        console.log('console log metadata data', data.owner.display)
                        // Copy coordinates array.
                        const coordinates = data.centroid;
                        const description = data.owner.display;
                        console.log('console log description', description)
                        map.current.on('click', features.id, (e) => {
                            let mapboxlngLat = { 'lng': coordinates.longitude, 'lat': coordinates.latitude }
                            console.log(mapboxlngLat)
                            new mapboxgl.Popup({ closeButton: false })
                                .setLngLat(e.lngLat)
                                .setHTML(description)
                                .addTo(map.current);
                        });
                    }
                });
            })
        })
    }, []);

    return <div ref={mapContainer} id="mapbox" className={styles.mapbox}></div>
}