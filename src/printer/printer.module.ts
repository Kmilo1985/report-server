import { Module } from '@nestjs/common';
import { PrinterService } from './printer.service';

@Module({
    imports:[PrinterModule],
    exports:[PrinterService],
    providers: [PrinterService],
})
export class PrinterModule {}
