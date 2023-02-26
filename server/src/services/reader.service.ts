import {Injectable} from '@nestjs/common';
import {SharesService} from "./shares.service";

@Injectable()
export class ReaderService {

    constructor(private shareService: SharesService) {
    }

    configureData(shares){
        const data = {}
        for (let share of shares){
            const tmp = JSON.parse(this.shareService.getShare(share))
            data[share] = {dates: tmp.labels, cost: tmp.values}
        }
        return data
    }
}
