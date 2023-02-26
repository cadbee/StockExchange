import {Controller, Get, Param, Post, Put, Req, Res} from '@nestjs/common';
import {AppService} from './app.service';
import {Request, Response} from "express";
let config = require('./jsons/config.json');
let brokers = require('./assets/json-storage/brokers.json');

const fs = require('fs');
const path = require('path');
@Controller()
export class AppController {
    lastPartner: any;

    constructor(private readonly appService: AppService) {

    }

    @Get()
    getStart(@Req() req: Request, @Res() res: Response): any {
        res.json({msg: 'connect', number: '200'});
    }
    @Get('brokers')
    getBrokers(): string {
        let data =  JSON.parse(fs.readFileSync(path.resolve(__dirname, "./assets/json-storage/brokers.json")));
        let brokers = [];
        for (let broker in data){
            brokers.push({...data[broker], email: broker});
        }
        return JSON.stringify(brokers);
    }

    @Get('settings')
    getSettings(@Req() req: Request, @Res() res: Response): any {
        res.json(config.settings);
    }

    @Get('admin')
    getConfig(@Req() req: Request, @Res() res: Response): any {
        res.json(config);
    }
    @Get('stocks/:stock_name')
    getStock(@Req() req: Request, @Res() res: Response, @Param('stock_name') name): any {
        res.json({stock: this.appService.getStock(name)});
    }
    @Get('stocks/:stock_name/:date')
    getStockInfByDate(@Req() req: Request, @Res() res: Response, @Param('stock_name') name, @Param('date') date): any {
        res.json({stock: this.appService.getStock(name)});
    }
    @Post('logon')
    getLogon(@Req() req: Request, @Res() res: Response): any {
        if (req.body.name === 'ADMIN') {
            res.json({ref: 'admin', config: config});
            return;
        }
        for (let element of config.partners) {
            if (element.name === req.body.name) {
                this.lastPartner = element;
                res.json({ref: 'partner', config: config});
                return;
            }
        }

        res.json({ref: 'null'});
    }
    @Post('delete')
    delBroker(@Req() req: Request, @Res() res: Response): any {
        let br = req.body.brokers;
        let new_arr = [];
        config.partners.forEach((v, i)=>{
            if (br.includes(v.name)) {
            }
            else{
                new_arr.push(v);
            }
        }
        )
        config.partners = new_arr;
        fs.writeFileSync(path.resolve(__dirname, './jsons/config.json'), JSON.stringify(config));
        res.json({ref: config});
    }
    @Post('addbroker')
    addBroker(@Req() req: Request, @Res() res: Response): any {
        config.partners.push({name: req.body.name, money: Number(req.body.money), email: req.body.email});
        brokers[req.body.email]= {"name": req.body.name, "balance": Number(req.body.money)};
        fs.writeFileSync(path.resolve(__dirname, './jsons/config.json'), JSON.stringify(config));
        fs.writeFileSync(path.resolve(__dirname, './assets/json-storage/brokers.json'), JSON.stringify(brokers));
        res.json({});
    }
    @Post('editbroker')
    editBroker(@Req() req: Request, @Res() res: Response): any {
        config.partners.forEach((v, i)=>{
            if(v.name===req.body.name){
                config.partners[i].money = Number(req.body.money);
            }
        });
        fs.writeFileSync(path.resolve(__dirname, './jsons/config.json'), JSON.stringify(config));
        res.json({});
    }
    @Get('partner')
    getPartner(@Req() req: Request, @Res() res: Response): any {
      res.json({partner: this.lastPartner, papers: config.papers});
    }
}
