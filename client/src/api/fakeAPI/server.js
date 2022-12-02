import { createServer } from "miragejs"
import getAvatar from "../../utils/generateAvatar"

// let server = createServer()
// server.get("/api/bank-accounts", [        {
//     _id: "0",
//     name: "Сбербанк",
//     amount: 10000,
//     type_id: "",
//     icon: ""
// }])

export function makeServer({ environment = "development"}) {
    console.log('run mirage server')
    return createServer({
        routes() {
            this.namespace = "api"
            this.get("/bank-accounts", () => {
                return [
                    {
                        _id: "0",
                        name: "Сбербанк",
                        amount: 10000,
                        type_id: "Карта",
                        color: "#ffffff",
                        icon: ""
                    },
                    {
                        _id: "1",
                        name: "Открытие",
                        amount: 100000,
                        type_id: "Карта",
                        color: "#ffffff",
                        icon: ""
                    },
                    {
                        _id: "2",
                        name: "Открытие",
                        amount: 100000,
                        type_id: "Депозит",
                        color: "#ffffff",
                        icon: ""
                    },
                    {
                        _id: "3",
                        name: "Кошелек",
                        amount: 5000,
                        type_id: "Наличные",
                        color: "#ffffff",
                        icon: ""
                    },
                    {
                        _id: "4",
                        name: "Открытие",
                        amount: 5000,
                        type_id: "Кредитка",
                        color: "#ffffff",
                        icon: ""
                    },
                    {
                        _id: "5",
                        name: "",
                        amount: 5000,
                        type_id: "Инвест",
                        color: "#fff",
                        icon: ""
                    },
                    {
                        _id: "6",
                        name: "",
                        amount: 10000,
                        type_id: "Должники",
                        color: "#474343",
                        icon: ""
                    },
                ]
            })
            this.get("/transactions", () => {
                return [
                    {
                        _id: "0",
                        amount: 1500,
                        category_id: "Кварплата",
                        type_category_id: 'Расход',
                        bankAccount_id: "0",
                        comments: ""
                    },
                    {
                        _id: "1",
                        amount: 1250,
                        category_id: "Бензин",
                        type_category_id: 'Расход',
                        bankAccount_id: "0",
                        comments: ""
                    },
                    {
                        _id: "2",
                        amount: 100000,
                        category_id: "ЗП",
                        type_category_id: 'Доход',
                        bankAccount_id: "1",
                        comments: "Ураа"
                    }
                ]
            })
            this.get("/auth", () => {
                return {
                    name: "Дамир",
                    avatar: getAvatar()
                }
            })
        }
    })
}
