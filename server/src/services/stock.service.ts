import {Injectable} from '@nestjs/common';
const fs = require('fs');
const path = require("path")

@Injectable()
export class StockService {
    loadStock(): string {
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, "../assets/json-storage/stock.json")))
    }

    loadPurchases(user): string{
        let stock = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../assets/json-storage/stock.json")))
        let myPurchases = []
        for (let share in stock[user]){
            for (let date in stock[user][share]){
                myPurchases.push({
                    share: share,
                    date: date,
                    amount: stock[user][share][date].amount,
                    cost: stock[user][share][date].cost
                })
            }
        }
        return JSON.stringify(myPurchases)
    }
}