export default interface Metadata {
    area: {
        id: string,
        bbox: []
    },
    owner: {
        display: string,
        value: string,
        description: string
    },
    centroid: {
        longitude: number,
        latitude: number
    },
}
