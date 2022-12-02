import React, {useRef, useState} from 'react'
import { ChartBarIcon } from "@heroicons/react/24/outline"
// import { Bar } from 'react-chartjs-2'
import { ResponsiveLine, Line } from '@nivo/line'


const data = [
    {
        "id": "Поступления",
        "color": "hsl(121, 82%, 42%)",
        "data": [
            {
                "x": "Январь",
                "y": 190
            },
            {
                "x": "Февраль",
                "y": 55
            },
            {
                "x": "Март",
                "y": 184
            },
            {
                "x": "Апрель",
                "y": 266
            },
            {
                "x": "Май",
                "y": 248
            },
            {
                "x": "Июнь",
                "y": 245
            },
            {
                "x": "Июль",
                "y": 298
            },
            {
                "x": "Август",
                "y": 264
            },
            {
                "x": "Сентябрь",
                "y": 110
            },
            {
                "x": "Октябрь",
                "y": 11
            },
            {
                "x": "Ноябрь",
                "y": 269
            },
            {
                "x": "Декабрь",
                "y": 121
            }
        ]
    },
    {
        "id": "Траты",
        "color": "#000000",
        "data": [
            {
                "x": "Январь",
                "y": 158
            },
            {
                "x": "Февраль",
                "y": 188
            },
            {
                "x": "Март",
                "y": 24
            },
            {
                "x": "Апрель",
                "y": 131
            },
            {
                "x": "Май",
                "y": 204
            },
            {
                "x": "Июнь",
                "y": 257
            },
            {
                "x": "Июль",
                "y": 8
            },
            {
                "x": "Август",
                "y": 222
            },
            {
                "x": "Сентябрь",
                "y": 225
            },
            {
                "x": "Октябрь",
                "y": 112
            },
            {
                "x": "Ноябрь",
                "y": 87
            },
            {
                "x": "Декабрь",
                "y": 215
            }
        ]
    }
]

const Chart = () => {
    return (
        <>
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false
                }}
                yFormat=" >-.2f"
                curve="catmullRom"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={null}
                enableGridX={false}
                enableGridY={false}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor', modifiers: [] }}
                pointLabelYOffset={-14}
                useMesh={true}
                enableSlices="x"
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </>
    )
}

export default Chart
