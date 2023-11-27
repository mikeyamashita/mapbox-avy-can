export default interface Forecast {
    id: string,
    area: {
        id: string,
        bbox: []
    },
    report: {
        "id": string,
        "forecaster": string,
        "dateIssued": Date,
        "validUntil": Date,
        "title": string
        "highlights": string,
        "confidence": {
            "rating": {
                "value": string
                "display": string
            },
            "statements": [

            ]
        }
    },
    "dangerRatings": [
        {
            "date": {
                "value": Date,
                "display": string
            },
            "ratings": {
                "alp": {
                    "display": string,
                    "rating": {
                        "value": string,
                        "display": string
                    }
                },
                "tln": {
                    "display": string,
                    "rating": {
                        "value": string,
                        "display": string
                    }
                },
                "btl": {
                    "display": string,
                    "rating": {
                        "value": string,
                        "display": string
                    }
                }
            }
        },
}
