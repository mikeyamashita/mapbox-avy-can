export default interface Forecast {
    id: string,
    area: {
        id: string,
        bbox: []
    },
    report: {
        id: string,
        hilights: string
    }
}
