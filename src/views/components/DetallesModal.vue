<template>
    <div class="row justify-content-center">
        <div class="col-12 caja justify-content-center align-items-center">
            <div class="row">
                <div class="col-12 d-flex justify-content-start align-items-center px-0">
                    <h2>{{ $t("message.cotizador", {}, { locale: $store.state.lang }) }} 
                      <div v-if="calcularRuta">  {{ $t("message.importaciones", {}, { locale: $store.state.lang }) }}</div>
                      <div v-else>  {{ $t("message.exportaciones", {}, { locale: $store.state.lang }) }}</div>
                    </h2>
                </div>
                <div class="col-12 d-flex justify-content-center align-items-center my-3 px-0">
                  <div class="row row__width justify-content-end">
                      <div class="col-12 col-lg-5  d-flex justify-content-between align-items-center px-0">
                        <p v-if="calcularRuta">{{ $t("message.puertoEmbarque", {}, { locale: $store.state.lang }) }}</p>
                        <p  v-else>{{ $t("message.puertoDestino", {}, { locale: $store.state.lang }) }}</p>
                        <h4 v-if="calcularRuta">{{$store.state.productos.embarqueSeleccionadoIm.embarque}}</h4>
                        <h4 v-else>{{$store.state.productos2.destinoSeleccionado.destino}}</h4>
                      </div>
                  </div>
                </div>
                <div class="col-12 col-lg-7 d-flex justify-content-start align-items-center mt-4 px-0">
                  <img src="../../../public/img/cotizador_icons/ltl.svg" alt="">
                  <p v-if=" calcularRuta">{{ $t("message.ltl", {}, { locale: $store.state.lang }) }}</p>
                  <p v-else-if="$store.state.label[$store.state.productos2.destinoSeleccionado.index] == 'LTL'">{{ $t("message.ltl", {}, { locale: $store.state.lang }) }}</p>
                  <p v-else="$store.state.label[$store.state.productos2.destinoSeleccionado.index] == 'LCL'">{{ $t("message.lcl", {}, { locale: $store.state.lang }) }}</p>
                </div>
                <div class="col-12 col-lg-5 mt-3 mt-lg-0  d-flex justify-content-between align-items-center px-0">
                  <p>{{ $t("message.volumen2", {}, { locale: $store.state.lang }) }}</p>
                  <h4 v-if="calcularRuta">{{$store.state.productos.volumenSeleccionado}}</h4>
                  <h4 v-else>{{$store.state.productos2.volumenSeleccionado}}</h4>
                </div>
                <div class="col-12 col-lg-7 d-flex justify-content-start align-items-center mt-4 px-0">
                  <img src="../../../public/img/cotizador_icons/puerto.svg" alt="">
                  <p  v-if="calcularRuta">  {{ $t("message.puertoDestino", {}, { locale: $store.state.lang }) }} ZLC, Panamá</p>
                  <p v-else>  {{ $t("message.puertoEmbarque", {}, { locale: $store.state.lang }) }} ZLC, Panamá</p>
                </div>
                <div class="col-12 col-lg-5 mt-3 mt-lg-0  d-flex justify-content-between align-items-center px-0">
                  <p>{{ $t("message.longitud", {}, { locale: $store.state.lang }) }}</p>
                  <h4 v-if="calcularRuta">{{$store.state.productos.longitudSeleccionada}} {{ $t("message.metros", {}, { locale: $store.state.lang }) }}</h4>
                  <h4 v-else>{{$store.state.productos2.longitudSeleccionada}} {{ $t("message.metros", {}, { locale: $store.state.lang }) }}</h4>
                </div>
                <div class="col-12 col-lg-7 d-flex justify-content-start align-items-center mt-4 px-0">
                  <img src="../../../public/img/cotizador_icons/validez.svg" alt="">
                  <p v-if="calcularRuta">{{ $t("message.validez", {}, { locale: $store.state.lang }) }} {{$store.state.terminosImports.validez}}</p>
                  <p v-else> {{ $t("message.validez", {}, { locale: $store.state.lang }) }} {{$store.state.terminosExports.validez}}</p>
                </div>
                <div class="col-12 col-lg-5 mt-3 mt-lg-0  d-flex justify-content-between align-items-center px-0">
                  <p>{{ $t("message.peso", {}, { locale: $store.state.lang }) }}</p>
                  <h4 v-if="calcularRuta">{{$store.state.productos.pesoSeleccionado}} {{ $t("message.toneladas", {}, { locale: $store.state.lang }) }}</h4>
                  <h4 v-else>{{$store.state.productos2.pesoSeleccionado}} {{ $t("message.toneladas", {}, { locale: $store.state.lang }) }}</h4>
                </div>
            </div>
            <div class="row my-4 my-lg-5 tabla">
              <div class="col-12 tabla_scroll">
                <div class="row rojo" :class="{'azul' : azul_row}">
                    <div class="col-4 div_rojo">
                        <h5>{{ $t("message.desCargos", {}, { locale: $store.state.lang }) }}</h5>
                    </div>
                    <div class="col-3 div_rojo">
                        <h5>{{ $t("message.cantidad", {}, { locale: $store.state.lang }) }}</h5>
                    </div>
                    <div class="col-2 div_rojo">
                        <h5>{{ $t("message.precio", {}, { locale: $store.state.lang }) }}</h5>
                    </div>
                    <div class="col-3 div_rojo">
                        <h5>{{ $t("message.valor", {}, { locale: $store.state.lang }) }}</h5>
                    </div>
                </div>
                <div class="row gris_claro mt-3">
                    <div class="col-4 div_gris"><p>{{ $t("message.flete", {}, { locale: $store.state.lang }) }}</p></div>
                    <div class="col-3 div_gris">
                      <p v-if="calcularRuta">{{$store.state.productos.volumenSeleccionado}}</p>
                      <p v-else>{{$store.state.productos2.volumenSeleccionado}}</p>
                    </div>
                    <div class="col-2 div_gris">
                      <h6 v-if="calcularRuta">$ {{$store.state.nuevoValorEmbarque}}</h6>
                      <h6 v-else>$ {{$store.state.nuevoValorDestino}}</h6>
                    </div>
                    <div class="col-3 div_gris">
                      <h6 v-if="calcularRuta">$ {{$store.state.informacion.valor.valorFlete}}</h6>
                      <h6 v-else>$ {{$store.state.informacionExportacion.valor.valorFlete}}</h6>
                    </div>
                </div>
                <div class="row gris_claro" v-if="calcularRuta">
                    <div class="col-4 div_gris"><p>{{ $t("message.desconsolidacion", {}, { locale: $store.state.lang }) }}</p></div>
                    <div class="col-3 div_gris">
                      <p>{{$store.state.productos.volumenSeleccionado}}</p>
                    </div>
                    <div class="col-2 div_gris">
                      <h6>$ {{$store.state.informacion.precios.precioVolumen}}</h6>
                    </div>
                    <div class="col-3 div_gris">
                      <h6>$ {{$store.state.informacion.valor.valorVolumen}}</h6>
                    </div>
                </div>
                <div v-else></div>
                <div class="row gris_claro">
                    <div class="col-4 div_gris"><p>{{ $t("message.sobreDim", {}, { locale: $store.state.lang }) }}</p></div>
                    <div class="col-3 div_gris">
                      <p v-if="calcularRuta">{{$store.state.productos.longitudSeleccionada}}</p>
                      <p v-else>{{$store.state.productos2.longitudSeleccionada}}</p>
                    </div>
                    <div class="col-2 div_gris">
                      <h6 v-if="calcularRuta"> {{$store.state.informacion.precios.precioLongitud}}</h6>
                      <h6 v-else> {{$store.state.informacionExportacion.precios.precioLongitud}}</h6>
                    </div>
                    <div class="col-3 div_gris">
                      <h6 v-if="calcularRuta">$ {{$store.state.informacion.valor.valorLongitud}}</h6>
                      <h6 v-else>$ {{$store.state.informacionExportacion.valor.valorLongitud}}</h6>
                    </div>
                </div>
                <div class="row gris_claro mb-3">
                    <div class="col-4 div_gris"><p>{{ $t("message.sobrePeso", {}, { locale: $store.state.lang }) }}</p></div>
                    <div class="col-3 div_gris">
                      <p v-if="calcularRuta">{{$store.state.productos.pesoSeleccionado}}</p>
                      <p v-else>{{$store.state.productos2.pesoSeleccionado}}</p>
                    </div>
                    <div class="col-2 div_gris">
                      <h6 v-if="calcularRuta"> {{$store.state.informacion.precios.precioPeso}}</h6>
                      <h6 v-else> {{$store.state.informacionExportacion.precios.precioPeso}}</h6>
                    </div>
                    <div class="col-3 div_gris">
                      <h6 v-if="calcularRuta">$ {{$store.state.informacion.valor.valorPeso}}</h6>
                      <h6 v-else>$ {{$store.state.informacionExportacion.valor.valorPeso}}</h6>
                    </div>
                </div>
                <div class="row gris_oscuro">
                    <div class="col-4 div_gris"></div>
                    <div class="col-3 div_gris"></div>
                    <div class="col-2 div_gris"><h6 class="text-uppercase">{{ $t("message.subtotal", {}, { locale: $store.state.lang }) }}</h6></div>
                    <div class="col-3 div_gris">
                      <h6 v-if="calcularRuta">${{$store.state.informacion.subtotal}}</h6>
                      <h6 v-else>${{$store.state.informacionExportacion.subtotal}}</h6>
                    </div>
                </div>
              </div>
            </div>
            <div class="row justify-content-center  justify-content-lg-end  botones mt-lg-5 mb-lg-3">
                <button class="col-10 col-lg-3 gris_btn" v-if="calcularRuta" @click="abrirPdfImport()">
                  {{ $t("message.pdf", {}, { locale: $store.state.lang }) }}
                </button>
                <button class="col-10 col-lg-3 gris_btn" v-else @click="abrirPdfExport()">
                  {{ $t("message.pdf", {}, { locale: $store.state.lang }) }}
                </button>
                <button class="col-10 col-lg-3 rojo_btn">
                  {{ $t("message.asesor", {}, { locale: $store.state.lang }) }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default{
  name: 'DetallesModal',
  data(){
    return{
      rutaName: this.$route.name,
    }
  },
  props:{
    cotizador2:{
      type: String,
      default: 'importaciones',
    },
    azul_row:{
      type: Boolean,
      default: false
    },
    sentido:{
      type: String,
      default: 'Embarque (POL)'
    },
    sentido2:{
      type: String,
      default: 'Destino: ZLC, Panamá'
    }
  },
  methods: {
    abrirPdfImport(){
      //console.log(this.urlImportacion)
      window.open(this.urlImportacion, '_blank');
    },
    abrirPdfExport(){
      //console.log(this.urlExportacion)
      window.open(this.urlExportacion, '_blank');
    },
  },
  computed: {
    ...mapState(['informacion', 'productos', 'urlImportacion', 'informacionExportacion', 'urlExportacion', 'productos2']),
    calcularRuta(){
      return this.cotizador2 === 'importaciones'
    },
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
  h2{
    font-family: 'Century Gothic', sans-serif;
    font-weight: 600;
    font-size: 34px;
    line-height: 105.32%;
    color: #FF0000;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    div{
      margin-left: 8px;
    }
    @media (max-width: 992px) {
      flex-direction: column;
    }
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
  h4{
    font-family: 'Century Gothic';
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    text-align: end;
    color: #000000;
  }
  .rojo{
    background: #FF0000;
    height: 7vh;
    .div_rojo{
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid #ffffffa8;
      h5{
        color: #FFFFFF;
        font-family: 'Century Gothic';
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        text-transform: uppercase;
        
      }
    }
  }
  .azul{
    background: #374049;
  }
  .gris_claro{
    background-color: #F6F6F6;
    height: 7vh;
    margin-top: 7px;
    .div_gris{
      border-right: 1px solid #ffffffa8;
      display: flex;
      justify-content: center;
      align-items: center;
      p{
        font-family: 'Century Gothic';
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        color: #374049;
      }
      h6{
        font-family: 'Century Gothic';
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        color: #000000;
      }
    }
  }
  .gris_oscuro{
    background-color: #D9D9D9;
    height: 7vh;
    .div_gris{
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid #ffffffa8;
      h6{
        font-family: 'Century Gothic';
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        color: #000000;
      }
    }
  }
  .botones{
    button{
      border: 0;
      background-color: transparent;
      outline: 0;
      font-family: 'Century Gothic';
      font-weight: 600;
      font-size: 22px;
      line-height: 27px;
      text-align: center;
      color: #FDFEFF;
      height: 7vh;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
    }
    .gris_btn{
      background-color: #374049;
      margin: 0px 15px;
      &:hover, &:focus{
        background-color: #272d33;
      }
    }
    .rojo_btn{
      background-color: #FF0000;
      &:hover, &:focus{
        background-color: #b30101;
      }
    }
  }
  @media (max-width: 992px){
    padding: 20px 30px;
    img{
      height: 15px;
    }
    img + p{
      padding-left: 3px;
    }
    h2{
      font-size: 24px;
      padding-bottom: 10px;
    }
    p, h4{
      font-size: 14px;
    }
    .rojo .div_rojo h5{
      font-size: 14px;
    }
    .gris_claro  .div_gris h6, .gris_claro .div_gris  p{
      font-size: 14px;
    }
    .gris_oscuro  .div_gris h6, .gris_oscuro .div_gris  p{
      font-size: 14px;
    }
    .botones button{
      font-size: 14px;
      margin-bottom: 20px !important;
      &:last-child{
        margin-bottom: 0 !important;
      }
    }
    .tabla{
      overflow-x: scroll;
    }
    .tabla_scroll{
      min-width: 1000px;
    }
  }
  @media (max-width: 1600px){
    img{
      height: 15px;
    }
    img + p{
      padding-left: 3px;
    }
    h2{
      font-size: 24px;
      padding-bottom: 10px;
    }
    p, h4{
      font-size: 16px;
    }
    .rojo .div_rojo h5{
      font-size: 16px;
    }
    .gris_claro  .div_gris h6, .gris_claro .div_gris  p{
      font-size: 16px;
    }
    .gris_oscuro  .div_gris h6, .gris_oscuro .div_gris  p{
      font-size: 16px;
    }
    .botones button{
      font-size: 16px;
      margin-bottom: 20px !important;
      &:last-child{
        margin-bottom: 0 !important;
      }
    }
  }
}
</style>