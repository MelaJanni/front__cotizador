<template>
  <div class="col-12 col-xxl- caja mb-3 mb-lg-0">
    <div class="row">
        <div class="col-12 d-flex flex-column justify-content-center align-items-start">
          <h2>Cotizador de {{cotizador1}}</h2>
          <h3>LTL (Carga Consolidada Terrestre)</h3>
          <span></span>
        </div>
        <div class="col-12 d-flex flex-column justify-content-center align-items-center mt-5 px-0">
          <div class="row row__width">
              <div class="col-6 col-lg-8 d-flex justify-content-start align-items-center">
                <img src="../../../public/img/cotizador_icons/puerto.svg" alt="">
                <p>Puerto de {{sentido}}</p>
              </div>
              <div class="col-6 col-lg-4 justify-content-end align-items-center">
                <h6>ZLC, Panamá</h6>
              </div>
              <div class="col-12 d-flex justify-content-start align-items-center  py-4">
              <img src="../../../public/img/cotizador_icons/embarque.svg" alt="">
                <p>Puerto de {{sentido2}} (POL)</p>
                </div>
              <div class="col-12 d-flex justify-content-start align-items-center  pb-4">
                <select class="form-select" aria-label="Default select example" id="selectEmbarque" v-model="informacion.cotizador.embarque"
                @change="changeEmbarque()">
                    <option v-for="(puerto, index) in $store.state.puertos__embarque__store " :key="index" 
                    :value="puerto" :class="{ active : importaciones }">{{puerto}}</option>
                    <option v-for="(puertoLL, indexLL) in puertos__llegada" :key="indexLL" 
                    :value="puertoLL" :class="{ active : exportaciones }">{{puertoLL}}</option>
                </select>
              </div>
          </div>
          <div class="row row__width">
              <div class="col-6 d-flex justify-content-start align-items-center">
              <img src="../../../public/img/cotizador_icons/volumen.svg" alt="">
              <p>Volumen (cbm)</p>
              </div>
              <div class="col-6">
              <select class="form-select select_sin_borde" aria-label="Default select example" 
              id="selectVolumen" v-model="informacion.cotizador.volumen"  @change="changeCantidad()">
                  <option v-for="(volumen, index_vol) in $store.state.volumen__store " :key="index_vol"  :value="volumen">{{volumen}}</option>
              </select>
              </div>
          </div>
          <div class="row row__width">
              <div class="col-6 d-flex justify-content-start align-items-center">
              <img src="../../../public/img/cotizador_icons/longitud.svg" alt="">
              <p>Longuitud max (metros)</p>
              </div>
              <div class="col-6">
              <select class="form-select select_sin_borde" aria-label="Default select example"
               id="selectLongitud" v-model="informacion.cotizador.longitud" @change="changeLongitud()">
                  <option v-for="(longitud, index_long) in $store.state.longitudes__store " :key="index_long" :value="longitud">{{longitud}}</option>
              </select>
              </div>
          </div>
          <div class="row row__width">
              <div class="col-6 d-flex justify-content-start align-items-center">
              <img src="../../../public/img/cotizador_icons/peso.svg" alt="">
              <p>Peso (ton)</p>
              </div>
              <div class="col-6">
              <select class="form-select select_sin_borde" aria-label="Default select example" 
              id="selectPeso" v-model="informacion.cotizador.peso" @change="changePeso()">
                  <option v-for="(peso, index_peso) in $store.state.pesos__store " :key="index_peso" :value="peso">{{peso}}</option>
              </select>
              </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default{
  name: 'CotizadorModal',
  data(){
    return{
      response: null,
      puertos__llegada: null,
    }
  },
  props:{
    cotizador1:{
      type: String,
      default: 'importaciones',
    },
    importaciones:{
      type: Boolean,
      default: true,
    },
    exportaciones:{
      type: Boolean,
      default: false,
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
  created(){
    this.$store.dispatch('getImportaciones', 'getExportaciones')
  },
  methods:{
    ...mapActions(['getImportaciones', 'getExportaciones','cantidadXPrecio', 'longitudConsulta', 'pesoConsulta', 'embarqueConsulta']),
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
      this.embarqueConsulta(this.informacion.cotizador.embarque)
    },
  },
  computed:{
    ...mapState(['cotizador', 'informacion']),
  }
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
    @media (min-width: 1440px) {
      max-width: 48%;
    }
    h2{
      font-family: 'Century Gothic', sans-serif;
      font-weight: 600;
      font-size: 34px;
      line-height: 105.32%;
      color: #FF0000;
      text-align: left;
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
      margin-top: 30px;
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
    select{
      background-color: #FAFAFA;
      height: 68px;
      font-family: 'Century Gothic';
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      text-align: start;
      color: #000000;
      option{
        height: 40px;
        &:hover, &:focus{
          box-shadow: 0 0 10px 100px #FED20F inset;
          transition: all .2s ease-in-out;
        }
      }
    }
    .form-select:focus {
      border-color: #FF0000;
      outline: 0;
      box-shadow: none;
    }
    .select_sin_borde{
      border: 0;
      background-color: transparent;
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
}
</style>