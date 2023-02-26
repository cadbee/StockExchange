import {Injectable} from '@nestjs/common';
const fs = require('fs');
const path = require("path")
let config = require('../jsons/config.json');
@Injectable()
export class AuthService {
    login(body){
        let data =  JSON.parse(fs.readFileSync(path.resolve(__dirname, "../assets/json-storage/authData.json")))
        if (body.email in data && data[body.email] === body.password){
            return JSON.stringify({status: body.email})
        }
        return JSON.stringify({status: ""})
    }

    register(body){
        let data =  JSON.parse(fs.readFileSync(path.resolve(__dirname, "../assets/json-storage/authData.json")))
        if (body.email in data){
            return JSON.stringify({status: ""})
        } else {

            data[body.email] = body.password
            fs.writeFile(path.resolve(__dirname, "../assets/json-storage/authData.json"), JSON.stringify(data), error => {
                if(error) throw error;
            });
            let brokers = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../assets/json-storage/brokers.json")))
            brokers[body.email] = {"name": body.name, "balance": Number(body.balance)}
            fs.writeFile(path.resolve(__dirname, "../assets/json-storage/brokers.json"), JSON.stringify(brokers), error => {
                if(error) throw error;
            });
            config.partners.push({"name": body.name, "money": Number(body.balance), "email": body.email});
            fs.writeFile(path.resolve(__dirname, "../jsons/config.json"), JSON.stringify(config), error => {
                if(error) throw error;
            });
            let stock = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../assets/json-storage/stock.json")))
            stock[body.email] = {}
            fs.writeFile(path.resolve(__dirname, "../assets/json-storage/stock.json"), JSON.stringify(stock), error => {
                if(error) throw error;
            });
            return JSON.stringify({status: body.email})
        }
    }
}