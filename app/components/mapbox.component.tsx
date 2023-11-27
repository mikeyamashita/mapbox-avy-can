'use client'

import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './mapbox.module.scss'

import { useGetAllAreasQuery, useGetMetadataQuery, useLazyGetAllAreasQuery } from '../data/avalanche-canada-service';
import AreaComponenent from './area.component';

export default function Mapbox(props) {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [areaId, setAreaId] = useState('');
    let getAreasData = useRef(null)
    let getMetadataData = useRef(null)

    const [getAreas] = useLazyGetAllAreasQuery()
    // console.log('console log areadata:', getAreas)


    // if (getAreas)
    //     getAreasData.current = getAreas

    const { data: getMetadata, error: MetadataError } = useGetMetadataQuery()
    // console.log('console log metadata:', getMetadata)

    if (getMetadata)
        getMetadataData.current = getMetadata

    useEffect(() => {

        console.log('console log use effect')
        getAreas()
            .unwrap()
            .then((fulfilled) => {
                console.log('console log areadata:', fulfilled)
                if (fulfilled)
                    getAreasData.current = fulfilled

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
                    // console.log('console log getMetadataData:', getMetadataData.current)

                    metadataData = getMetadataData.current;
                    getAreasData.current['features']?.forEach(features => {
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

                        getMetadataData.current?.forEach(data => {
                            if (features.id === data.area.id) {
                                const description = data.owner.display;
                                map.current.on('click', features.id, (e) => {
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
    function cardPressed(areaId) {
        console.log('console log cardPressed from mapbox', areaId)
        getAreasData.current['features']?.forEach(features => {
            if (features.id == areaId) {
                map.current.fitBounds(features.bbox)
            }
        })
    }

    function areaIdClicked(areaid) {
        setAreaId(areaid)
        console.log("console log areaIdClicked from mapbox", areaId)
    }

    return (
        <div>
            <div ref={mapContainer} id="mapbox" className={styles.mapbox}></div>
            <AreaComponenent cardPressed={cardPressed} areaId={areaId} areaIdClicked={areaIdClicked} />
        </div>
    )
}