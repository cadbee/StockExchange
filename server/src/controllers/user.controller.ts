import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from "../services/user.service";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("/user/balance")
    getBalance(@Body("email") email): string {
        return this.userService.getBalance(email)
    }

    @Post("/user/purchase")
    purchaseShare(@Body() data): string {
        return this.userService.purchaseShare(data)
    }

    @Post("/user/sale")
    saleShare(@Body() data): string {
        return this.userService.saleShare(data)
    }
}