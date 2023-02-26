import {Injectable} from '@nestjs/common'

@Injectable()
export class CoursesService {

    getCourses(data, date){
        let courses = [];
        let nextDate = "";
        for (let share in data){
            for (let x = 0; x < data[share].dates.length; x++){
                if (data[share].dates[x] === date){
                    courses.push([share, data[share].cost[x]]);
                    nextDate = data[share].dates[x+1];
                    break;
                }
            }
        }

        return {
            courses: courses,
            nextDate: nextDate
        }
    }
}