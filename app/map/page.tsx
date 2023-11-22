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