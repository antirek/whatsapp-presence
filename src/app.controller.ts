import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { 
  ApiTags,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

import { IStateObject } from './types';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('whatsapp')
  @ApiOkResponse({
    description: 'Search result',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get('/state/:number')
  async getState(@Param('number') number: string): Promise<IStateObject> {
    console.log('GET state number', number);
    try {
      const res = await this.appService.getState(number);
      console.log('GET response', res);
      return res;
    }
    catch(e) {
      console.log('err', e);
      throw new HttpException({
        status: HttpStatus.SERVICE_UNAVAILABLE,
        error: `Service not avaialable`,
      }, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  /*
  @Get('/')
  getHello() {
    return 'Hellow';
  }
  */
}
