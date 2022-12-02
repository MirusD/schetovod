import React from 'react'
import { ChartBarIcon } from "@heroicons/react/24/outline"
import { ResponsiveLine } from '@nivo/line'

const LineChart = ({ data }) => {
    return (
        <>
            <ResponsiveLine
                data={data}
                margin={{ top: 0, right: 110, bottom: 0, left: 20 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 0,
                    max: "auto",
                    stacked: false,
                    reverse: false
                }}
                yFormat=" >-.2f"
                curve="catmullRom"
                axisRight={null}
                axisBottom={null}
                axisLeft={null}
                axisTop={{
                    orient: 'top',
                    tickSize: 0,
                    tickPadding: -20,
                    tickRotation: -1,
                    legend: '',
                    legendOffset: 0
                }}
                enableGridX={true}
                enableGridY={false}
                enablePoints={false}
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

export default LineChart
