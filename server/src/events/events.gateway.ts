import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import * as config from '../jsons/config.json';
import {Socket} from "socket.io"
import {ReaderService} from "../services/reader.service";
import {CoursesService} from "../services/courses.service";

@WebSocketGateway(3050, {cors:"*"})
export class EventsGateway
    implements OnGatewayConnection, OnGatewayDisconnect {
    private inProgress: boolean = false
    private nextDate: string
    constructor(private reader: ReaderService, private courses: CoursesService) {

    }
    @WebSocketServer() server;
    admin: string = '';
    isStart: boolean = false;
    users: number = 0;
    endInterval: any;
    startInterval: any;
    randomInterval: any;
    arrayBegin: any = config.settings.start.split(":");
    arrayEnd: any = config.settings.end.split(":");
    arrayInterval = config.settings.interval.split(":");
    async handleConnection() {
        // A client has connected
        this.users++;

        // Notify connected clients of current users
        this.server.emit('users', this.users);
    }

    async handleDisconnect() {
        // A client has disconnected
        this.users--;

        // Notify connected clients of current users
        this.server.emit('users', this.users);
    }
    changeCourse(date, data, shift){
        const courseInfo = this.courses.getCourses(data, date);
        this.server.emit("course-changed", courseInfo.courses, date);
        this.nextDate = courseInfo.nextDate;
        if (this.inProgress && this.nextDate){
            setTimeout(() => this.changeCourse(this.nextDate, data, shift), shift);
        } else {
            this.server.emit("TheEnd");
            this.inProgress = false;
        }

    }

    @SubscribeMessage('ItsTimeToTrade')
    handleStart(client: Socket, settings): void {
        // console.log("SAHK SERVE SOCKET", settings);
        this.inProgress = true;
        const data = this.reader.configureData(settings.tradingShares);
        this.changeCourse(settings.start, data, settings.shift * 1000);
    }

    @SubscribeMessage('StopTrading')
    handleStop(): void {
        this.inProgress = false;
    }
    @SubscribeMessage('chat')
    async onChat(client, message) {
        client.broadcast.emit('chat', message);
    }
    @SubscribeMessage('hello')
    async sayHello(client, msg){
        client["name"] = msg.name;
        if(msg.name === "ADMIN") this.admin = client.id;
    }



    @SubscribeMessage('start')
    async start(client, msg){
        client.broadcast.emit('start');
        this.isStart = true;
        clearInterval(this.startInterval);
        this.randomInterval = setInterval(() => {
            let test = [];
            for(let elem of config.papers) {
                elem.startPrice = this.getRandomInRange(elem.startPrice-elem.max, elem.startPrice+elem.max, elem.rule);
                test.push(elem.startPrice);
            }
            this.server.emit('change', {msg: 'ИЗМЕНЕНИЯ ЦЕНЫ!', value: test});
        }, parseInt(this.arrayInterval[0])*60*1000 + parseInt(this.arrayInterval[1])*1000);
    }



    @SubscribeMessage('action')
    async setAction(client, msg){
        client.emit('action', msg);
        client.broadcast.emit('action', msg);
    }

    @SubscribeMessage('rules')
    async setRules(msg){
        for (let elem of config.papers){
            if (elem.name === msg.paper){
                elem.rule = msg.rule;
                break;
            }
        }
    }

    end_interval(){

    }

    start_interval(){
        this.startInterval = setInterval(() => {
            if(this.arrayBegin[1] === new Date().getMinutes() && this.arrayBegin[0] === new Date().getHours()) {
                clearInterval(this.startInterval);
                this.server.emit('start');
                if(!this.isStart) {
                    this.isStart = true;
                    this.randomInterval = setInterval(() => {
                        let test = [];
                        for(let elem of config.papers) {
                            elem.startPrice = this.getRandomInRange(elem.startPrice-elem.max, elem.startPrice+elem.max, elem.rule);
                            test.push(elem.startPrice);
                        }
                        this.server.json.emit('change', {msg: 'ИЗМЕНЕНИЯ ЦЕНЫ!', value: test});
                        this.server.emit('change', {msg: 'ИЗМЕНЕНИЯ ЦЕНЫ!', value: test});
                    }, parseInt(this.arrayInterval[0])*60*1000 + parseInt(this.arrayInterval[1])*1000);
                }
            }
        }, 500);
    }

    getRandomInRange(min: any, max:any, rule:any): any {
        let sumRandomNumber = 0;
        let countRandomNumberGeneration = 20;
        if(rule == 'нормальный') {
            for(let i = 0; i < countRandomNumberGeneration; i++) {
                sumRandomNumber += Math.floor(Math.random() * (max - min + 1)) + min;
            }
            return Math.floor(sumRandomNumber/countRandomNumberGeneration);
        }
        let value = Math.floor(Math.random() * (max - min + 1)) + min;
        if(value <= 0) value = 1;
        return value;
    }
}
