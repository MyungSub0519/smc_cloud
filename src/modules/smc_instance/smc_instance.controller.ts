import { Controller, Get } from '@nestjs/common';
import { SmcInstanceService } from './smc_instance.service';

@Controller('smc-instance')
export class SmcInstanceController {
  constructor(private readonly smcInstanceService: SmcInstanceService) {}

  @Get('vms')
  async getVirtualMachines(){
    this.smcInstanceService.getVirtualMachines();
  }
}
