import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.sections';
import { countries as Country } from '@prisma/client';
import { footerSection } from './sections/footer.section';

interface ReportOptions {
  title?: string;
  subTitle?: string;
  countries: Country[];
}

export const getBiomedicReport = (): TDocumentDefinitions => {

  return {
    pageMargins: [40, 40, 40, 40],
    content: [
      // Primera fila del encabezado
      {
        table: {
          widths: ['10%', '10%', '30%', '30%', '20%'],
          body: [
            [
              { text: 'ITEM', style: 'headerCell', fillColor: '#4F81BD', color: 'white' },
              { text: '8', style: 'valueCell' },
              { text: 'CÓDIGO: F-HV-01', style: 'headerCell', fillColor: '#4F81BD', color: 'white' },
              { text: '', style: 'valueCell' }, // Celda vacía
              { text: 'HOJA DE VIDA EQUIPOS BIOMÉDICOS', style: 'headerTitleCell', fillColor: '#4F81BD', color: 'white' },
            ],
          ],
        },
        layout: {
          hLineWidth: () => 1,
          vLineWidth: () => 1,
        },
      },
      // Segunda fila del encabezado
      {
        table: {
          widths: ['10%', '10%', '30%', '30%', '20%'],
          body: [
            [
              { text: '', style: 'valueCell' }, // Celda vacía
              { text: '', style: 'valueCell' }, // Celda vacía
              { text: 'VERSIÓN: 01', style: 'valueCell' },
              { text: '10-10-23', style: 'valueCell' },
              { text: 'TENSIÓMETRO DE PARED', style: 'subtitleCell' },
            ],
          ],
        },
        layout: {
          hLineWidth: () => 1,
          vLineWidth: () => 1,
        },
      },
    ],
    styles: {
      headerCell: { fontSize: 10, bold: true, margin: [2, 4] },
      valueCell: { fontSize: 10, margin: [2, 4] },
      headerTitleCell: { fontSize: 10, bold: true, alignment: 'center', margin: [2, 4] },
      subtitleCell: { fontSize: 10, bold: true, alignment: 'center', margin: [2, 4] },
    },
  };
  };
