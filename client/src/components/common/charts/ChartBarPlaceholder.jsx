import React from 'react'
import chartBar from '../../../static/icons/charts/chartBar.svg'

const ChartBarPlaceholder = () => {
    return (<div className="grow h-full flex items-center justify-center text-gray-600">
        <div className="relative">
            <div className="z-10 relative">
                <p className="text-4xl text-center">Нет данных</p>
                <p>Данные появятся как только вы начнете производить операции</p>
            </div>
            <img className="h-64 absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] z-10 opacity-10" src={chartBar}/>
        </div>
    </div>)
}

export default ChartBarPlaceholder
