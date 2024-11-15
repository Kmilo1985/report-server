import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { error } from 'console';

//TODO: ESTO SERA MODIFICADO DESPUES
import PdfPrinter from 'pdfmake';
import type {  TDocumentDefinitions } from "pdfmake/interfaces";
import { PrinterService } from 'src/printer/printer.service';
import { getEmployeeLetterById, getHelloWordlReport } from 'src/reports';
import { getEmployeeReport } from 'src/reports';
import { getCountryReport } from 'src/reports/countries.report';
import { getBiomedicReport } from 'src/reports/biomedic-report-hoja-de-vida';





@Injectable()
export class BasicReportsService  extends PrismaClient implements OnModuleInit {

  constructor(private printerService:PrinterService){
    super();
  }

    async onModuleInit() {
      await this.$connect();
      console.log('Connected to the database');
    }
    
    hello(){

      const docDefinition = getHelloWordlReport()

      var doc = this.printerService.createPdf(docDefinition);
      return doc;
      }

      employmentReport(){
        const docDefinition = getEmployeeReport()

        var doc = this.printerService.createPdf(docDefinition);
        return doc;
      }

      async employmentLetterById(employeeId:number){

        const employee = await this.employees.findUnique({
          where: { id: employeeId },
        });

        console.log(employee);

        if (!employee) {
          throw new NotFoundException(`Employee with id ${employeeId} not found`)
        }
        const docDefinition = getEmployeeLetterById({
          employerName:'Cristian Camilo Muñoz',
          employerPosition:'Software Enginner',
          employeName:employee.name,
          employePosition:employee.position,
          employerStarDate:employee.start_date,
          employerHours:employee.hours_per_day,
          employerWorkschedule:employee.work_schedule,
          employerCompany:'Shopping Flex'
        })

        var doc = this.printerService.createPdf(docDefinition);
        return doc;
      }

     async getCountReport(){

      const countries = await this.countries.findMany({
        where: {
          local_name: {
            not: null,
          },
        },
      });
  

        const docDefinition = getCountryReport({ countries });
  
        var doc = this.printerService.createPdf(docDefinition);
        return doc;
        }

        async getBiomedicReport(){

          const countries = await this.countries.findMany({
            where: {
              local_name: {
                not: null,
              },
            },
          });
      
    
            const docDefinition = getBiomedicReport();
      
            var doc = this.printerService.createPdf(docDefinition);
            return doc;
            }
}
