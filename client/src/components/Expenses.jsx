import React from 'react'
import CardInfo from "./common/cards/CardInfo";
import PieChart from "./common/charts/PieChart";

const Expenses = () => {
    return (
        <CardInfo  className="h-96 w-16">
            <CardInfo.Title>
                Расходы
            </CardInfo.Title>
            <CardInfo.Content>
                <PieChart/>
            </CardInfo.Content>
        </CardInfo>
    )
}

export default Expenses
