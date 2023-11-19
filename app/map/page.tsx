import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect } from 'react';

export default function Page() {

    initMap();

    return <div id="mapbox" className="mapbox" style={{ height: '100vh', width: '100vw' }}></div>
}

var map: any;

function initMap() {
    map = new mapboxgl.Map({
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_KEY,
        container: 'mapbox', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [-113.4937, 53.5461], // starting position [lng, lat]
        zoom: 8, // starting zoom
    });
}