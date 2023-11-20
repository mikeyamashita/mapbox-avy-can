import Areas from '../models/area';
import { getAreasDTO } from '../data/area-dto';

export default async function Page() {

    console.log('console log', getAreasDTO())
    return <div>area</div>

}


