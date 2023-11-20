import React from 'react';
import { useEffect, useRef } from 'react';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { getAreasDTO } from '../data/area-dto';
import Areas from '../models/area';

export default function Area() {
    let areaData = getAreasDTO();

    console.log('console log', areaData)


}


