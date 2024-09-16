import { Controller, Get,Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';
var path = require('path');


//TODO: ESTO SERA MODIFICADO DESPUES
import PdfPrinter from 'pdfmake';

const basePath = path.resolve(__dirname,'@fonts', './basic-reports/fonts');

var fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf'
  }
};


@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  
    hello(@Res() response:Response){
      console.log('Ruta completa de normal:', fonts.Roboto.normal);
    const pdfDoc = this.basicReportsService.hello()

    response.setHeader('Content-Type', 'aplication/.pdf"');
    pdfDoc.pipe(response)
    pdfDoc.end()
    return pdfDoc;

   
  }
}

