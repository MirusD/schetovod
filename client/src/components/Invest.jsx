import React from 'react'
import CardInfo from "./common/cards/CardInfo";
import PieChart from "./common/charts/PieChart";

const Invest = () => {
    return (
        <CardInfo  className="h-96 w-16">
            <CardInfo.Title>
                Инвестировано
            </CardInfo.Title>
            <CardInfo.Content>
                <PieChart/>
            </CardInfo.Content>
        </CardInfo>
    )
}

export default Invest
