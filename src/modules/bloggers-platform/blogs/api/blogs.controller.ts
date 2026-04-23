import {ApiTags} from "@nestjs/swagger";
import {Controller} from "@nestjs/common";

@ApiTags('Blogs endpoint')
@Controller('blogs')
export class BlogsController {
    constructor() {
        console.log('BlogsController created');
    }


}