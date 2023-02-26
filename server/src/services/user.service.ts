import {Injectable} from '@nestjs/common';
const fs = require('fs');
const path = require("path")

@Injectable()
export class UserService {
    getBalance(email): string {
        let data =  JSON.parse(fs.readFileSync(path.resolve(__dirname, "../assets/json-storage/brokers.json")))
        return JSON.stringify({balance: data[email].balance})
    }

    purchaseShare(data): string {
        let brokers =  JSON.parse(fs.readFileSync(path.resolve(__dirname, "../assets/json-storage/brokers.json")))
        brokers[data.user].balance = parseFloat((brokers[data.user].balance - parseFloat(data.cost) * parseFloat(data.amount)).toFixed(4))
        fs.writeFile(path.resolve(__dirname, "../assets/json-storage/brokers.json"), JSON.stringify(brokers), error => {
            if(error) throw error;
        });
        let stock =  JSON.parse(fs.readFileSync(path.resolve(__dirname, "../assets/json-storage/stock.json")))
        if (data.user in stock){
            if (data.share in stock[data.user]){
                if (data.date in stock[data.user][data.share]){
                    stock[data.user][data.share][data.date].amount += parseFloat(data.amount)
                } else {
                    stock[data.user][data.share][data.date] = {cost: parseFloat(data.cost), amount: parseFloat(data.amount)}
                }
            } else {
                let dates = {}
                dates[data.date] = {
                    cost: parseFloat(data.cost),
                    amount: parseFloat(data.amount)
                }
                stock[data.user][data.share] = dates
            }
        } else {
            let dates = {}
            dates[data.date] = {
                cost: parseFloat(data.cost),
                amount: parseFloat(data.amount)
            }
            let shares = {}
            shares[data.share] = dates
            stock[data.user] = shares
        }
        fs.writeFile(path.resolve(__dirname, "../assets/json-storage/stock.json"), JSON.stringify(stock), error => {
            if(error) throw error;
        });
        return JSON.stringify({state: "Акции успешно куплены!"})
    }

    saleShare(data): string {
        let brokers =  JSON.parse(fs.readFileSync(path.resolve(__dirname, "../assets/json-storage/brokers.json")))
        brokers[data.user].balance = parseFloat((brokers[data.user].balance + parseFloat(data.cost) * parseFloat(data.amount)).toFixed(4))
        fs.writeFile(path.resolve(__dirname, "../assets/json-storage/brokers.json"), JSON.stringify(brokers), error => {
            if(error) throw error;
        });
        let stock =  JSON.parse(fs.readFileSync(path.resolve(__dirname, "../assets/json-storage/stock.json")))
        let dates = stock[data.user][data.share]
        let amount = data.amount
        let tmp_dates = {}
        for (let date in dates) {
            if (parseInt(amount) > parseInt(dates[date].amount)) {
                amount = parseInt(amount) - parseInt(dates[date].amount)
            } else {
                if (parseInt(amount) === parseInt(dates[date].amount)) {
                    amount = 0
                } else {
                    tmp_dates[date] = {
                        amount: parseInt(dates[date].amount) - parseInt(amount),
                        cost: dates[date].cost
                    }
                    amount = 0
                }
            }
        }
        if (Object.keys(tmp_dates).length) {
            stock[data.user][data.share] = tmp_dates
        } else {
            let shares = Object.keys(stock[data.user])
            shares = shares.filter(share => share !== String(data.share))
            let tmp_shares = {}
            for (let x = 0; x < shares.length; x++){
                tmp_shares[shares[x]] = stock[data.user][shares[x]]
            }
            stock[data.user] = tmp_shares
        }

        fs.writeFile(path.resolve(__dirname, "../assets/json-storage/stock.json"), JSON.stringify(stock), error => {
            if(error) throw error;
        });
        return JSON.stringify({state: "Акции успешно проданы!"})
    }
}