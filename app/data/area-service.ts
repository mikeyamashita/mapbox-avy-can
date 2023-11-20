import { getAreasDTO } from "./area-dto";
import Areas from '../models/area'

export default class AreaService {

    async getAreas() {
        const areasData: Areas = await getAreasDTO();
        return areasData;
    }
}