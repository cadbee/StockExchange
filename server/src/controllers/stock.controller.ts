import {Body, Controller, Get, Post} from '@nestjs/common';
import {StockService} from "../services/stock.service";

@Controller()
export class StockController {
    constructor(private readonly stockService: StockService) {}

    @Get("/load/stock")
    loadStock(): string {
        return this.stockService.loadStock();
    }

    @Post("/myPurchases")
    loadPurchases(@Body ("user") user): string {
        return this.stockService.loadPurchases(user)
    }

}