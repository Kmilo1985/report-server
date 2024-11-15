import { Controller, Get,Param,Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';
var path = require('path');

const fs = require('fs');



@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  
    hello(@Res() response:Response){
   
    const pdfDoc = this.basicReportsService.hello()

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Cristian Camilo'
    pdfDoc.pipe(response)

    pdfDoc.end()
    return pdfDoc;
  }

  @Get('employment-report')
  async employeLetter(@Res() response:Response){
    const pdfDoc = this.basicReportsService.employmentReport();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Cristian Camilo'
    pdfDoc.pipe(response)

    pdfDoc.end();
  }

 

  @Get('employment-report/:employeeId')
  async employeLetterById(@Res() response:Response, @Param('employeeId') employeeId: string){

    const pdfDoc = await this.basicReportsService.employmentLetterById(+employeeId);
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Cristian Camilo'
    pdfDoc.pipe(response)

    pdfDoc.end();
  }


  @Get('countries')
  async getCountriesReport (@Res() response:Response) {

    const pdfDoc = await this.basicReportsService.getCountReport();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Countries'
    pdfDoc.pipe(response)

    pdfDoc.end();
  }

  @Get('biomedic')
  async getBiomedicReportHv (@Res() response:Response) {

    const pdfDoc = await this.basicReportsService.getBiomedicReport();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Countries'
    pdfDoc.pipe(response)

    pdfDoc.end();
  }
}

