import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

//TODO: ESTO SERA MODIFICADO DESPUES
import PdfPrinter from 'pdfmake';
import {  TDocumentDefinitions } from "pdfmake/interfaces";

var path = require('path');

var fonts = {
  Roboto: {
    normal: path.join(__dirname, './dist\basic-reports\fonts\Roboto-Regular.ttf'),
    bold: path.join(__dirname, '/fonts/Roboto-Medium.ttf'),
    italics: path.join(__dirname, '/fonts/Roboto-Italic.ttf'),
    bolditalics: path.join(__dirname, '/fonts/Roboto-MediumItalic.ttf')
  }
};


@Injectable()
export class BasicReportsService  extends PrismaClient implements OnModuleInit {

    async onModuleInit() {
      await this.$connect();
      console.log('Connected to the database');
    }
    
    hello(){
      var printer = new PdfPrinter(fonts);

      var docDefinition: TDocumentDefinitions = {
        content: [
          'Hola word',
        ]
      }

      var doc = printer.createPdfKitDocument(docDefinition);
      return doc;
      }
}
