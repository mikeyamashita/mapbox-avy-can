import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Mapbox from '../components/mapbox'
import Area from '../components/area'


export default async function Page() {

    return (
        <div>
            <Mapbox />
            {/* <Area /> */}
        </div>
    );

}

//     const mapContainer = useRef(null);
//     const map = useRef(null);


//     useEffect(() => {

//         if (map.current) return; // initialize map only once

//         map.current = new mapboxgl.Map({
//             accessToken: process.env.NEXT_PUBLIC_MAPBOX_KEY,
//             container: mapContainer.current, // container ID
//             style: 'mapbox://styles/mapbox/streets-v12', // style URL
//             center: [-106.3468, 56.1304], // starting position [lng, lat]
//             zoom: 6, // starting zoom
//         });

//         const geolocate = new mapboxgl.GeolocateControl({
//             positionOptions: {
//                 enableHighAccuracy: true
//             },
//             fitBoundsOptions: { linear: true, maxZoom: 6 },
//             trackUserLocation: true,
//             showUserHeading: true
//         })

//         map.current.addControl(geolocate);

//         map.current.on('load', () => {
//             console.log('A load event occurred.');

//             geolocate.trigger();

//             // Add a data source containing GeoJSON data.
//             map.current.addSource('maine', {
//                 'type': 'geojson',
//                 'data': {
//                     'type': 'Feature',
//                     'geometry': {
//                         'type': 'Polygon',
//                         // These coordinates outline Maine.
//                         'coordinates': []
//                     }
//                 }
//             });

//             // Add a new layer to visualize the polygon.
//             map.current.addLayer({
//                 'id': 'maine',
//                 'type': 'fill',
//                 'source': 'maine', // reference the data source
//                 'layout': {},
//                 'paint': {
//                     'fill-color': '#0080ff', // blue color fill
//                     'fill-opacity': 0.5
//                 }
//             });
//             // // Add a black outline around the polygon.
//             // map.addLayer({
//             //     'id': 'outline',
//             //     'type': 'line',
//             //     'source': 'maine',
//             //     'layout': {},
//             //     'paint': {
//             //         'line-color': '#000',
//             //         'line-width': 3
//             //     }
//             // });

//         });

//         // Create a new marker.
//         const marker = new mapboxgl.Marker()
//             .setLngLat([-113.4937, 53.5461])
//             .addTo(map.current);
//     }, []);


//     return <div ref={mapContainer} id="mapbox" className="mapbox" style={{ height: '100vh', width: '100vw' }}></div>
// }


