<template>
  <div class="col-12 col-xxl-7 caja mb-3 mb-lg-0">
    <div class="row">
        <div class="col-12 d-flex flex-column justify-content-center align-items-start">
          <h2>{{ $t("message.cotizador", {}, { locale: $store.state.lang }) }} 
            <div v-if="rutaName == 'ImportacionesView'">  {{ $t("message.importaciones", {}, { locale: $store.state.lang }) }}</div>
            <div v-else>  {{ $t("message.exportaciones", {}, { locale: $store.state.lang }) }}</div>
          </h2>
          <h3>{{ $t("message.ltl", {}, { locale: $store.state.lang }) }}</h3>
          <span></span>
        </div>
        <div class="col-12 d-flex flex-column justify-content-center align-items-center mt-5 px-0">
          <div class="row row__width">
              <div class="col-6 col-lg-8 d-flex justify-content-start align-items-center">
                <img src="../../../public/img/cotizador_icons/puerto.svg" alt="">
                <p v-if="rutaName == 'ImportacionesView'">  {{ $t("message.puertoDestino", {}, { locale: $store.state.lang }) }}</p>
                <p  v-else >  {{ $t("message.puertoEmbarque", {}, { locale: $store.state.lang }) }}</p>
              </div>
              <div class="col-6 col-lg-4 justify-content-end align-items-center">
                <h6>ZLC, Panamá</h6>
              </div>
              <div class="col-12 d-flex justify-content-start align-items-center  py-4">
                <img src="../../../public/img/cotizador_icons/embarque.svg" alt="">
                <p v-if="rutaName == 'ImportacionesView'">  {{ $t("message.puertoEmbarque", {}, { locale: $store.state.lang }) }}</p>
                <p v-else  >  {{ $t("message.puertoDestino", {}, { locale: $store.state.lang }) }}</p>
              </div>
              <div class="col-12 d-flex flex-column justify-content-start align-items-center pb-4">
                <select class="form-select" data-display="Select" id="selectImportaciones" aria-label="Default select example" v-if="rutaName == 'ImportacionesView'" v-model="informacion.cotizador.embarque" @change="changeEmbarque(), calcPrecioFleteImportacion()">
                  <option v-for="(puerto, index) in $store.state.productos.puertos__embarque__store" :key="index" :selected="getPort() ==  index" :value="getValue(puerto, index)">{{puerto}}</option>
                </select>
                <!----->
                <select class="form-select" aria-label="Default select example" id="" v-model="informacionExportacion.cotizador.destino" @change="changeDestinoExportacion(), calcPrecioFleteExportacion() " v-else>
                  <option v-for="(puertoLL, indexLL) in $store.state.productos2.puertos__llegada__store" :key="indexLL" :selected="getPortExport() ==  indexLL" :value="getValueExport(puertoLL, indexLL)">{{puertoLL}}</option>
                </select>
              </div>
          </div>
          <div class="row row__width">
              <div class="col-6 d-flex justify-content-start align-items-center">
              <img src="../../../public/img/cotizador_icons/volumen.svg" alt="">
              <p>{{ $t("message.volumen", {}, { locale: $store.state.lang }) }}</p>
              </div>
              <div class="col-6">
                <input type="number" name="" id="selectVolumen" v-model="informacion.cotizador.volumen"  @change="changeCantidad()" min="0" v-if="rutaName == 'ImportacionesView'" >
                <input type="number" name="" id="selectVolumen" v-model="informacionExportacion.cotizador.volumen"   @change="changeCantidadExportacion()" min="0" v-else >
              </div>
          </div>
          <div class="row row__width">
              <div class="col-6 d-flex justify-content-start align-items-center">
              <img src="../../../public/img/cotizador_icons/longitud.svg" alt="">
              <p>{{ $t("message.longitud", {}, { locale: $store.state.lang }) }}</p>
              </div>
              <div class="col-6">
              <select class="form-select select_sin_borde select" aria-label="Default select example"
               id="selectLongitudImportaciones" v-model="informacion.cotizador.longitud" @change="changeLongitud()" v-if="rutaName == 'ImportacionesView'" >
                  <option v-for="(longitud, index_long) in $store.state.productos.longitudes__store " :key="index_long" :value="longitud">{{longitud}}</option>
              </select>
              <select class="form-select select_sin_borde select" aria-label="Default select example"
               id="selectLongitud" v-model="informacionExportacion.cotizador.longitud" @change="changeLongitudExportacion()" v-else >
                  <option v-for="(longitud, index_long) in $store.state.productos2.longitudes__storeEx" :key="index_long" :value="longitud">{{longitud}}</option>
              </select>
              </div>
          </div>
          <div class="row row__width">
              <div class="col-6 d-flex justify-content-start align-items-center">
              <img src="../../../public/img/cotizador_icons/peso.svg" alt="">
              <p>{{ $t("message.peso", {}, { locale: $store.state.lang }) }}</p>
              </div>
              <div class="col-6">
              <select class="form-select select_sin_borde select" aria-label="Default select example" 
                id="selectPesoImportaciones" v-model="informacion.cotizador.peso" @change="changePeso()" v-if="rutaName == 'ImportacionesView'" >
                  <option v-for="(peso, index_peso) in $store.state.productos.pesos__store " :key="index_peso" :value="peso">{{peso}}</option>
              </select>
              <select class="form-select select_sin_borde select" aria-label="Default select example" 
                id="selectPeso" v-model="informacionExportacion.cotizador.peso" @change="changePesoExportacion()" v-else > 
                  <option v-for="(peso, index_peso) in $store.state.productos2.pesos__storeEx " :key="index_peso" :value="peso">{{peso}}</option>
              </select>
              </div>
              
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import Select2 from 'vue3-select2-component';
export default{
  name: 'CotizadorModal',
  data(){
    return{
      rutaName : this.$route.name,
      options:[],
      localStorage : ''
    }
  },
  created(){
    this.getImportaciones().then(() => {
      if(this.$route.query != undefined && this.$route.query.importaciones!=undefined){
      //console.log('entro a la condicion de tener parametros')
      
        this.LocalStorage()
      }
      this.preguntaRuta()
    }
    )

    this.getExportaciones().then(() => {
      if(this.$route.query != undefined && this.$route.query.importaciones != undefined){
        this.LocalStorage()
      }
        this.preguntaRuta()
      }
    )
  },
  components: {
    Select2,
  },
  props:{
    cotizador1:{
      type: String,
      default: 'importaciones',
    },
    sentido:{
      type: String,
      default: 'Embarque'
    },
    sentido2:{
      type: String,
      default: 'Embarque',
    }
  },
  methods:{
    ...mapActions(['getImportaciones', 'getExportaciones','cantidadXPrecio', 'longitudConsulta', 'pesoConsulta', 'embarqueConsulta'
    ,'cantidadXPrecioExportacion', 'longitudConsultaExportacion', 'pesoConsultaExportacion'
    , 'destinoConsultaExportacion', 'getCalcPrecioFleteImportacion', 'getCalcPrecioFleteExportacion', 'setParams']),
    ...mapMutations(['setImportaciones', 'setExportaciones']),
    changeLongitud(){
      this.longitudConsulta(this.informacion.cotizador.longitud)
    },
    changeCantidad(){
      this.cantidadXPrecio(this.informacion.cotizador.volumen)
    },
    changePeso(){
      this.pesoConsulta(this.informacion.cotizador.peso)
    },
    changeEmbarque(){
      //console.log(this.informacion.cotizador.embarque)
      this.embarqueConsulta(this.informacion.cotizador.embarque)
    },
    changeLongitudExportacion(){
      
      this.longitudConsultaExportacion(this.informacionExportacion.cotizador.longitud)
    },
    changeCantidadExportacion(){
      this.cantidadXPrecioExportacion(this.informacionExportacion.cotizador.volumen)
    },
    changePesoExportacion(){
      this.pesoConsultaExportacion(this.informacionExportacion.cotizador.peso)
    },
    changeDestinoExportacion(){
      this.destinoConsultaExportacion(this.informacionExportacion.cotizador.destino)
    },
    getValue(puerto,index){
      return {
        embarque: puerto,
        index: index
      }
    },
    calcPrecioFleteImportacion(){
      //console.log(this.informacion.precios.precioFlete[this.productos.embarqueSeleccionadoIm.index])
      this.getCalcPrecioFleteImportacion(this.informacion.precios.precioFlete[this.productos.embarqueSeleccionadoIm.index])
    },
    getValueExport(puertoLL ,indexLL){
      return {
        destino: puertoLL,
        index: indexLL
      }
    },
    calcPrecioFleteExportacion(){
      this.getCalcPrecioFleteExportacion(this.informacionExportacion.precios.precioFlete[this.productos2.destinoSeleccionado.index])
    },
    preguntaRuta(){
      //Segundo
      if(this.$route.query !== ''){
        if(this.$route.query.importaciones == 'true'){
          this.$router.push('/')
        }else if(this.$route.query.importaciones == 'false'){
          this.$router.push('/exportaciones')
        }
      }else if (this.$route.query === ''){
        return
      }
    },
    LocalStorage(){
      localStorage.setItem('parametrosJSON', JSON.stringify(this.$route.query))
      this.setParams(this.$route.query)
    },
    getPort(){
      if(localStorage.getItem('parametrosJSON')){
        let valores = localStorage.getItem('parametrosJSON')
        return valores.puertoE
      }else{
        return null
      }
    },
    getPortExport(){
      if(localStorage.getItem('parametrosJSON')){
        //console.log('entra al if')
        let valores = localStorage.getItem('parametrosJSON')
        //console.log(valores.puertoE, 'puertos')
        return valores.puertoE
      }else{
        return null
      }
    },
  },
  computed:{
    ...mapState(['cotizador', 'informacion', 'informacionExportacion', 'productos', 'productos2', 'parametros']),
  },
}
</script>

<style lang="scss" scoped>
.caja{
    background: #FFFFFF;
    box-shadow: 0px 4px 24px rgba(109, 141, 173, 0.15);
    border-radius: 25px;
    min-height: 70vh;
    width: 100%;
    border-radius: 20px;
    padding: 60px 60px;
    overlay{
      background-color: transparent;
      position: fixed;
      z-index: 1;
    }
    @media (min-width: 992px) {
      max-width: 48%;
    }
    h2{
      font-family: 'Century Gothic', sans-serif;
      font-weight: 600;
      font-size: 34px;
      line-height: 105.32%;
      color: #FF0000;
      text-align: left;
      width: 100%;
      display: flex;
      div{
        max-width: 100%;
        margin-left: 7px;
      }
    }
    h3{
      font-family: 'Century Gothic';
      font-weight: 400;
      font-size: 20px;
      line-height: 25px;
      text-align: left;
      color: #000000;
      padding: 20px 0px;
    }
    span{
      height: 5px;
      width: 15%;
      background: #FF0000;
      border-radius: 23px;
      margin-top: 0px;
    }
    h6{
      font-family: 'Century Gothic';
      font-weight: 600;
      font-size: 18px;
      line-height: 22px;
      text-align: end;
      color: #000000;
    }
    p{
      font-family: 'Century Gothic';
      font-weight: 400;
      font-size: 18px;
      line-height: 22px;
      text-align: left;
      color: #000000;
    }
    img + p{
      padding-left: 15px;
    }
    select, input, .select2-container--default .select2-selection--single{
      background-color: #FAFAFA;
      height: 68px !important;
      font-family: 'Century Gothic';
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      text-align: start;
      color: #000000;
      border: 1px solid #D2D2D2 !important;
      margin: 10px 0px;
      &:focus{
        outline: none;
      }
    }
    .select{
      max-height: 50px;
    }
    input{
      padding: 0px 15px;
      text-align: center;
      border: 1px solid #D2D2D2;
      background-color: transparent;
      border-radius: 8px;
      max-height: 50px;
      margin: 10px 0px;
      width: 100%;
      &:focus, &:hover {
        border: 1px solid #000;
      }
    }
    .form-select:focus {
      border-color: #000;
      outline: 0;
      box-shadow: none;
    }
    .select_sin_borde{
      text-align: center;
    }
    h4{
      font-family: 'Century Gothic';
      font-weight: 600;
      font-size: 30px;
      line-height: 133%;
      color: #000000;
      padding-left: 15px;
    }
    h5{
      font-family: 'Poppins';
      font-weight: 400;
      font-size: 18px;
      line-height: 133%;
      color: #66737B;
      padding: 10px 0px 20px 0px;
    }
    @media (max-width: 992px) {
      padding: 20px 30px;
       img{
        height: 15px;
      }
      img + p{
        padding-left: 3px;
      }
      h2{
        font-size: 24px;
      }
      h3{
        font-size: 16px;
        padding-bottom: 5px;
      }
      span{
        margin-top: 5px;
      }
      h6, p{
        font-size: 14px;
      }
      select{
        font-size: 14px;
      }
    }
    @media (max-width: 1600px) {
      h2{
        font-size: 28px;
      }
      h3{
        font-size: 16px;
      }
      h6, p, select, input, .select2-container--default .select2-selection--single{
        font-size: 16px;
      }
    }
}
</style>