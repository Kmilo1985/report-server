import { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces"
import { headerSection } from "./sections/header.sections";
import { DateFormatter } from "src/helpers";


interface ReportValue {
    employerName:string;
    employerPosition:string;
    employeName:string;
    employePosition:string;
    employerStarDate:Date;
    employerHours:number;
    employerWorkschedule:string;
    employerCompany:string;


}

const styles:StyleDictionary = {
header:{
    fontSize:22,
    bold:true,
    alignment:'center',
    margin:[0,60,0,20],
},
body:{
    alignment: 'justify',
    margin:[0,0,0,70]
},
signature:{
    fontSize: 14,
    bold:true,
    alignment:'left',
},
footer: {
    fontSize:10,
    bold:true,
    alignment:'center',
    margin:[0,0,0,20],
}

};



export const  getEmployeeLetterById = (value:ReportValue): TDocumentDefinitions=> {
    const {
      employerName,
      employerPosition,
      employeName,
      employePosition,
      employerStarDate,
      employerHours,
      employerWorkschedule,
      employerCompany,
    } = value;
    const docDefinition: TDocumentDefinitions = {
       styles: styles,
       pageMargins:[40,60,40,60],

       header:headerSection({
        showDate:true,
        showLogo:true
       }),

        content:[
            
            {
                text: 'Constancia de empleo',
                style:'header'
            },
            {
                text: `Yo, ${employeName}, en mi calidad de ${employePosition} de ${employerCompany},
                por medio de la presente certifco que ${employerName} ha sido empleado en nuestra
                empresa desde el ${ DateFormatter.getDDMMMMYYYY(employerStarDate)}. \n \n
                Durante su empleo, el Sr./Sra. ${employerName} ha desempeñado el cargo de ${employePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus
                labores. \n\n
                La jornada laboral del Sr./ Sra. ${employerName} es de ${employerHours} horas
                semanales, con un horario de ${employerWorkschedule}, cumpliendo con las políticas y
                procedimientos establecidos por la empresa.\n\n
                Esta constancia se expide a solicitud del interesado para los fnes que considere conveniente.`,
                style: 'body',
            },
            {text: `Atentamente,\n\n`,style:'signature'},
            {text: `${employerName}`,style:'signature'},
            {text: `${employePosition}`,style:'signature'},
            {text: `${employerCompany}`,style:'signature'},
            {text: `${DateFormatter.getDDMMMMYYYY(new Date)}`,style:'signature'}, 
            
        ],  
        footer: {
            text:'Esta constancia se expide a solicitud del interesado para los fnes que considere conveniente',
            style: 'footer',
            alignment:'center',
            margin:[0,0,0,0]
        }
    }

    return docDefinition;
}