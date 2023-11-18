'use client'
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect } from 'react';

var map: any;

function initMap() {
    map = new mapboxgl.Map({
        accessToken: 'pk.eyJ1IjoiZHJpZWQ5NDEiLCJhIjoiY2xvbTExcTFnMHg2ZDJpczIxNmF4NjZmZyJ9.TMCo9cXWrMmOLPGHzre38g',
        container: 'mapbox', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [-113.4937, 53.5461], // starting position [lng, lat]
        zoom: 8, // starting zoom
    });
}

export default function Page() {

    useEffect(() => {
        initMap()
    });

    return <div id="mapbox" className="mapbox" style={{ height: '100vh', width: '100vw' }}></div>
}