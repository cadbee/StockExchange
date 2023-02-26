import {Injectable} from '@nestjs/common';
const fs = require('fs');
const path = require("path")

@Injectable()
export class SharesService {
    getShare(company: string): string {
        let share = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../assets/stocks/" + company + ".json")))
        const labels = []
        const values = []
        for (let x = share.length-1; x >= 0; x--){
            labels.push(share[x].Date)
            values.push(share[x].Open.slice(1))
        }
        return JSON.stringify({"labels": labels, "values": values})
    }
}