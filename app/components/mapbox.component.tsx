'use client'

import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './mapbox.module.scss'

import { useGetMetadataQuery, useLazyGetAllAreasQuery } from '../data/avalanche-canada-service';
import AreaComponenent from './area.component';

export default function Mapbox() {

    const mapContainer: any = useRef(null);
    const map: any = useRef(null);
    const [areaId, setAreaId] = useState('');
    let getAreasData: any = useRef(null);
    let getMetadataData: any = useRef(null);
    let displayMode: any = useRef('browser tab');

    const [getAreas] = useLazyGetAllAreasQuery()
    const { data: getMetadata, error: MetadataError } = useGetMetadataQuery()
    if (getMetadata)
        getMetadataData.current = getMetadata

    useEffect(() => {
        if (window) {
            if (window.matchMedia('(display-mode: standalone)').matches) {
                displayMode.current = 'standalone';
            }
            // Log launch display mode to analytics
            console.log('console log DISPLAY_MODE_LAUNCH:', displayMode.current);
        }

        getAreas()
            .unwrap()
            .then((data) => {
                if (data)
                    getAreasData.current = data

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

                    metadataData = getMetadataData.current;

                    getAreasData.current.features?.forEach((features: any) => {
                        featureCollection = features;

                        map.current.addSource(features.id, {
                            'type': 'geojson',
                            'data': featureCollection
                        })

                        var randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
                        map.current.addLayer({
                            'id': features.id,
                            'type': 'fill',
                            'source': features.id, // reference the data source
                            'layout': {},
                            'paint': {
                                'fill-color': randomColor, // random color fill
                                'fill-opacity': 0.5
                            }
                        });

                        getMetadataData.current?.forEach((data: any) => {
                            if (features.id === data.area.id) {
                                const description = data.owner.display;
                                map.current.on('click', features.id, (e: any) => {
                                    new mapboxgl.Popup({ closeButton: false })
                                        .setLngLat(e.lngLat)
                                        .setHTML(description)
                                        .addTo(map.current);
                                    areaIdClicked(features.id)
                                    setTimeout(() => { cardPressed(features.id) }, 500)
                                });
                            }
                        });
                    })
                })
            })
            .catch((rejected) => console.error('console log areadata rejected:', rejected));

    }, [])

    // Events
    function cardPressed(areaId: number) {
        getAreasData.current['features']?.forEach((features: any) => {
            if (features.id == areaId) {
                map.current.fitBounds(features.bbox)
            }
        })
    }

    function areaIdClicked(areaid: number) {
        setAreaId(areaid.toString())
    }

    return (
        <div>
            <div ref={mapContainer} id="mapbox" className={styles.mapbox}></div>
            <AreaComponenent cardPressed={cardPressed} areaId={areaId} areaIdClicked={areaIdClicked} />
        </div>
    )
}