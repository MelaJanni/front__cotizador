import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { createI18n } from "vue-i18n";
const i18n = createI18n({
    legacy: false,
    locale: "ja",
   globalInjection: true,
    messages: {
      en: {
        message: {
            language: "English",
            greeting: "Hello !",
            cotizador: 'Quoter of',
            importaciones:'imports',
            exportaciones:'exports',
            ltl:'LTL (Land Consolidated Cargo)',
            lcl:'LCL (Maritime Consolidated Cargo)',
            puertoDestino:'Port of destination',
            puertoEmbarque:'Port of Shipment (POL)',
            volumen:'Volumen (cbm)',
            longitud:'Max length (meters)',
            peso:'Weight (ton)',
            datos:'Enter your data',
            nombre:'Full name:',
            email:'Email:',
            telefono:'Phone',
            ejemplorNombre:'Example: Luis Rincon',
            ejemplorMail:'Example@gmail.com',
            ejemplorTelefono:'31 0232 1569"',
            generar:'Generate quote',
            metros:'Meters',
            toneladas:'Tons',
            validez:'Validity: ',
            desCargos:'POSITION DESCRIPTION',
            cantidad:'AMOUNT',
            precio:'PRICE',
            valor:'VALUE',
            flete:'Import Sea Freight',
            desconsolidacion:'Deconsolidation',
            sobreDim:'Over-size',
            sobrePeso:'Overweight',
            subtotal:'SUBTOTAL',
            pdf:'DOWNLOAD PDF',
            asesor:'Contact an advisor',
            terminos:'Terms and Conditions',
            volumen2:'Volumen',
            cotizadorImp: 'Quoter of Imports',
            cotizadorEx: 'Quoter of Exports',
            porConfirmar: 'To be confirmed',
        }
        
      },
      es: {
        message: {
            cotizador: 'Cotizador de',
            importaciones:'importaciones',
            exportaciones:'exportaciones',
            ltl:'LTL (Carga Consolidada Terrestre)',
            lcl:'LCL (Carga Consolidada Marítima)',
            puertoDestino:'Puerto de Destino',
            puertoEmbarque:'Puerto de Embarque (POL)',
            volumen:'Volumen (cbm)',
            longitud:'Longitud max (metros)',
            peso:'Peso (ton)',
            datos:'Ingresa tus datos',
            nombre:'Nombre completo:',
            email:'Correo electrónico:',
            telefono:'Teléfono:',
            ejemplorNombre:'Ej. Luis Rincon',
            ejemplorMail:'Ej. Ejemplo@gmail.com',
            ejemplorTelefono:'Ej. 310 221....."',
            generar:'Generar cotización',
            metros:'Metros',
            toneladas:'Toneladas',
            validez:'Válidez: ',
            desCargos:'DESCRIPCIÓN DE CARGOS',
            cantidad:'CANTIDAD',
            precio:'PRECIO',
            valor:'VALOR',
            flete:'Flete Marítimo de Importación',
            desconsolidacion:'Desconsolidación',
            sobreDim:'Sobre-dimensión',
            sobrePeso:'Sobre-peso',
            subtotal:'SUBTOTAL',
            pdf:'DESCARGAR PDF',
            asesor:'Contactar un asesor',
            terminos:'Términos y condiciones',
            volumen2:'Volumen',
            cotizadorImp: 'Cotizador de Importaciones',
            cotizadorEx: 'Cotizador de Exportaciones',
            porConfirmar: 'Por confirmar',
        }
      }
    }
});

createApp(App).use(i18n).use(store).use(router).mount('#app')
