import { createStore } from 'vuex'
import {router} from "../main.js"
import axios from "axios";
const API__importaciones = 'https://cotizador.knowdo.studio/back/api/info_importaciones.php';
const API_exportaciones ='https://cotizador.knowdo.studio/back/api/info_exportaciones.php';
const envioDatosUsuarioCotizador = 'https://cotizador.knowdo.studio/back/cotizador/api/crear_usuario_pdf.php';
let precioFinalPeso = ''
let precioFinalLongitud = ''
let precioFinalVolumen = ''
let precioUnitarioLongitud = ''
let precioUnitarioPeso = ''
let cantidadSelectVolumen = ''
let precioVolumen = ''
let cantidadSelectLongitud = ''
let cantidadSelectPeso = ''
export default createStore({
  state: {
    productos: {
      puertos__embarque__store: '',
      longitudes__store: '', 
      pesos__store: '',
      puertos__llegada__store: '',
      precios__longitud__store: '',
      precios__peso__store: '',
      longitudSelecionada: '',
      pesoSeleccionado: '',
      volumen__store: '',
      volumenSeleccionado: '',
      embarqueSeleccionado: '',
    },
    envioCotizador: null,
    informacion:{
      usuario: {
        nombre: '',
        email:'',
        telefono:'',
      },
      cotizador:{
        embarque: '',
        volumen: '',
        longitud:'',
        peso: '',
      },  
      cantidad:{ // Iguales a cotizador
        cantidadFlete: '1',
        cantidadLongitud: '', 
        cantidadVolumen: '',
        cantidadPeso:'',
      },
      precios:{ // Precios unitarios
        preciosFlete: '1',
        preciosLongitud: '',
        preciosVolumen: '',
        preciosPeso:'',
      },
      valor:{ // precios x cantidad
        valorFlete: '1',
        valorLongitud: '',
        valorVolumen: '',
        valorPeso:'',
      },
      subtotal:	'',
    },
    resultados:'',
  },
  getters: {
  },
  mutations: {
    setLogitudSeleccionada(state, long){
      state.longitudSelecionada = long
    },
    setImportaciones(state, data){
      state.productos = data;
      console.log(data)
      state.puertos__embarque__store = data[0].puertos_embarque;
      state.longitudes__store = data[0].long_max;
      state.pesos__store = data[0].peso;
      state.volumen__store = data[0].desconsolidacion;
      state.precios__longitud__store = data[0].long_precio;
      state.precios__peso__store = data[0].peso_precio
      
    },
    setExportaciones(state, data){
      state.productos = data;
      //console.log(data)
      state.response = response.data
      state.puertos__llegada__store = response.data[0].puertos_llegada;
    },
    setInformacion(state, data){
      data.push(state.informacion)
      console.log(state.informacion)
    },
    embarqueSeleccionado(state, valorNuevo){
      state.productos.embarqueSeleccionado = valorNuevo
    },
    cantidadXPrecio(state, valorNuevo){
      cantidadSelectVolumen = state.informacion.cotizador.volumen
      // Cantidad de volumen seleccionada mandada a la bbdd
      state.productos.volumenSelecionado = valorNuevo
      state.informacion.cantidad.cantidadVolumen = cantidadSelectVolumen
      precioVolumen = 2;
      precioFinalVolumen = cantidadSelectVolumen * precioVolumen
      // Precio unitario de volumen mandado a la bbdd
      state.informacion.precios.preciosVolumen = precioVolumen
      // Valor de peso mandado a la bbdd
      state.informacion.valor.valorVolumen = precioFinalVolumen
    },
    longitudConsulta(state, valorNuevo){
      cantidadSelectLongitud = state.informacion.cotizador.longitud
      state.productos.longitudSelecionada = valorNuevo
      // Cantidad de longitud seleccionada mandada a la bbdd
      state.informacion.cantidad.cantidadLongitud = cantidadSelectLongitud 
      //---------//
      if( cantidadSelectLongitud < 2){
        precioFinalLongitud = state.precios__longitud__store[0]
      }else if(cantidadSelectLongitud >= 2 && cantidadSelectLongitud <= 4){
        precioFinalLongitud = state.precios__longitud__store[1]
      }else{
        precioFinalLongitud = state.precios__longitud__store[2]
      }
      //----------------------------------------------------------------------------//
      if(precioFinalLongitud === state.precios__longitud__store[2]){
        precioUnitarioLongitud = '-------'
        // Precio unitario de longitud mandado a la bbdd
        state.informacion.precios.preciosLongitud = precioUnitarioLongitud
      }
      else{
        // Precio unitario de longitud mandado a la bbdd ELSE
        state.informacion.precios.preciosLongitud = precioFinalLongitud
      }
      // Valor de longitud mandado a la bbdd
      state.informacion.valor.valorLongitud = precioFinalLongitud
      
    },
    pesoConsulta(state, valorNuevo){
      cantidadSelectPeso = state.informacion.cotizador.peso
      // Cantidad de peso seleccionada mandada a la bbdd
      state.productos.pesoSeleccionado = valorNuevo
      state.informacion.cantidad.cantidadPeso = cantidadSelectPeso 

      if( cantidadSelectPeso < 2){
        precioFinalPeso = state.precios__peso__store[0]
      }else if(cantidadSelectPeso >= 5 && cantidadSelectPeso <= 7.5){
        precioFinalPeso = state.precios__peso__store[1]
      }else{
        precioFinalPeso = state.precios__peso__store[2]
      }
      //----------------------------------------------------------------------------//
      if(precioFinalPeso === state.precios__peso__store[2]){
        precioUnitarioPeso = '-------'
        // Precio unitario de peso mandado a la bbdd
        state.informacion.precios.preciosPeso = precioUnitarioPeso
      }
      else{
        // Precio unitario de peso  mandado a la bbdd ELSE
        state.informacion.precios.preciosPeso = precioFinalPeso
      }
      // Valor de peso mandado a la bbdd
      state.informacion.valor.valorPeso = precioFinalPeso
    },
    setSubtotal(state, subTotal){
      let sumaTotal = Number(state.informacion.valor.valorVolumen) + Number(state.informacion.valor.valorPeso)  + Number(state.informacion.valor.valorLongitud)  
      state.informacion.subtotal = sumaTotal
      //console.log(sumaTotal)
    },
  },
  actions: {
    async getImportaciones({commit}){
      await axios.get(API__importaciones).then((result) => {
        commit('setImportaciones', result.data)
      })
      .catch(error => console.log(error))
    },
    async getExportaciones({commit}){
      await axios.get(API_exportaciones).then((response) => {
        commit('setExportaciones', response.data)
      })
      .catch(error => console.log(error))
    },
    async getInformacion({commit} , informacion){
      //Va a dar error pero es por la url, los datos se mandan correctamente!
      await axios.post(API_exportaciones , informacion).then((response) => {
        commit('setInformacion', response.data)
      })
      .catch(error => console.log(error, 'No funciona getInformacion'))
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
    }
  },
  modules: {
  }
})
