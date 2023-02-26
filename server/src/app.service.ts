import {Injectable} from '@nestjs/common';
import {resolve} from "path";

const fs = require('fs');
const {parse} = require('csv-parse');

@Injectable()
export class AppService {

    getHello(): string {
        return 'Hello World!';
    };

    getStock(name:string) {
        let data = JSON.parse(fs.readFileSync(resolve(__dirname, "./assets/stocks/"+name+".json")));
        return data;
    };
    getStockInfByDate(name:string, date: string) {
        let data = JSON.parse(fs.readFileSync(resolve(__dirname, "./assets/stocks/"+name+".json")));
        data.forEach();
        return data;
    };
}
