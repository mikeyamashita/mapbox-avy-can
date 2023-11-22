'use client'

import React from 'react';
import { useEffect, useRef } from 'react';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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
                            console.log('console log e', e)

                            // Ensure that if the map is zoomed out such that multiple
                            // copies of the feature are visible, the popup appears
                            // over the copy being pointed to.
                            // while (Math.abs(e.lngLat.lng - coordinates.longitude) > 180) {
                            //     coordinates.longitude += e.lngLat.lng > coordinates.longitude ? 360 : -360;
                            // }

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




        // map.current.on('mouseenter', features.id, (e) => {
        //     console.log(e)
        //     // Change the cursor style as a UI indicator.
        //     map.current.getCanvas().style.cursor = 'pointer';

        //     getMetadataData.current.forEach(data => {
        //         // if (features.id === data.area.id) {
        //         console.log('console log metadata data', data.owner.display)
        //         // Copy coordinates array.
        //         const coordinates = data.centroid;
        //         const description = data.owner.display;

        //         console.log('console log description', description)
        //         // Ensure that if the map is zoomed out such that multiple
        //         // copies of the feature are visible, the popup appears
        //         // over the copy being pointed to.
        //         while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //             coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        //         }

        //         // Populate the popup and set its coordinates
        //         // based on the feature found.
        //         popup.current.setLngLat(coordinates).setHTML(description).addTo(map.current);
        //         // }
        //     })

        //     map.current.on('mouseleave', 'MultiPolygon', () => {
        //         map.current.getCanvas().style.cursor = '';
        //         popup.current.remove();
        //     });
        // })

    }, []);

    return <div ref={mapContainer} id="mapbox" className="mapbox" style={{ height: '100vh', width: '100vw' }}></div>
}