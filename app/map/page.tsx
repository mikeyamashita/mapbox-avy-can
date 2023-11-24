
import React, { useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Mapbox from '../components/mapbox'

export default async function Page() {

    return (
        <div>
            <Mapbox />
        </div>
    );

}