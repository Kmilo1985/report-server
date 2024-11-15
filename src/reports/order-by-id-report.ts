import { Header } from "@nestjs/common";
import type { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { CurrencyFormatter, DateFormatter } from "src/helpers";
import { footerSection } from "./sections/footer.section";

const logo: Content = {
    image: 'src/assets/tucan-banner.png',
    width: 100,
    height: 30,
    margin:[10,30]
};

const styles:StyleDictionary = {
    header:{
        fontSize:20,
        bold:true,
    },
    subHeader:{
        fontSize:18,
        bold:true,
        margin: [0,20,0,0],
    },

}


export interface CompleteOrder {
    order_id:      number;
    customer_id:   number;
    order_date:    Date;
    customers:     Customers;
    order_details: OrderDetail[];
}

export interface Customers {
    customer_id:   number;
    customer_name: string;
    contact_name:  string;
    address:       string;
    city:          string;
    postal_code:   string;
    country:       string;
}

export interface OrderDetail {
    order_detail_id: number;
    order_id:        number;
    product_id:      number;
    quantity:        number;
    products:        Products;
}

export interface Products {
    product_id:   number;
    product_name: string;
    category_id:  number;
    unit:         string;
    price:        string;
}

interface ReportValues  {
title?: string;
subTitle?:string;
data: CompleteOrder;
}




export const orderByIdReport = (value:ReportValues):TDocumentDefinitions => {
    const { data } = value;

    const { customers, order_details }= data;
    const subTotal =order_details.reduce(
        (acc,detail)=> acc +( detail.quantity * +detail.products.price),
        0,
    );

    const total = subTotal * 1.15;

   // console.log(data.order_details[0].products.product_name);
    console.log(data);


    return {
        styles:styles,
        header:logo,
        pageMargins:[40,60,40,60],
        footer:footerSection,
        content: [ 
            //Headers
            {
            text:'Dios es mi pastor que me guia en el camino \n',
            style:'header'
           },
           //Addres y recibo
           {
            columns:[
                {
                    text:`\n ${customers.address} \n  ${customers.city} \n ${customers.country} \n`
                },
                {
                    text:[
                        {text: `Recibo No. ${data.order_id}\n`,
                        bold:true
                    },
                        ` \n Fceha del recibo ${DateFormatter.getDDMMMMYYYY(data.order_date)} \n pagar antes de: ${DateFormatter.getDDMMMMYYYY(new Date)}`
                    ]
                }
            ]
           },
           // QR
           { qr: 'https://tr.ee/YGJxNsN7r3',fit:75, alignment:'right' },

           //Direcciones
           {
            text:[
                {
                    text:`Crobrar a: \n`,
                    style:'subHeader',
                    bold:true
                },
                `Razon Social : ${customers.customer_name},
                Contacto: ${customers.contact_name}`


            ]
           },
          // Tabla del detalle de l aorden
           {
            layout:'headerLineOnly',
            margin:[0,20],
            table: {
                headerRows: 1,
                widths:[50,'*','auto','auto','auto'],
                body: [
                    ['ID', 'Descripción', 'Cantidad', 'Precio', 'Total'],

                    ...order_details.map((detail)=>[
                        detail.order_detail_id.toString(),
                        detail.products.product_name,
                        detail.quantity.toString(),
                        {
                            text: CurrencyFormatter.formatCurrency(+detail.quantity * +detail.products.price),
                            alignment:'right',

                        },
                        {
                            text:CurrencyFormatter.formatCurrency(+detail.products.price * detail.quantity),
                            alignment:"right"
                        },
                     ],
                  ),

                ],
              },
           },
           //Salto de linea
           '\n\n',

           // Totales 
           {
            columns:[
                {
                    width:'*',
                    text: ''
                },
                {
                   width: 'auto',
                   layout:'noBorders',
                   table:{
                    body:[
                        ['Subtotal',
                            {
                                text:CurrencyFormatter.formatCurrency(subTotal),
                                alignment:"right",
                            }
                        ],
                        [
                            {
                            text:'Total',
                            bold:true,
                            alignment:"right",
                            fontSize:16
                            },
                            {
                                text:CurrencyFormatter.formatCurrency(total),
                                bold:true,
                                alignment:"right",
                                fontSize:18
                            }
                        ]
                    ]
                   }
                }
            ]
           }

        ],
    }

}