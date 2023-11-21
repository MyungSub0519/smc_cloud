import { Module } from '@nestjs/common';
import { SmcInstanceService } from './smc_instance.service';
import { SmcInstanceController } from './smc_instance.controller';

@Module({
  controllers: [SmcInstanceController],
  providers: [SmcInstanceService],
})
export class SmcInstanceModule {}
