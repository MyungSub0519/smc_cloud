import { Module } from '@nestjs/common';
import { SmcStoageService } from './smc_stoage.service';
import { SmcStoageController } from './smc_stoage.controller';


@Module({
  imports: [],
  controllers: [SmcStoageController],
  providers: [SmcStoageService],
})
export class SmcStoageModule {}
