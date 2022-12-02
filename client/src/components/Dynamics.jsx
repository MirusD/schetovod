import React from 'react'
import CardInfo from "./common/cards/CardInfo";
import LineChart from "./common/charts/LineChart";

const data = [
    {
        "id": "Баланс",
        "color": "hsl(121, 82%, 42%)",
        "data": [
            {
                "x": "01.2022",
                "y": 60
            },
            {
                "x": "02.2022",
                "y": 65
            },
            {
                "x": "03.2022",
                "y": 70
            },
            {
                "x": "04.2022",
                "y": 70
            },
            {
                "x": "05.2022",
                "y": 80
            },
            {
                "x": "06.2022",
                "y": 90
            },
            {
                "x": "07.2022",
                "y": 95
            },
            {
                "x": "08.2022",
                "y": 96
            },
            {
                "x": "09.2022",
                "y": 100
            },
            {
                "x": "10.2022",
                "y": 120
            },
            {
                "x": "11.2022",
                "y": 130
            },
            {
                "x": "12.2022",
                "y": 140
            }
        ]
    },
    {
        "id": "Долги",
        "color": "#000000",
        "data": [
            {
                "x": "01.2022",
                "y": 40
            },
            {
                "x": "02.2022",
                "y": 40
            },
            {
                "x": "03.2022",
                "y": 35
            },
            {
                "x": "04.2022",
                "y": 32
            },
            {
                "x": "05.2022",
                "y": 31
            },
            {
                "x": "06.2022",
                "y": 30
            },
            {
                "x": "07.2022",
                "y": 27
            },
            {
                "x": "08.2022",
                "y": 25
            },
            {
                "x": "09.2022",
                "y": 22
            },
            {
                "x": "10.2022",
                "y": 20
            },
            {
                "x": "11.2022",
                "y": 18
            },
            {
                "x": "12.2022",
                "y": 15
            }
        ]
    }
]

const Dynamics = () => {
    return (
        <CardInfo className="h-96">
            <CardInfo.Title>Динамика</CardInfo.Title>
            <CardInfo.Content>
                <LineChart data={data}/>
            </CardInfo.Content>
        </CardInfo>
    )
}

export default Dynamics
