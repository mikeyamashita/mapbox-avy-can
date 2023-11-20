// import { getAreasDTO } from "../data/area-dto";

export default interface Area {
    features: {
        id: string,
        geometry: {
            coordinates: [
                [
                    [
                        [
                            lat: number,
                            long: number
                        ]
                    ]
                ]
            ]
        }
    }
}

//     get areas(): string {
//         var areasData: string = ''
//         const fetchData = async () => {
//             const response = await fetch('https://api.avalanche.ca/forecasts/en/areas');
//             areasData = await response.json()

//             console.log("console log", areasData)
//         }

//         fetchData();

//         return areasData;
//     }


//     async getAreas() {
//         const areasData: Areas = await getAreasDTO();
//         return areasData;
//     }
// }
