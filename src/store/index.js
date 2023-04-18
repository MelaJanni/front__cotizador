import { createStore } from 'vuex'
import axios from "axios";


const url = 'https://expertmonkeys.com'
const API__importaciones =url+'/back/api/info_importaciones.php';
const API__exportaciones =url+'/back/api/info_exportaciones.php';
const envioImportacion =  url+'/back/api/crear_usuario_pdf_importacion.php';
const envioExportacion =  url+'/back/api/crear_usuario_pdf_exportacion.php';
const terminosImp = url+'/back/api/terminos_validez_imp.php';
const terminosEx = url+'/back/api/terminos_validez_exp.php'
const validacionEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/


let precioFinalPeso = ''
let precioFinalLongitud = ''
let precioFinalVolumen = ''
let precioUnitarioLongitud = ''
let precioUnitarioPeso = ''
let cantidadSelectVolumen = ''
let cantidadSelectLongitud = ''
let cantidadSelectPeso = ''

export default createStore({
  state: {
    productos:{
      puertos__embarque__store: [],
      longitudes__store: '', 
      pesos__store: '',
      precios__longitud__store: '',
      precios__peso__store: '',
      longitudSeleccionada: '',
      pesoSeleccionado: '',
      volumen__store: '',
      volumenSeleccionado:'',
      embarqueSeleccionadoIm: {
        embarque:'',
        index: '',
      },
      precioVolumenStore:'',
    },
    productos2:{
      puertos__llegada__store: '',
      destinoSeleccionado: {
        destino:'',
        index: '',
      },
      longitudes__storeEx: '', 
      pesos__storeEx: '',
      precios__longitud__storeEx: '',
      precios__peso__storeEx: '',
      volumenSeleccionado:'',
      precioVolumenStoreEx:'',
      pesoSeleccionado: '',
    },
    envioCotizador: null,
    informacion:{
      lang:'',
      usuario: {
        nombre: '',
        email:'',
        telefono:'',
      },
      cotizador:{
        embarque: {
          embarque: '',
          index: '', 
        },
        volumen: '',
        longitud:'',
        peso: '',
      },  
      cantidad:{ // Iguales a cotizador
        cantidadFlete: '',
        cantidadLongitud: '', 
        cantidadVolumen: '',
        cantidadPeso:'',
      },
      precios:{ // Precios unitarios
        precioFlete: [],
        precioLongitud: '',
        precioVolumen: '',
        precioPeso:'',
      },
      valor:{ // precios x cantidad
        valorFlete: '',
        valorLongitud: '',
        valorVolumen: '',
        valorPeso:'',
      },
      subtotal:	'',
    },
    informacionExportacion:{
      lang:'',
      usuario: {
        nombre: '',
        email:'',
        telefono:'',
      },
      cotizador:{
        destino: {
          destino: '',
          index: '', 
        },
        volumen: '',
        longitud:'',
        peso: '',
      },  
      cantidad:{ // Iguales a cotizador
        cantidadLongitud: '', 
        cantidadVolumen: '',
        cantidadPeso:'',
      },
      precios:{ // Precios unitarios
        precioFlete: '',
        precioLongitud: '',
        precioVolumen: '',
        precioPeso:'',
      },
      valor:{ // precios x cantidad
        valorFlete: '',
        valorLongitud: '',
        valorVolumen: '',
        valorPeso:'',
      },
      subtotal:	'',
      label: '',
    },
    lang: window.navigator.language.split('-')[0],
    terminosImports: {
      terminos: '',
      validez: '',
    },
    terminosExports: {
      terminos: '',
      validez: '',
    },
    urlImportacion: '',
    urlExportacion: '',
    nuevoValorEmbarque: '',
    nuevoValorDestino: '',
    msgValido: '',
    msgInvalido: '',
    alertSuccess : false,
    alertDanger: false,
    validacion : '',
    parametros: '',
    label: [],
  },
  getters: {
  },
  mutations: {
    setLogitudSeleccionada(state, long){
      state.longitudSelecionada = long
    },
    setImportaciones(state, data){
      state.productos = data;
      //console.log(data)
      state.productos.puertos__embarque__store = data[0].puertos_embarque;
      //console.log(state.productos.puertos__embarque__store, '')
      state.productos.longitudes__store = data[0].long_max;
      state.productos.pesos__store = data[0].peso;
      state.productos.volumen__store = data[0].desconsolidacion;
      state.productos.precios__longitud__store = data[0].long_precio;
      state.productos.precios__peso__store = data[0].peso_precio
      state.informacion.precios.precioFlete = data[0].precioFlete;
      state.productos.precioVolumenStore = data[0].volumen
      //console.log(data[0].precioFlete)
      //console.log(state.productos.puertos__embarque__store )
    },
    setExportaciones(state, data){
      state.productos2 = data;
      //console.log(data)
      state.productos2.puertos__llegada__store = data[0].puertos_llegada;
      //console.log(state.puertos__llegada__store)
      state.productos2.longitudes__storeEx = data[0].long_max;
      state.productos2.pesos__storeEx = data[0].peso;
      state.productos2.volumen__storeEx = data[0].desconsolidacion;
      state.productos2.precios__longitud__storeEx = data[0].long_precio;
      state.productos2.precios__peso__storeEx = data[0].peso_precio
      state.productos2.precioVolumenStoreEx = data[0].volumen
      //console.log(state.productos2.precioVolumenStoreEx)
      state.informacionExportacion.precios.precioFlete = data[0].precioFlete
      state.informacionExportacion.label = data[0].tipoCarga
      //console.log( state.informacionExportacion.label , 'state label')
      //console.log(state.informacionExportacion.label = data[0].label[state.productos2.destinoSeleccionado.index])
      //console.log(data, 'data exportaciones')
    },
    embarqueSeleccionado(state, valorNuevo){
      state.productos.embarqueSeleccionadoIm = valorNuevo
      //console.log(state.productos.embarqueSeleccionadoIm)
    },
    setCalcPrecioFleteImportacion(state, valor){
      console.log(valor)
      let embarqueArray = valor.split(' ')
      state.nuevoValorEmbarque = embarqueArray[0]
      state.informacion.precios.precioFlete = state.nuevoValorEmbarque
    },
    cantidadXPrecio(state, valorNuevo){
      cantidadSelectVolumen = state.informacion.cotizador.volumen
      // Cantidad de volumen seleccionada mandada a la bbdd
      state.productos.volumenSeleccionado = cantidadSelectVolumen
      state.informacion.cantidad.cantidadFlete = cantidadSelectVolumen
      state.informacion.cantidad.cantidadVolumen = cantidadSelectVolumen
      //console.log(state.informacion.cantidad.cantidadVolumen)
      //console.log(cantidadSelectVolumen)
      precioFinalVolumen = cantidadSelectVolumen * state.productos.precioVolumenStore
      //console.log(state.productos.precioVolumenStore , 'precio volumen')
      //console.log(precioFinalVolumen , 'precio final volumen')
      // Precio unitario de volumen mandado a la bbdd
      state.informacion.precios.precioVolumen = state.productos.precioVolumenStore
      // Valor de volumen mandado a la bbdd
      state.informacion.valor.valorVolumen = precioFinalVolumen
      // Acá se multiplica la cantidad ingresada en volumen x el precio del servicio del flete = valor del fletes
      state.informacion.valor.valorFlete = cantidadSelectVolumen * state.nuevoValorEmbarque
      //console.log(cantidadSelectVolumen)
      //console.log(state.nuevoValorEmbarque)
      //console.log(state.informacion.valor.valorFlete)
    },
    longitudConsulta(state, valorNuevo){
      cantidadSelectLongitud = state.informacion.cotizador.longitud
      state.productos.longitudSeleccionada = cantidadSelectLongitud
      //console.log(state.productos.longitudSeleccionada, 'cantidad seleccionada') //este
      //console.log(cantidadSelectLongitud, 'cantidad longitud')
      // Cantidad de longitud seleccionada mandada a la bbdd
      state.informacion.cantidad.cantidadLongitud = cantidadSelectLongitud 
      //console.log(state.informacion.cantidad.cantidadLongitud, 'cantidad')
      //---------//
      if(cantidadSelectLongitud == state.productos.longitudes__store[0]){
        precioFinalLongitud = state.productos.precios__longitud__store[0]
        //console.log(precioFinalLongitud) // da 0
      }else if(cantidadSelectLongitud == state.productos.longitudes__store[1]){
        precioFinalLongitud = state.productos.precios__longitud__store[1]
        //console.log(precioFinalLongitud)
      }else{
        precioFinalLongitud = state.productos.precios__longitud__store[2]
        //console.log(precioFinalLongitud)
      }
      //----------------------------------------------------------------------------//
      if(precioFinalLongitud === state.productos.precios__longitud__store[2]){
        precioUnitarioLongitud = '-------'
        // Precio unitario de longitud mandado a la bbdd
        state.informacion.precios.precioLongitud = precioUnitarioLongitud
      }
      else{
        // Precio unitario de longitud mandado a la bbdd ELSE
        state.informacion.precios.precioLongitud = precioFinalLongitud
      }
      // Valor de longitud mandado a la bbdd
      state.informacion.valor.valorLongitud = precioFinalLongitud
      
    },
    pesoConsulta(state, valorNuevo){
      cantidadSelectPeso = state.informacion.cotizador.peso
      // Cantidad de peso seleccionada mandada a la bbdd
      state.productos.pesoSeleccionado = cantidadSelectPeso
      state.informacion.cantidad.cantidadPeso = cantidadSelectPeso 

      if( cantidadSelectPeso  == state.productos.pesos__store[0]){
        precioFinalPeso = state.productos.precios__peso__store[0]
      }else if(cantidadSelectPeso == state.productos.pesos__store[1]){
        precioFinalPeso = state.productos.precios__peso__store[1]
      }else{
        precioFinalPeso = state.productos.precios__peso__store[2]
      }
      //----------------------------------------------------------------------------//
      if(precioFinalPeso === state.productos.precios__peso__store[2]){
        precioUnitarioPeso = '-------'
        // Precio unitario de peso mandado a la bbdd
        state.informacion.precios.precioPeso = precioUnitarioPeso
      }
      else{
        // Precio unitario de peso  mandado a la bbdd ELSE
        state.informacion.precios.precioPeso = precioFinalPeso
      }
      // Valor de peso mandado a la bbdd
      state.informacion.valor.valorPeso = precioFinalPeso
    },
    setSubtotal(state, subTotal){
      console.log(precioFinalVolumen)
      let sumaTotal = Number(state.informacion.valor.valorFlete)+Number(state.informacion.valor.valorPeso == 'Por confirmar' ? 0 : state.informacion.valor.valorPeso)+Number(state.informacion.valor.valorLongitud == 'Por confirmar' ? 0 : state.informacion.valor.valorLongitud)+Number(state.informacion.valor.valorVolumen)
      console.log(state.informacion.valor.valorFlete)
      console.log(state.informacion.valor.valorPeso)
      console.log(state.informacion.valor.valorLongitud)
      console.log(precioFinalVolumen)
      state.informacion.subtotal = sumaTotal
      console.log(sumaTotal)
    },
    destinoSeleccionado(state, valorNuevo){
      state.productos2.destinoSeleccionado = valorNuevo
    },
    setCalcPrecioFleteExportacion(state, valor){
      state.nuevoValorDestino = valor
      //console.log(state.nuevoValorDestino)
      state.informacionExportacion.precios.precioFlete = state.nuevoValorDestino
      console.log(state.informacionExportacion.precios.precioFlete , 'funcion')
      //return destinoArray[1]
    },
    cantidadXPrecioExportacion(state, valorNuevo){
      cantidadSelectVolumen = state.informacionExportacion.cotizador.volumen
      //console.log(state.informacionExportacion.cotizador.volumen , 'volumen')
      //console.log(cantidadSelectVolumen ,'cantidad volumen')
      // Cantidad de volumen seleccionada mandada a la bbdd
      state.productos2.volumenSeleccionado = cantidadSelectVolumen
      state.informacionExportacion.cantidad.cantidadFlete = cantidadSelectVolumen
      state.informacionExportacion.cantidad.cantidadVolumen = cantidadSelectVolumen
      precioFinalVolumen = cantidadSelectVolumen * state.productos2.precioVolumenStoreEx
      //console.log(cantidadSelectVolumen , 'cantidad')
      //console.log(state.productos2.precioVolumenStoreEx , 'precio volumen')
      //console.log(precioFinalVolumen , 'precio final volumen')
      // Precio unitario de volumen mandado a la bbdd
      state.informacionExportacion.precios.precioVolumen = state.productos2.precioVolumenStoreEx
      // Valor de volumen mandado a la bbdd
      state.informacionExportacion.valor.valorVolumen = precioFinalVolumen
      // Acá se multiplica la cantidad ingresada en volumen x el precio del servicio del flete = valor del flete
      //console.log(state.nuevoValorDestino , 'valor volumen')
      state.informacionExportacion.valor.valorFlete = cantidadSelectVolumen * state.nuevoValorDestino
      //console.log(state.nuevoValorDestino)
      //console.log(state.informacionExportacion.valor.valorFlete)
      //console.log(cantidadSelectVolumen)
    },
    longitudConsultaExportacion(state, valorNuevo){
      cantidadSelectLongitud = state.informacionExportacion.cotizador.longitud
      //console.log(cantidadSelectLongitud , 'exportacion')
      state.productos2.longitudSeleccionada = cantidadSelectLongitud
      
      // Cantidad de longitud seleccionada mandada a la bbdd
      state.informacionExportacion.cantidad.cantidadLongitud = cantidadSelectLongitud 
      //---------//
      if( cantidadSelectLongitud == state.productos2.longitudes__storeEx[0]){
        precioFinalLongitud = state.productos2.precios__longitud__storeEx[0]
        //console.log(precioFinalLongitud)
      }else if(cantidadSelectLongitud == state.productos2.longitudes__storeEx[1]){
        precioFinalLongitud = state.productos2.precios__longitud__storeEx[1]
        //console.log(precioFinalLongitud)
      }else{
        precioFinalLongitud = state.productos2.precios__longitud__storeEx[2]
        //console.log(precioFinalLongitud)
      }
      //----------------------------------------------------------------------------//
      if(precioFinalLongitud === state.productos2.precios__longitud__storeEx[2]){
        precioUnitarioLongitud = '-------'
        // Precio unitario de longitud mandado a la bbdd
        state.informacionExportacion.precios.precioLongitud = precioUnitarioLongitud
      }
      else{
        // Precio unitario de longitud mandado a la bbdd ELSE
        state.informacionExportacion.precios.precioLongitud = precioFinalLongitud
      }
      // Valor de longitud mandado a la bbdd
      state.informacionExportacion.valor.valorLongitud = precioFinalLongitud
      
    },
    pesoConsultaExportacion(state, valorNuevo){
      cantidadSelectPeso = state.informacionExportacion.cotizador.peso
      // Cantidad de peso seleccionada mandada a la bbdd
      state.productos2.pesoSeleccionado = cantidadSelectPeso
      state.informacionExportacion.cantidad.cantidadPeso = cantidadSelectPeso 

      if( cantidadSelectPeso == state.productos2.pesos__storeEx[0]){
        precioFinalPeso = state.productos2.precios__peso__storeEx[0]
        //console.log(precioFinalPeso)
      }else if(cantidadSelectPeso  == state.productos2.pesos__storeEx[1]){
        precioFinalPeso = state.productos2.precios__peso__storeEx[1]
        //console.log(precioFinalPeso)
      }else{
        precioFinalPeso = state.productos2.precios__peso__storeEx[2]
        //console.log(precioFinalPeso)
      }
      //----------------------------------------------------------------------------//
      if(precioFinalPeso === state.productos2.precios__peso__storeEx[2]){
        precioUnitarioPeso = '-------'
        //console.log(precioFinalPeso)
        // Precio unitario de peso mandado a la bbdd
        state.informacionExportacion.precios.precioPeso = precioUnitarioPeso
      }
      else{
        // Precio unitario de peso  mandado a la bbdd ELSE
        state.informacionExportacion.precios.precioPeso = precioFinalPeso
        //console.log(precioFinalPeso)
      }
      //----------------------------------------------------------------------------//
      // Valor de peso mandado a la bbdd
      state.informacionExportacion.valor.valorPeso = precioFinalPeso
      //console.log('valor', state.informacionExportacion.valor.valorPeso)
    },
    setSubtotalExportacion(state, subTotal){
      let sumaTotal = Number(state.informacionExportacion.valor.valorFlete)+Number(state.informacionExportacion.valor.valorPeso == 'Por confirmar' ? 0 : state.informacionExportacion.valor.valorPeso)+Number(state.informacionExportacion.valor.valorLongitud == 'Por confirmar' ? 0 : state.informacionExportacion.valor.valorLongitud)
      state.informacionExportacion.subtotal = sumaTotal
      //console.log(sumaTotal)
    },
    setEspanol(state, language){
      state.lang = "es"
    },
    setEnglish(state, language){
      state.lang = "en"
    },
    setTerminos(state, data){
      state.terminosImports.terminos = data[0].terminos;
      state.terminosImports.validez = data[0].fecha_validez;
      //console.log(data, 'data de validez')
    },
    setTerminosExports(state, data){
      state.terminosExports.terminos = data[0].terminos;
      state.terminosExports.validez = data[0].fecha_validez;
      //console.log(data)
    },
    setUrlImportacion(state, data){
      state.urlImportacion = data
      console.log(data)
    },
    setUrlExportacion(state, data){
      state.urlExportacion = data
      //console.log(state.urlExportacion)
    },
    setLang(state){
      state.informacion.lang = state.lang
      if(state.lang == 'en'){
        if(state.informacion.valor.valorPeso == 'Por confirmar' || state.informacionExportacion.valor.valorPeso == 'Por confirmar'){
          state.informacion.valor.valorPeso = 'To be confirmed'
          state.informacionExportacion.valor.valorPeso = 'To be confirmed'
        }
        if(state.informacionExportacion.valor.valorLongitud == 'Por confirmar' || state.informacion.valor.valorLongitud == 'Por confirmar'){
          state.informacionExportacion.valor.valorLongitud = 'To be confirmed'
          state.informacion.valor.valorLongitud = 'To be confirmed'
        }
      }else{
      }
    },
    setLangExportacion(state){
      state.informacionExportacion.lang = state.lang
      if(state.lang == 'en'){
        if(state.informacion.valor.valorPeso == 'Por confirmar' || state.informacionExportacion.valor.valorPeso == 'Por confirmar'){
          state.informacion.valor.valorPeso = 'To be confirmed'
          state.informacionExportacion.valor.valorPeso = 'To be confirmed'
        }
        if(state.informacionExportacion.valor.valorLongitud == 'Por confirmar' || state.informacion.valor.valorLongitud == 'Por confirmar'){
          state.informacionExportacion.valor.valorLongitud = 'To be confirmed'
          state.informacion.valor.valorLongitud = 'To be confirmed'
        }
      }else{
      }
    },
    setlimpiarFormImportaciones(state){
      //console.log(state.informacion)
      state.informacion = {
        lang:'',
        usuario: {
          nombre: '',
          email:'',
          telefono:'',
        },
        cotizador:{
          embarque: {
            embarque: '',
            index: '', 
          }, 
          volumen: '',
          longitud:'',
          peso: '',
        },  
        cantidad:{
          cantidadFlete: '',
          cantidadLongitud: '', 
          cantidadVolumen: '',
          cantidadPeso:'',
        },
        precios:{
          precioFlete: [],
          precioLongitud: '',
          precioVolumen: '',
          precioPeso:'',
        },
        valor:{
          valorFlete: '',
          valorLongitud: '',
          valorVolumen: '',
          valorPeso:'',
        },
        subtotal:	'',
      }
      //console.log(state.informacion, 'limipioIm')
    },
    setlimpiarFormExportaciones(state){
      //console.log(state.informacionExportacion)
      state.informacionExportacion = {
        lang:'',
        usuario: {
          nombre: '',
          email:'',
          telefono:'',
        },
        cotizador:{
          destino: {
            destino: '',
            index: '', 
          }, 
          volumen: '',
          longitud:'',
          peso: '',
        },  
        cantidad:{
          cantidadFlete: '',
          cantidadLongitud: '', 
          cantidadVolumen: '',
          cantidadPeso:'',
        },
        precios:{
          precioFlete: [],
          precioLongitud: '',
          precioVolumen: '',
          precioPeso:'',
        },
        valor:{
          valorFlete: '',
          valorLongitud: '',
          valorVolumen: '',
          valorPeso:'',
        },
        subtotal:	'',
      }
      //console.log(state.informacionExportacion)
    },
    setValidarImportaciones(state){
      if(state.informacion.cotizador.embarque !== '' && state.informacion.cotizador.volumen !== '' && state.informacion.cotizador.longitud !== '' && 
      state.informacion.cotizador.peso !== '' && state.informacion.usuario.nombre !== '' && state.informacion.usuario.telefono !== '' 
      && state.informacion.usuario.email !== '' && validacionEmail.test(state.informacion.usuario.email)){
        //console.log('Es válido')
        state.validacion = true
      }else{
        //console.log('Es inválido')
        if(state.lang == 'es' ){
          state.msgInvalido = 'Los campos son inválidos'
        }else{
          state.msgInvalido = 'the fields are invalid'
        } 
        state.alertDanger=true
        state.validacion = false
      }
    },
    setValidarExportaciones(state){
      if(state.informacionExportacion.cotizador.embarque !== '' && state.informacionExportacion.cotizador.volumen !== '' && state.informacionExportacion.cotizador.longitud !== '' && 
          state.informacionExportacion.cotizador.peso !== '' && state.informacionExportacion.usuario.nombre !== '' && state.informacionExportacion.usuario.telefono !== '' 
          && state.informacionExportacion.usuario.email !== '' && validacionEmail.test(state.informacionExportacion.usuario.email)){
        //console.log('Es válido')
        state.validacion = true
      }else{
        //console.log('Es inválido')
        if(state.lang == 'es' ){
          state.msgInvalido = 'Los campos son inválidos'
        }else{
          state.msgInvalido = 'the fields are invalid'
        } 
        state.alertDanger=true
        state.validacion = false
      }
    },
    setParamsMutation(state, params){
      if(params.importaciones == 'true'){
        state.informacion.cotizador.longitud = state.productos.longitudes__store[Number(params.long)] 
        state.informacion.cotizador.peso  = state.productos.pesos__store[Number(params.peso)]
        state.informacion.cotizador.volumen = params.vol
        state.lang = params.lang
        state.informacion.lang = params.lang
        if(state.productos.puertos__embarque__store[params.puertoE] != undefined){
          state.informacion.cotizador.embarque.embarque = state.productos.puertos__embarque__store[params.puertoE]
          state.informacion.cotizador.embarque.index = params.puertoE
          state.productos.embarqueSeleccionadoIm = state.informacion.cotizador.embarque
          state.productos.embarqueSeleccionadoIm.embarque = state.productos.puertos__embarque__store[params.puertoE]
          state.productos.embarqueSeleccionadoIm.index = params.puertoE
        }
      }else{
        state.informacionExportacion.cotizador.longitud = state.productos2.longitudes__storeEx[Number(params.long)]
        console.log(state.informacionExportacion.cotizador.longitud, 'después longitud')
        console.log(state.productos2.longitudes__storeEx[Number(params.long)], 'longitud store')
        state.informacionExportacion.cotizador.peso = state.productos2.pesos__storeEx[Number(params.peso)]
        console.log(state.productos2.pesos__storeEx[Number(params.peso)], 'pesos store')
        state.informacionExportacion.cotizador.volumen = params.vol
        console.log(params.vol , 'volumen')
        state.lang = params.lang
        state.informacionExportacion.lang = params.lang
        console.log(state.productos2.puertos__llegada__store[params.puertoE],'destino')
        if(state.productos2.puertos__llegada__store[params.puertoE] !== undefined){
          console.log('Llega acá')
          state.informacionExportacion.cotizador.destino.destino = state.productos2.puertos__llegada__store[params.puertoE]
          state.informacionExportacion.cotizador.destino.destino = state.productos2.puertos__llegada__store[params.puertoE]
          state.informacionExportacion.cotizador.destino.index = params.puertoE
          state.informacionExportacion.label = state.label[state.informacionExportacion.cotizador.destino.index]
          
          state.productos2.destinoSeleccionado = state.informacionExportacion.cotizador.destino
          state.productos2.destinoSeleccionado.destino = state.productos2.puertos__llegada__store[params.puertoE]
          state.productos2.destinoSeleccionado.index = params.puertoE
          state.productos2.destinoSeleccionado.index = state.informacionExportacion.cotizador.destino.index
        }
      }
    },
    setCalcPrecioFleteParams(state, params){
      if(params.importaciones == 'true'){
        let valorParams = state.informacion.precios.precioFlete[params.puertoE]
        //console.log(state.informacion.precios.precioFlete[params.puertoE])
        let embarqueArray = []
        if(valorParams != undefined){
          embarqueArray = valorParams.split(' ')
        }
        state.nuevoValorEmbarque = embarqueArray[0]
        //console.log(state.nuevoValorEmbarque, 'nuevo valor embarque')
        state.informacion.precios.precioFlete = state.nuevoValorEmbarque
        //console.log(state.informacion.precios.precioFlete, 'precio flete')
        //console.log(state.nuevoValorEmbarque , 'nuevo valor embarque')
      }else{
        let valorParamsEX = state.informacionExportacion.precios.precioFlete[params.puertoE]
        console.log(state.informacionExportacion.precios.precioFlete[params.puertoE])
        console.log(valorParamsEX)
        let embarqueArray = []
        if(valorParamsEX != undefined){
          embarqueArray = valorParamsEX.split(' ')
          console.log(embarqueArray[0])
        }
        state.nuevoValorDestino = embarqueArray[0]
        console.log(state.nuevoValorDestino)
        state.informacionExportacion.precios.precioFlete = state.nuevoValorDestino
        console.log(state.informacionExportacion.precios.precioFlete)
        console.log(state.nuevoValorDestino)
      }
    }
  },
  actions: {
    async getImportaciones({commit}){
      await axios.get(API__importaciones).then((response) => {
        commit('setImportaciones', response.data)
        //console.log(response.data[0] , 'data importaciones 1')
      })
      .catch(error => console.log(error))
    },
    async getExportaciones({commit}){
      await axios.get(API__exportaciones).then((response) => {
        commit('setExportaciones', response.data)
        console.log(response.data[0], 'data exportaciones 1')
      })
      .catch(error => console.log(error))
    },
    async getInformacion({commit} , informacion){
      console.log(informacion)
      commit('setLang')  
      await axios.post(envioImportacion , {informacion}).then((response) => {
        console.log(response)
        console.log(informacion)
        commit('setUrlImportacion', response.data.url)
      })
      .catch(error => console.log(error, 'No funciona getInformacion'))
    },
    async getInformacionExportacion({commit} , informacionExportacion){
      commit('setLangExportacion')  
      let informacion = {
        'informacion' : informacionExportacion
      }
      //console.log(informacion, ' informacion')
      await axios.post(envioExportacion , informacion).then((response) => {
        console.log(response.data)
        console.log(informacion)
        commit('setUrlExportacion', response.data.url)
      }) 
      .catch(error => console.log(error, 'No funciona getInformacionExportacion'))
    },
    async getTerminosImportaciones({commit}){
      await axios.get(terminosImp).then((response) => {
       commit('setTerminos', response.data)
       console.log(response.data , 'terminos importaciones')
     })
     .catch(error => console.log(error, 'No funciona terminosImportaciones'))
    },
    async getTerminosExportaciones({commit}){
      axios.get(terminosEx).then((response) => {
      commit('setTerminosExports', response.data)
      console.log(response.data)
    })
    .catch(error => console.log(error, 'No funciona terminosImportaciones'))
    },
    getCalcPrecioFleteImportacion({commit}, valor){
      commit('setCalcPrecioFleteImportacion', valor)
    },
    getCalcPrecioFleteExportacion({commit}, valorEx){
      commit('setCalcPrecioFleteExportacion', valorEx)
    },
    cantidadXPrecio({ commit }, valorNuevo){
      commit('cantidadXPrecio', valorNuevo)
    },
    longitudConsulta({ commit }, valorNuevo){
      commit('longitudConsulta',valorNuevo)
    },
    embarqueConsulta({ commit }, valorNuevo){
      commit('embarqueSeleccionado', valorNuevo)
    },
    pesoConsulta({ commit }, valorNuevo){
      commit('pesoConsulta', valorNuevo)
    },
    getSubtotal({commit}, subTotal){
      commit('setSubtotal', subTotal)
    },
    cantidadXPrecioExportacion({ commit }, valorNuevo){
      commit('cantidadXPrecioExportacion', valorNuevo)
    },
    longitudConsultaExportacion({ commit }, valorNuevo){
      commit('longitudConsultaExportacion',valorNuevo)
    },
    destinoConsultaExportacion({ commit }, valorNuevo){
      commit('destinoSeleccionado', valorNuevo)
    },
    pesoConsultaExportacion({ commit }, valorNuevo){
      commit('pesoConsultaExportacion', valorNuevo)
    },
    getSubtotalExportacion({commit}, subTotal){
      commit('setSubtotalExportacion', subTotal)
    },
    getEspanol({commit}){
      commit('setEspanol')
    },
    getEnglish({commit}, language){
      commit('setEnglish', language)
    },
    limpiarFormImportaciones({commit}){
      commit('setlimpiarFormImportaciones')
    },
    limpiarFormExportaciones({commit}){
      commit('setlimpiarFormExportaciones')
    },
    validarImportaciones({commit}){
      commit('setValidarImportaciones')
    },
    validarExportaciones({commit}){
      commit('setValidarExportaciones')
    },
    setParams({commit}, params){
      //-----//
      commit('setParamsMutation', params),
      commit('setCalcPrecioFleteParams', params)
      //-----//
      commit('longitudConsulta', params.long)
      commit('cantidadXPrecio', params.vol)
      commit('pesoConsulta', params.peso)
      
      //-----//
      commit('longitudConsultaExportacion', params.long)
      commit('cantidadXPrecioExportacion', params.vol)
      commit('pesoConsultaExportacion', params.peso)
      //----//
    },
  },
  modules: {
  }
})
