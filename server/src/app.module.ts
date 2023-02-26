import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsController } from './posts/posts.controller';
import { EventsModule } from './events/events.module';
import {SharesService} from "./services/shares.service";
import {ReaderService} from "./services/reader.service";
import {CoursesService} from "./services/courses.service";
import {AuthController} from "./controllers/auth.controller";
import {AuthService} from "./services/auth.service";
import {StockService} from "./services/stock.service";
import {StockController} from "./controllers/stock.controller";
import {UserController} from "./controllers/user.controller";
import {UserService} from "./services/user.service";


@Module({
  imports: [EventsModule],
  controllers: [AppController, PostsController, AuthController, StockController, UserController],
  providers: [AppService, SharesService, ReaderService, CoursesService, AuthService, StockService, UserService],
})
export class AppModule {}
