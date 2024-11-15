import { Controller, Get, Param, Res } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { Response } from 'express';

var path = require('path');

const fs = require('fs');

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

  @Get('orders/:orderId')
  async getOrderReport(
    @Res() response:Response,
    @Param('orderId') orderId: string)
    {
      const pdfDoc = await this.storeReportsService.orderByIdReports(+orderId);
      response.setHeader('Content-Type', 'application/pdf');
      pdfDoc.info.Title = 'Jesus es el rey del universo'
      pdfDoc.pipe(response)
  
      pdfDoc.end();
  }
}
