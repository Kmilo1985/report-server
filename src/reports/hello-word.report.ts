import { TDocumentDefinitions } from "pdfmake/interfaces"

export const getHelloWordlReport = ():TDocumentDefinitions => {
    const docDefinition: TDocumentDefinitions = {
        content:['Gracias Dios es bueno'],
    }

    return docDefinition;

}