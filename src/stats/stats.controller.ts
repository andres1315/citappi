import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { StatsService } from './stats.service';
import { RangeDateDto } from './dto/stats.dto';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  /*   @Post()
  create(@Body() createStatDto: CreateStatDto) {
    return this.statsService.create(createStatDto);
  } */

  @Get()
  findAll(@Query() statsDto: RangeDateDto) {
    console.log(statsDto);
    return this.statsService.findAll(statsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statsService.findOne(+id);
  }

  /*   @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatDto: UpdateStatDto) {
    return this.statsService.update(+id, updateStatDto);
  } */

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statsService.remove(+id);
  }
}
