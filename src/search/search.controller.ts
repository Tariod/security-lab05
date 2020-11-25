import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { User } from 'src/common/interfaces/user.interface';
import { SearchUserDTO } from './dto/search-user.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':username')
  public async findUser(@Param('username') username: string): Promise<User | null> {
    const user = await this.searchService.findOne(username);
    return user && new SearchUserDTO(user);
  }
}
