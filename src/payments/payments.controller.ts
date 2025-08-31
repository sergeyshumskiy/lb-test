import { Controller, Get } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { UseGuards } from '@nestjs/common';

@Controller('payments')
@UseGuards(ThrottlerGuard)
@Controller('payments')
export class PaymentsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
