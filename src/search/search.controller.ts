import { Controller, Get, Param } from '@nestjs/common';
import { User } from 'src/common/interfaces/user.interface';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get(':username')
  public findUser(@Param('username') username: string): Promise<User | null> {
    return this.searchService.findOne(username);
  }
}
