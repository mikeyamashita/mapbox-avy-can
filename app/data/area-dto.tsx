// import 'server-only';
import Areas from '../models/area'

export async function getAreasDTO() {
    const response = await fetch("https://api.avalanche.ca/forecasts/en/areas")
    const areasData: Areas = await response.json()

    console.log("console log", areasData)

    // only return the data relevant for this query and not everything
    // <https://www.w3.org/2001/tag/doc/APIMinimization>
    return areasData
}