import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import {SharesService} from "../services/shares.service";
import {ReaderService} from "../services/reader.service";
import {CoursesService} from "../services/courses.service";

@Module({
    providers: [EventsGateway, SharesService, ReaderService, CoursesService],
})
export class EventsModule {}